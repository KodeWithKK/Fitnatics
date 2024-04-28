import React from "react";
import HomePosterImg from "../../images/Home Poster.jpg";
import FormInput from "./FormInput";
import { GoogleIcon, FacebookIcon, TwitterIcon } from "./Icons";

const AuthForm = ({ handleFormSubmit, handleInput }) => {
  return (
    <div className="flex bg-gray-950 h-screen overflow-hidden">
      <img
        className="w-[50%] object-cover rounded-r-lg"
        src={HomePosterImg}
        alt="brand-poster-image"
      />
      <div className="flex w-[50%] px-[6%] py-10 overflow-y-auto">
        <form
          className="my-auto w-full h-fit space-y-8 text-gray-200"
          onSubmit={handleFormSubmit}
        >
          <h1 className="font-bold text-brand text-4xl text-center tracking-wide uppercase">
            Fitnatics
          </h1>

          <div>
            <h5 className="text-sm text-gray-400 mb-3">
              Continue with Google, Facebook or Twitter
            </h5>

            <div className="flex w-full h-12 rounded-md select-none">
              <div className="flex items-center px-3 w-full border-2 border-gray-700/[.6] rounded-l-md cursor-pointer hover:bg-gray-900">
                <GoogleIcon className="h-6 mr-2" />
                <span>Google</span>
              </div>
              <div className="flex items-center px-3 w-full border-2 border-x-0 border-gray-700/[.6] cursor-pointer hover:bg-gray-900">
                <FacebookIcon className="h-6 mr-2" />
                <span>Facebook</span>
              </div>
              <div className="flex items-center px-3 w-full border-2 border-gray-700/[.6] rounded-r-md cursor-pointer hover:bg-gray-900">
                <TwitterIcon className="h-6 mr-2" />
                <span>Twitter</span>
              </div>
            </div>

            <hr className="mt-3 border-gray-800/[0.8]" />

            <h5 className="text-sm text-gray-400 mt-8 mb-5">
              Or Continue with Email...
            </h5>

            <FormInput
              label="Email"
              type="text"
              name="email"
              onChange={handleInput}
              required={true}
            />

            <FormInput
              label="Password"
              type="password"
              name="password"
              onChange={handleInput}
              required={true}
            />
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-3 text-pretty">
              By continuing, you agree to Fitnatics&apos;s{" "}
              <span className="cursor-pointer underline">Terms of Use</span> and{" "}
              <span className="cursor-pointer underline">Privacy Policy</span>
            </div>

            <button className="w-full bg-brand/[0.75] p-2.5 font-semibold rounded-md">
              Continue with email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
