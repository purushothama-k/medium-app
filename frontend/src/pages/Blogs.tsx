import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import Skeleton from "../components/Skeleton";
import useBlogs from "../hooks/useBlogs";

export default function Blogs() {
  const { loading, blogs } = useBlogs();

  return (
    <>
      <Appbar />

      {loading ? (
        <>
          <div className=" flex justify-center ">
            <Skeleton />
          </div>

          <div className=" flex justify-center ">
            <Skeleton />
          </div>

          <div className=" flex justify-center ">
            <Skeleton />
          </div>

          <div className=" flex justify-center ">
            <Skeleton />
          </div>

          <div className=" flex justify-center ">
            <Skeleton />
          </div>

          <div className=" flex justify-center ">
            <Skeleton />
          </div>
        </>
      ) : (
        ""
      )}

      <div className=" flex justify-center">
        <div className="max-w-xl">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorname={blog.author.name || "KP"}
              title={blog.title}
              content={blog.content}
              published={blog.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
