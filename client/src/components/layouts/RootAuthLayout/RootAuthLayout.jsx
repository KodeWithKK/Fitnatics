import HomePosterImg from "@assets/images/Home Poster.jpg";

const RootAuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <img
        className={`w-[50%] rounded-r-lg object-cover max-[986px]:hidden`}
        src={HomePosterImg}
        alt="brand poster"
      />
      <div
        className={`mx-auto flex w-full max-w-[668px] overflow-y-auto px-[6%] py-6 min-[986px]:w-[50%]`}
      >
        {children}
      </div>
    </div>
  );
};

export default RootAuthLayout;
