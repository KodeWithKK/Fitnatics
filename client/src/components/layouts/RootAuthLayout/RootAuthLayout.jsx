import { useState, useEffect } from "react";
import HomePosterImg from "@images/Home Poster.jpg";

const RootAuthLayout = ({ children }) => {
  const [displayImage, setDisplayImage] = useState(() => {
    return window.innerWidth >= 986;
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
        className={`w-[50%] rounded-r-lg object-cover ${
          !displayImage && "hidden"
        }`}
        src={HomePosterImg}
        alt="brand poster"
      />
      <div
        className={`flex overflow-y-auto px-[6%] py-6 ${
          !displayImage ? "mx-auto w-full max-w-[668px]" : "w-[50%]"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default RootAuthLayout;
