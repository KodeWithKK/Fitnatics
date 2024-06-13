import { useRef, useEffect } from "react";

function ImageSkeleton() {
  const parentRef = useRef();
  const childRef = useRef();

  useEffect(() => {
    const handleSize = () => {
      const width = window.getComputedStyle(parentRef.current).width;
      const height = window.getComputedStyle(parentRef.current).height;
      const widthNum = parseFloat(width.replace("px", ""));
      const heightNum = parseFloat(height.replace("px", ""));
      const childWidth = `${Math.sqrt(
        Math.pow(widthNum, 2) + Math.pow(heightNum, 2)
      )}px`;
      const childHeight = `${Math.sqrt(
        Math.pow(widthNum, 2) + Math.pow(heightNum, 2)
      )}px`;
      childRef.current.style.width = childWidth;
      childRef.current.style.height = childHeight;
    };

    handleSize();

    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return (
    <div ref={parentRef} className="bg-gray-800 w-full h-full overflow-hidden">
      <div
        ref={childRef}
        className="bg-gray-900 origin-center animate-loadingImage"
      ></div>
    </div>
  );
}

export default ImageSkeleton;
