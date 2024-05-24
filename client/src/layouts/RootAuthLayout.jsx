import { useState, useEffect } from "react";
import HomePosterImg from "@images/Home Poster.jpg";

const RootAuthLayout = ({ children }) => {
  const [displayImage, setDisplayImage] = useState(() => {
    if (window.innerWidth >= 986) return true;
    else return false;
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 986) {
        setDisplayImage(true);
      } else setDisplayImage(false);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <img
        className={`rounded-r-lg w-[50%] object-cover ${
          !displayImage && "hidden"
        }`}
        src={HomePosterImg}
        alt="brand-poster-image"
      />
      <div
        className={`flex px-[6%] py-6 overflow-y-auto ${
          !displayImage ? "max-w-[668px] w-full mx-auto" : "w-[50%]"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default RootAuthLayout;
