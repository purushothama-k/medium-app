import { Link } from "react-router-dom";

type BlogCardProps = {
  authorname: string;
  title: string;
  content: string;
  published: string;
  id: string;
};

export default function BlogCard({
  id,
  authorname,
  title,
  content,
  published,
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 space-y-1 cursor-pointer">
        <div className="  flex items-center space-x-2">
          <div className=" flex justify-center items-center">
            <Avatar name={authorname} />
          </div>
          <div>{authorname}</div>
          <div>
            <Circle />
          </div>
          <div className=" text-gray-500">{published}</div>
        </div>

        <div className=" font-bold  text-xl">{title}</div>
        <div className=" font-normal text-slate-700">
          {content.slice(0, 100) + "..."}
        </div>

        <div className=" text-sm pt-2 text-slate-500">
          {Math.ceil(content.length / 100)} minutes read
        </div>

        <div className=" bg-slate-200 w-full h-[1px]"></div>
      </div>
    </Link>
  );
}

function Circle() {
  return <div className=" h-1 w-1 bg-gray-600 rounded-full"></div>;
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {name.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}
