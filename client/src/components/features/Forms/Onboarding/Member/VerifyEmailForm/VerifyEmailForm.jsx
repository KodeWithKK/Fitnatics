import OnboardingForm from "@layouts/OnboardingPageLayout/OnboardingForm";
import useVerifyEmailFormHooks from "./VerifyEmailForm.hooks";
import OtpTimer from "./OtpTimer";
import { VerifiedEmailIcon } from "./Icons";
import { getCodedEmail } from "@utils/getCodedEmail";

const VerifyEmailForm = () => {
  const {
    otp,
    email,
    inputRefs,
    isEmailVerified,
    otpGeneratedAt,
    handleChange,
    handleBackspace,
    resendOTPHandler,
    verifyOTPHandler,
    handleSubmit,
  } = useVerifyEmailFormHooks();

  return (
    <OnboardingForm onSubmit={handleSubmit}>
      <OnboardingForm.Headline className={"mx-auto mb-4 mt-6 w-[492px]"} />

      <div className="grid h-full place-items-center">
        {!isEmailVerified && (
          <div className="h-fit max-w-[492px] space-y-6 rounded-md border-2 border-dashed border-gray-800/[.5] px-[5%] py-8 text-gray-200">
            <h1 className="text-center text-2xl font-bold text-gray-200">
              Email Verification
            </h1>

            <div>
              <p className="text-pretty text-sm text-gray-500">
                Please enter the OTP (One Time Password) sent to your email
                {" ("}
                {getCodedEmail(email)}
                {") "}
                for the email verification.
              </p>
            </div>

            <div className="flex justify-between gap-2">
              {[...Array(6)].map((_, i) => (
                <input
                  key={`input-${i}`}
                  ref={(el) => inputRefs.current.push(el)}
                  type="number"
                  maxLength={1}
                  value={otp[i]}
                  onChange={(e) => handleChange(e, i)}
                  onKeyUp={(e) => handleBackspace(e, i)}
                  className="h-[52px] w-[52px] rounded-md border-2 border-gray-800/[.85] bg-transparent text-center text-2xl focus:border-brand focus:ring-brand focus:ring-offset-brand"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <OtpTimer otpGeneratedAt={otpGeneratedAt} />
              <div className="flex gap-4">
                <button
                  type="button"
                  className="underline underline-offset-4"
                  onClick={resendOTPHandler}
                >
                  Resend Code
                </button>
                <button
                  type="button"
                  className="rounded-md bg-gray-800 px-4 py-2 text-gray-200"
                  onClick={verifyOTPHandler}
                >
                  Verify Email
                </button>
              </div>
            </div>
          </div>
        )}
        {isEmailVerified && (
          <div className="flex w-[492px] flex-col items-center gap-4 rounded border-2 border-dashed border-gray-800/[.5] py-12 text-gray-100">
            <VerifiedEmailIcon className="w-[208px]" />
            <h2>Email Verified Successfully!</h2>
          </div>
        )}
      </div>
    </OnboardingForm>
  );
};

export default VerifyEmailForm;
