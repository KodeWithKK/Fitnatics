import Input from "@components/comman/Input/Input";
import GoogleAuthButton from "./AuthButtons/GoogleAuthButton";
import FacebookAuthButton from "./AuthButtons/FacebookAuthButton";
import TwitterAuthButton from "./AuthButtons/TwitterAuthButton";
import { useAuthFormHooks } from "./AuthForm.hooks";

import { EmailIcon, PasswordIcon, OtpIcon } from "./Icons";

const AuthForm = () => {
  const {
    displayType,
    formData,
    otpGeneratedAt,
    isRequestPending,
    checkEmail,
    checkPassword,
    checkOTP,
    submitHandler,
    handleInput,
    resendOTPHandler,
  } = useAuthFormHooks();

  return (
    <form
      className="space-y-6 my-auto w-full h-fit text-gray-200"
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
    >
      <h2 className="mb-4 text-center">
        <a className="font-bold text-brand uppercase tracking-wide" href="/">
          Fitnatics
        </a>
      </h2>

      {/* FORM INNER CONTENT */}
      <div>
        <p className="mb-3 text-gray-500 text-sm">
          Continue with Google, Facebook or Twitter
        </p>

        {/* OTHER AUTH BUTTONS */}
        <div className="flex rounded-md w-full select-none">
          <GoogleAuthButton text="Google" />
          <FacebookAuthButton text="Facebook" />
          <TwitterAuthButton text="Twitter" />
        </div>

        <div className="relative my-8">
          <hr className="border-gray-800/[0.8] w-full" />
          <div className="-top-3 absolute w-full text-center">
            <span className="bg-gray-975 px-2.5 w-fu text-[15px] text-gray-500">
              OR
            </span>
          </div>
        </div>

        {/* FORM INPUTS */}
        <div>
          <Input
            type="email"
            name="email"
            Icon={EmailIcon}
            placeholder="Email"
            value={formData.email}
            onInput={handleInput}
            checkError={checkEmail}
            required={true}
            spellCheck={false}
            disabled={isRequestPending || displayType === "signup"}
          />

          <Input
            type="password"
            name="password"
            Icon={PasswordIcon}
            placeholder="Password"
            value={formData.password}
            onInput={handleInput}
            checkError={checkPassword}
            required={true}
            spellCheck={false}
            disabled={isRequestPending || displayType === "signup"}
          />

          {displayType === "signup" && (
            <Input
              type="number"
              name="otp"
              Icon={OtpIcon}
              placeholder="OTP"
              value={formData.otp}
              onInput={handleInput}
              checkError={checkOTP}
              otpGeneratedAt={otpGeneratedAt}
              required={true}
            />
          )}

          <div className="flex justify-between text-[14px] text-gray-500">
            <button type="button" className="underline underline-offset-[3px]">
              Forgot Password
            </button>

            {displayType === "signup" && (
              <button
                type="button"
                className="underline underline-offset-[3px]"
                onClick={resendOTPHandler}
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="bg-brand/[0.75] p-2.5 rounded-md w-full font-semibold"
          disabled={isRequestPending}
        >
          {isRequestPending
            ? "Loading..."
            : displayType === "signup"
            ? "Create Account"
            : "Continue with Email"}
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
  );
};

export default AuthForm;
