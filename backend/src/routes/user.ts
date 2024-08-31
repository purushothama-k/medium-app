import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@purushothamak269/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();

// SIGNUP

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      Error: "Incorrect inputs",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });

    const JWT_SECRET_KEY = c.env?.JWT_SECRET_KEY;

    const jwt = await sign(
      {
        id: user.id,
      },
      JWT_SECRET_KEY
    );

    console.log(user);
    c.status(200);
    return c.json({
      message: "Token signed successfully",
      jwt,
    });
  } catch (err) {
    c.status(403);
    return c.json({
      error: "Error while signup",
    });
  }
});

// SIGN IN

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      Error: "Incorrect inputs",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const JWT_SECRET_KEY = c.env?.JWT_SECRET_KEY;

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({
      error: "User not found",
    });
  }

  const jwt = await sign({ id: user.id }, JWT_SECRET_KEY);

  return c.json({
    jwt,
  });
});
