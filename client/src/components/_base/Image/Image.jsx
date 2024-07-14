import { useState } from "react";
import ImageSkeleton from "./ImageSkeleton";

function Image({
  src,
  width,
  height,
  minWidth,
  minHeight,
  className,
  ...restProps
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ width, height, minWidth, minHeight }}
    >
      {isLoading && <ImageSkeleton />}
      <img
        src={src}
        onLoad={() => setIsLoading(false)}
        className="w-full h-full object-cover"
        style={{ display: isLoading ? "none" : "block" }}
        {...restProps}
      />
    </div>
  );
}

export default Image;
