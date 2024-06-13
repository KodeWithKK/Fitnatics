import SteperLayout from "@layouts/SteperFormLayout/SteperLayout";
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
    <SteperLayout.Form onSubmit={handleSubmit}>
      <div className="place-items-center grid h-full">
        {!isEmailVerified && (
          <div className="space-y-6 border-2 border-gray-800/[.5] px-[5%] py-8 border-dashed rounded-md max-w-[492px] h-fit text-gray-200">
            <h1 className="font-bold text-2xl text-center text-gray-200">
              Email Verification
            </h1>

            <div>
              <p className="text-gray-500 text-pretty text-sm">
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
                  className="border-2 border-gray-800/[.85] bg-transparent rounded-md w-[52px] h-[52px] text-2xl text-center focus:ring-offset-brand focus:ring-brand focus:border-brand"
                />
              ))}
            </div>

            <div className="flex justify-between items-center text-gray-500 text-sm">
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
                  className="bg-gray-800 px-4 py-2 rounded-md text-gray-200"
                  onClick={verifyOTPHandler}
                >
                  Verify Email
                </button>
              </div>
            </div>
          </div>
        )}
        {isEmailVerified && (
          <div className="flex flex-col items-center gap-4 text-gray-100">
            <VerifiedEmailIcon className="w-[208px]" />
            <h2>Email Verified Successfully!</h2>
          </div>
        )}
      </div>
    </SteperLayout.Form>
  );
};

export default VerifyEmailForm;
