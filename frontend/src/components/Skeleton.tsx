export default function Skeleton() {
  return (
    <div role="status" className="animate-pulse  w-full max-w-xl">
      <div className="p-4 space-y-1 cursor-pointer">
        <div className="  flex items-center space-x-2">
          <div className=" flex justify-center items-center">
            <Circle />
          </div>
          <div className="h-2 w-1/2 bg-gray-200 rounded-full"></div>
        </div>

        <div className=" font-bold  text-xl">
          <div className="h-3 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
        <div className=" font-normal text-slate-700">
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>

        <div className=" text-sm pt-2 text-slate-500">
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>

        <div className=" bg-slate-200 w-full h-[1px]"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}

function Circle() {
  return <div className=" h-6 w-6 bg-gray-200 rounded-full"></div>;
}
