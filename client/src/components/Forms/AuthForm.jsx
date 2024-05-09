import React from "react";
import HomePosterImg from "../../images/Home Poster.jpg";
import FormInput from "./atoms/FormInput";
import { GoogleIcon, FacebookIcon, TwitterIcon } from "./atoms/Icons";

const AuthForm = ({ formData, formSubmitHandler, handleInput }) => {
  const [displayImage, setDisplayImage] = React.useState(() => {
    if (window.innerWidth >= 986) return true;
    else return false;
  });

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 986) {
        setDisplayImage(true);
      } else setDisplayImage(false);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex bg-gray-950 h-screen overflow-hidden">
      <img
        className={`rounded-r-lg w-[50%] object-cover ${
          !displayImage && "hidden"
        }`}
        src={HomePosterImg}
        alt="brand-poster-image"
      />
      <div
        className={`flex px-[6%] py-10 overflow-y-auto ${
          !displayImage ? "max-w-[668px] w-full mx-auto" : "w-[50%]"
        }`}
      >
        <form
          className="space-y-8 my-auto w-full h-fit text-gray-200"
          onSubmit={formSubmitHandler}
        >
          <div className="mb-6 text-center">
            <a
              className="font-bold text-4xl text-brand uppercase tracking-wide"
              href="/"
            >
              Fitnatics
            </a>
          </div>

          <div>
            <h5 className="mb-3 text-gray-400 text-sm">
              Continue with Google, Facebook or Twitter
            </h5>

            <div className="flex rounded-md w-full h-12 select-none">
              <button className="flex items-center border-2 border-gray-700/[.6] hover:bg-gray-900 px-3 rounded-l-md w-full">
                <GoogleIcon className="mr-2 h-6" />
                <span>Google</span>
              </button>
              <button className="flex items-center border-2 border-gray-700/[.6] border-x-0 hover:bg-gray-900 px-3 w-full">
                <FacebookIcon className="mr-2 h-6" />
                <span>Facebook</span>
              </button>
              <button className="flex items-center border-2 border-gray-700/[.6] hover:bg-gray-900 px-3 rounded-r-md w-full">
                <TwitterIcon className="mr-2 h-6" />
                <span>Twitter</span>
              </button>
            </div>

            <hr className="border-gray-800/[0.8] mt-3" />

            <h5 className="mt-8 mb-5 text-gray-400 text-sm">
              Or Continue with Email...
            </h5>

            <FormInput
              label="Email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInput}
              required={true}
            />

            <FormInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              required={true}
            />
          </div>

          <div>
            <div className="mb-3 text-gray-400 text-pretty text-sm">
              By continuing, you agree to Fitnatics&apos;s{" "}
              <span className="underline cursor-pointer">Terms of Use</span> and{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>
            </div>

            <button
              type="submit"
              className="bg-brand/[0.75] p-2.5 rounded-md w-full font-semibold"
            >
              Continue with email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
