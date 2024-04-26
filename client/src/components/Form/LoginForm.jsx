import React from "react";

const LoginForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h1 className="font-bold text-brand text-3xl text-center mb-8 tracking-wide uppercase">
        Fitnatics
      </h1>

      <FormInput label="Email" type="email" name="email" />
      <FormInput label="Password" type="password" name="password" />

      <input
        id="signup-remember-me"
        name="rememberMe"
        className="rounded-full bg-gray-950 border-gray-700"
        type="checkbox"
      />
      <label
        className="text-gray-400 text-[15px] mb-0.5 ml-2 select-none"
        htmlFor="signup-remember-me"
      >
        Remember Me
      </label>

      <button className="w-full bg-brand/[0.75] mt-6 p-2.5 font-semibold rounded-md">
        Log In
      </button>
    </form>
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
        id={`login-${label.toLowerCase()}`}
        className={`w-full rounded-md bg-gray-950 border-gray-700 mb-4`}
        type={type}
        {...delegated}
      />
    </>
  );
}

export default LoginForm;
