export default function Quote() {
  return (
    <div className=" bg-slate-100 h-screen flex items-center justify-center">
      <div className=" w-full mx-auto max-w-md space-y-6 ">
        <blockquote className="text-lg font-semibold ">
          &ldquo;The customer service I received was exceptional. The support
          team went above and beyond to address my concerns.&ldquo;
        </blockquote>

        <div className=" flex flex-col">
          <div className=" font-semibold">PurushothamA K</div>
          <div className="text-sm">Software Engineer</div>
        </div>
      </div>

      {/*  */}

      {/* <div className="bg-muted flex items-center justify-center py-12 md:py-24">
        <div className="mx-auto w-full max-w-md space-y-6">
          <blockquote className="text-lg font-semibold leading-snug">
            &ldquo;The customer service I received was exceptional. The support
            team went above and beyond to address my concerns.&ldquo;
          </blockquote>
          <div>
            <div className="font-semibold">Jules Winnfield</div>
            <div className="text-sm text-muted-foreground">CEO, Acme Inc</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
