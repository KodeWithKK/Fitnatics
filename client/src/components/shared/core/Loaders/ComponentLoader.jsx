import LoadingSpinner from "./LoadingSpinner";

const ComponentLoader = ({ children }) => {
  return (
    <div className={`grid h-screen w-full place-items-center bg-gray-950`}>
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner className="h-12 w-12 animate-spin text-brand drop-shadow-[0_0px_5px_#1472ff]" />
        <p className="text-pretty text-center text-gray-100">
          {children ?? "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default ComponentLoader;
