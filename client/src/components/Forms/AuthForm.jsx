import React from "react";
import HomePosterImg from "../../images/Home Poster.jpg";
import FormInput from "./atoms/FormInput";
import { FacebookIcon, TwitterIcon } from "./atoms/Icons";
import GoogleAuthButton from "./atoms/GoogleAuthButton";

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
        className={`flex px-[6%] py-6 overflow-y-auto ${
          !displayImage ? "max-w-[668px] w-full mx-auto" : "w-[50%]"
        }`}
      >
        <form
          className="space-y-6 my-auto w-full h-fit text-gray-200"
          onSubmit={formSubmitHandler}
        >
          <div className="mb-4 text-center">
            <a
              className="font-bold text-[35px] text-brand uppercase tracking-wide"
              href="/"
            >
              Fitnatics
            </a>
          </div>

          {/* FORM INNER CONTENT */}
          <div>
            <h5 className="mb-3 text-gray-400 text-sm">
              Continue with Google, Facebook or Twitter
            </h5>

            {/* OTHER AUTH BUTTONS */}
            <div className="flex rounded-md w-full h-12 select-none">
              <GoogleAuthButton />
              <button
                type="button"
                className="flex items-center border-2 border-gray-700/[.6] border-x-0 hover:bg-gray-900 px-3 w-full"
              >
                <FacebookIcon className="mr-2 h-6" />
                <span>Facebook</span>
              </button>
              <button
                type="button"
                className="flex items-center border-2 border-gray-700/[.6] hover:bg-gray-900 px-3 rounded-r-md w-full"
              >
                <TwitterIcon className="mr-2 h-6" />
                <span>Twitter</span>
              </button>
            </div>

            <hr className="border-gray-800/[0.8] mt-2 w-full" />

            <h5 className="my-4 w-full text-gray-400 text-left text-sm">
              Or Continue with Email...
            </h5>

            {/* FORM INPUTS */}
            <div>
              <FormInput
                label="Email*"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInput}
                required={true}
                spellCheck={false}
              />

              <FormInput
                label="Password*"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInput}
                required={true}
              />
              <button
                type="button"
                className="text-[14px] text-gray-400 underline underline-offset-[3px]"
              >
                Forgot Password
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-brand/[0.75] p-2.5 rounded-md w-full font-semibold"
            >
              Continue with email
            </button>
            <div className="mt-3 text-gray-400 text-pretty text-xs">
              By continuing, you agree to Fitnatics&apos;s{" "}
              <button type="button" className="underline">
                Terms of Service
              </button>{" "}
              and{" "}
              <button type="button" className="underline">
                Privacy Policy
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
