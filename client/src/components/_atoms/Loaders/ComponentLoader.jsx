import LoadingSpinner from "./LoadingSpinner";

const ComponentLoader = ({ children }) => {
  return (
    <div className={`place-items-center grid w-full h-screen bg-gray-950`}>
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner className="drop-shadow-[0_0px_5px_#1472ff] w-12 h-12 text-brand animate-spin" />
        <p className="text-center text-gray-100 text-pretty">
          {children ?? "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default ComponentLoader;
