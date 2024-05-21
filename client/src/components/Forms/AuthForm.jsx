import React from "react";
import HomePosterImg from "../../images/Home Poster.jpg";
import FormInput from "./atoms/FormInput";
import GoogleAuthButton from "./atoms/AuthButtons/GoogleAuthButton";
import FacebookAuthButton from "./atoms/AuthButtons/FacebookAuthButton";
import TwitterAuthButton from "./atoms/AuthButtons/TwitterAuthButton";

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
            <p className="mb-3 text-gray-500 text-sm">
              Continue with Google, Facebook or Twitter
            </p>

            {/* OTHER AUTH BUTTONS */}
            <div className="flex rounded-md w-full h-12 select-none">
              <GoogleAuthButton />
              <FacebookAuthButton />
              <TwitterAuthButton />
            </div>

            <hr className="border-gray-800/[0.8] mt-2 w-full" />

            <p className="my-4 w-full text-gray-500 text-left text-sm">
              Or Continue with Email...
            </p>

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
                className="text-[14px] text-gray-500 underline underline-offset-[3px]"
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
            <div className="mt-3 text-gray-500 text-pretty text-xs">
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
