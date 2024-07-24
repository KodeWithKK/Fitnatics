import { useContext } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import LoadingSpinner from "./LoadingSpinner";

const LoadingScreen = () => {
  const { loaderText, displayLoaderState } = useContext(GlobalContext);

  if (displayLoaderState === false) {
    return;
  }

  return (
    <div className="fixed z-[1000] grid h-screen w-full place-items-center bg-gray-950/[.9]">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner className="h-12 w-12 animate-spin text-brand drop-shadow-[0_0px_5px_#1472ff]" />
        <p className="text-pretty text-center text-gray-100">{loaderText}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
