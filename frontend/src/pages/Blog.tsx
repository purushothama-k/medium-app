import { useParams } from "react-router-dom";
import useBlog from "../hooks/useBlog";
import FullBlog from "../components/FullBlog";
import Appbar from "../components/Appbar";
import Spinner from "../components/Spinner";

export default function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  console.log(blog);

  if (loading || !blog) {
    return (
      <>
        <Appbar />
        <Spinner />
      </>
    );
  }

  return (
    <>
      <Appbar />

      <div className="flex justify-center">
        <div className="max-w-6xl p-6">
          <FullBlog
            title={blog?.title}
            content={blog?.content}
            author={blog?.author.name}
          />
        </div>
      </div>
    </>
  );
}
