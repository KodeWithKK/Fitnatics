import React from "react";
import AvatarImage from "./AvatarImage";
import { GlobalContext } from "../../App";

const SetupAccountForm = () => {
  const { userData } = React.useContext(GlobalContext);
  const [formData, setFormData] = React.useState({
    role: "member",
    email: userData.email,
    password: userData.password,
  });

  const avatarRef = React.useRef();

  const handleInput = React.useCallback(
    (event) => {
      const { name, value } = event.target;
      const nextFormData = { ...formData, [name]: value };
      setFormData(nextFormData);
    },
    [formData]
  );

  const handleAvatarInput = React.useCallback(() => {
    avatarRef.current.click();
  }, []);

  const formSubmitHandle = React.useCallback(
    (e) => {
      e.preventDefault();
      console.log(formData);
    },
    [formData]
  );

  return (
    <div className="bg-gray-950 h-screen py-8 px-[6%] overflow-y-auto">
      <a
        className="block font-bold text-brand text-4xl text-center tracking-wide uppercase mb-6"
        href="/"
      >
        Fitnatics
      </a>

      <form
        className="mx-auto max-w-[586px] h-fit px-[6%] py-8 space-y-8 text-gray-200 border-2 border-dashed border-gray-900 rounded-md"
        onSubmit={formSubmitHandle}
      >
        <h1 className="font-bold text-gray-200 text-2xl text-center">
          Setup your Account
        </h1>

        <div>
          <AvatarImage
            ref={avatarRef}
            className="w-[152px] h-[152px] mx-auto mb-8 bg-gray-600 border border-gray-600"
            onClick={handleAvatarInput}
          />

          <FormInput
            label="Name"
            type="text"
            name="name"
            onChange={handleInput}
            required={true}
            spellCheck={false}
          />
          <FormInput
            label="Email"
            type="email"
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
          <FormInput
            label="Phone No"
            type="text"
            name="phoneno"
            onChange={handleInput}
            required={true}
            spellCheck={false}
          />

          <label
            className="block text-gray-400 text-[15px] mb-0.5 select-none"
            htmlFor="auth-role"
          >
            Role
          </label>
          <select
            id="auth-role"
            name="role"
            className={`w-full rounded-md bg-gray-950 border-gray-600/[.6] mb-4 placeholder:text-gray-400/[.4]`}
            value={formData.role}
            onChange={handleInput}
          >
            <option value="member">Member</option>
            <option value="trainer">Trainer</option>
          </select>
        </div>

        <div>
          <button className="w-full bg-brand/[0.75] p-2.5 font-semibold rounded-md">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

function FormInput({ label, type, ...delegated }) {
  return (
    <>
      <label
        className="block text-gray-400 text-[15px] mb-0.5 select-none"
        htmlFor={`auth-${label.toLowerCase().split(" ")[0]}`}
      >
        {label}
      </label>
      <input
        id={`auth-${label.toLowerCase().split(" ")[0]}`}
        className={`w-full rounded-md bg-gray-950 border-gray-600/[.6] mb-4 placeholder:text-gray-400/[.4]`}
        type={type}
        {...delegated}
      />
    </>
  );
}

export default SetupAccountForm;
