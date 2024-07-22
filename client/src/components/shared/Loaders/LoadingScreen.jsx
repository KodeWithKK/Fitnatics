import { useContext } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import LoadingSpinner from "./LoadingSpinner";

const LoadingScreen = () => {
  const { loaderText, displayLoaderState } = useContext(GlobalContext);

  if (displayLoaderState === false) {
    return;
  }

  return (
    <div className="z-[1000] fixed place-items-center grid bg-gray-950/[.9] w-full h-screen">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner className="drop-shadow-[0_0px_5px_#1472ff] w-12 h-12 text-brand animate-spin" />
        <p className="text-center text-gray-100 text-pretty">{loaderText}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
