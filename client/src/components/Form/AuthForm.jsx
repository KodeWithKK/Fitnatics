import React from "react";
import HomePosterImg from "../../images/Home Poster.jpg";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const AuthForm = () => {
  const [formType, setFormType] = React.useState("signup");

  return (
    <div className="flex bg-gray-950 h-screen overflow-hidden">
      <img
        className="w-[50%] object-cover rounded-r-lg"
        src={HomePosterImg}
        alt="brand-poster-image"
      />
      <div className="flex flex-col justify-between w-[50%] px-[6%] py-10 text-gray-200">
        {formType === "signup" && <SignupForm />}
        {formType === "login" && <LoginForm />}

        <button
          className="text-center mx-auto text-gray-500 underline underline-offset-2"
          onClick={() => {
            if (formType === "signup") setFormType("login");
            else setFormType("signup");
          }}
        >
          {formType === "signup" && <>Already have account ➞</>}
          {formType === "login" && <>Create account ➞</>}
        </button>
      </div>
    </div>
  );
};

function FormInput({ label, type, ...delegated }) {
  return (
    <>
      <label
        className="block text-gray-400 text-[15px] mb-0.5 select-none"
        htmlFor={`signup-${label.toLowerCase()}`}
      >
        {label}
      </label>
      <input
        id={`signup-${label.toLowerCase()}`}
        name={name}
        className={`w-full rounded-md bg-gray-950 border-gray-700 mb-4`}
        type={type}
        {...delegated}
      />
    </>
  );
}

export default AuthForm;
