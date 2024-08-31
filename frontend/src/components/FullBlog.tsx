type BlogProps = {
  title: string;
  content: string;
  author: string;
};

export default function FullBlog({ title, content, author }: BlogProps) {
  return (
    <div className="  flex justify-center space-x-5">
      <div className=" space-y-4 basis-full">
        <div className=" text-3xl font-bold">{title}</div>
        <div className=" text-slate-600">Posted on Aug 14, 2024</div>
        <div>{content}</div>
      </div>

      <div className="space-y-5">
        <div>Author</div>
        <div className=" flex space-x-3 items-center">
          <div>
            <Avatar name={author || "Anonymous"} />
          </div>

          <div className="flex flex-col space-y-2">
            <div className=" text-xl font-semibold">
              {author || "Anonymous"}
            </div>

            <div className="text-slate-500">
              Random catch phrase details about the authors's ability to grab
              the user's attention
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
