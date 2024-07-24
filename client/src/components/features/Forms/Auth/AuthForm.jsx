import Input from "@shared/base/Input/Input";
import ErrorMessage from "@shared/lib/FormErrorMessage/ErrorMessage";
import GoogleAuthButton from "./AuthButtons/GoogleAuthButton";
import FacebookAuthButton from "./AuthButtons/FacebookAuthButton";
import TwitterAuthButton from "./AuthButtons/TwitterAuthButton";
import OtpTimer from "./OtpTimer";
import { EmailIcon, PasswordIcon, OtpIcon } from "./Icons";
import { useAuthFormHooks } from "./AuthForm.hooks";

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
      className="my-auto h-fit w-full space-y-6 text-gray-200"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4 text-center">
        <a
          className="text-[35px] font-bold uppercase tracking-wide text-brand"
          href="/"
        >
          Fitnatics
        </a>
      </h2>

      {/* FORM INNER CONTENT */}
      <div>
        <p className="mb-3 text-sm text-gray-500">
          Continue with Google, Facebook or Twitter
        </p>

        {/* OTHER AUTH BUTTONS */}
        <div className="flex w-full select-none rounded-md">
          <GoogleAuthButton text="Google" />
          <FacebookAuthButton text="Facebook" />
          <TwitterAuthButton text="Twitter" />
        </div>

        <div className="relative my-8">
          <hr className="w-full border-gray-800/[0.8]" />
          <div className="absolute -top-3 w-full text-center">
            <span className="w-fu bg-gray-975 px-2.5 text-[15px] text-gray-500">
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
          className="w-full rounded-md bg-brand/[0.75] p-2.5 font-semibold"
          disabled={isRequestPending}
        >
          {getBtnText(displayType, isRequestPending)}
        </button>
        <div className="mt-3 text-pretty text-xs text-gray-500">
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

function getBtnText(displayType, isRequestPending) {
  if (isRequestPending) return "Loading...";
  if (displayType == "signup") return "Create Account";
  return "Continue with Email";
}

export default AuthForm;
