import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {
  createBlogInput,
  updateBlogInput,
} from "@purushothamak269/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

// MIDDLEWARE THAT CHECKS AUTHENTICATION

blogRouter.use("/*", async (c, next) => {
  const jwt = c.req.header("Authorization");

  if (!jwt) {
    c.status(401);
    return c.json({
      error: "Unauthrorized",
    });
  }

  const token = jwt.split(" ")[1];
  const JWT_SECRET_KEY = c.env?.JWT_SECRET_KEY;

  const payload = await verify(token, JWT_SECRET_KEY);

  if (!payload) {
    c.status(401);
    return c.json({
      error: "Unauthrorized",
    });
  }

  c.set("userId", payload.id as string);

  await next();
});

// CREATE POSTS

blogRouter.post("/", async (c) => {
  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      Error: "Incorrect inputs",
    });
  }

  const userId = c.get("userId");

  console.log(userId);

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });

  console.log(post.id);

  return c.json({
    id: post.id,
  });
});

// UPDATE

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      Error: "Incorrect inputs",
    });
  }

  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  prisma.post.update({
    where: { id: body.id, authorId: userId },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.text("Post updated successfully");
});

// BULK

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({ posts });
});

// GET A POST

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  //   const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json(post);
});
