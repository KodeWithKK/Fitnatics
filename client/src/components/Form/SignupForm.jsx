import React from "react";

const SignupForm = () => {
  const [formData, setFormData] = React.useState({
    role: "member",
    rememberMe: false,
  });

  const handleInput = React.useCallback(
    (event) => {
      const { name, value } = event.target;
      const nextFormData = { ...formData, [name]: value };
      setFormData(nextFormData);
    },
    [formData]
  );

  const handleCheckbox = React.useCallback(
    (event) => {
      const nextFormData = { ...formData, rememberMe: event.target.checked };
      setFormData(nextFormData);
    },
    [formData]
  );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        console.log(formData);
        // await fetch("http://localhost:8000")
        //   .then((res) => res.json())
        //   .then((data) => console.log(data));
      }}
    >
      <h1 className="font-bold text-brand text-3xl text-center mb-8 tracking-wide uppercase">
        Fitnatics
      </h1>

      <FormInput
        label="Name"
        type="text"
        name="name"
        spellCheck="false"
        onChange={handleInput}
      />
      <FormInput
        label="Email"
        type="email"
        name="email"
        onChange={handleInput}
      />
      <FormInput
        label="Password"
        type="password"
        name="password"
        onChange={handleInput}
      />

      <label
        className="block text-gray-400 text-[15px] mb-0.5 select-none"
        htmlFor="signup-role"
      >
        Role
      </label>
      <select
        name="role"
        className="w-full rounded-md bg-gray-950 border-gray-700 mb-4 select-none"
        id="signup-role"
        onChange={handleInput}
      >
        <option value="member">Member</option>
        <option value="trainer">Trainer</option>
      </select>

      <input
        id="signup-remember-me"
        name="rememberMe"
        className="rounded-full bg-gray-950 border-gray-700"
        type="checkbox"
        onChange={handleCheckbox}
      />
      <label
        className="text-gray-400 text-[15px] mb-0.5 ml-2 select-none"
        htmlFor="signup-remember-me"
      >
        Remember Me
      </label>

      <button className="w-full bg-brand/[0.75] mt-6 p-2.5 font-semibold rounded-md">
        Create Account
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
        id={`signup-${label.toLowerCase()}`}
        className={`w-full rounded-md bg-gray-950 border-gray-700 mb-4`}
        type={type}
        {...delegated}
      />
    </>
  );
}

export default SignupForm;
