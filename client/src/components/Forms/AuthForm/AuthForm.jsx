import Input from "@components/_comman/Input/Input";
import ErrorMessage from "../_comman/ErrorMessage";
import OtpTimer from "./OtpTimer";
import GoogleAuthButton from "./AuthButtons/GoogleAuthButton";
import FacebookAuthButton from "./AuthButtons/FacebookAuthButton";
import TwitterAuthButton from "./AuthButtons/TwitterAuthButton";
import { useAuthFormHooks } from "./AuthForm.hooks";

import { EmailIcon, PasswordIcon, OtpIcon } from "./Icons";

const AuthForm = () => {
  const {
    displayType,
    otpGeneratedAt,
    isRequestPending,
    errors,
    register,
    handleSubmit,
    resendOTPHandler,
  } = useAuthFormHooks();

  return (
    <form
      className="space-y-6 my-auto w-full h-fit text-gray-200"
      onSubmit={handleSubmit}
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
            {...register("email")}
            Icon={EmailIcon}
            placeholder="Email"
            spellCheck={false}
            required={true}
            hasError={errors?.email?.message}
            disabled={isRequestPending || displayType === "signup"}
          />

          <ErrorMessage>{errors?.email?.message}</ErrorMessage>

          <Input
            type="password"
            {...register("password")}
            Icon={PasswordIcon}
            placeholder="Password"
            spellCheck={false}
            required={true}
            hasError={errors?.password?.message}
            disabled={isRequestPending || displayType === "signup"}
          />

          <ErrorMessage>{errors?.password?.message}</ErrorMessage>

          {displayType === "signup" && (
            <Input
              type="number"
              {...register("otp")}
              Icon={OtpIcon}
              placeholder="OTP"
              required={true}
              hasError={errors?.otp?.message}
            >
              <Input.RAside variant="transparent">
                <OtpTimer otpGeneratedAt={otpGeneratedAt} />
              </Input.RAside>
            </Input>
          )}

          <ErrorMessage>{errors?.otp?.message}</ErrorMessage>

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
