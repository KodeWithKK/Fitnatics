import { useCallback } from "react";

function useInputHooks({ inputRefs, otp, setOtp }) {
  const handleChange = useCallback(
    (e, idx) => {
      const value = e.target.value;

      if (value.length === 1) {
        const nextOtp = [...otp];
        nextOtp[idx] = value;
        setOtp(nextOtp);

        if (idx < 5) {
          inputRefs.current[idx + 1].focus();
        }
      }

      if (value.length == 2 && idx < 5) {
        const otpString = otp.join("");
        const nextOtpString =
          otpString.substring(0, idx) + value + otpString.substring(idx + 1);

        const nextOtp = [...Array(6)];
        nextOtp.forEach((_, i) => {
          nextOtp[i] = nextOtpString[i];
        });

        setOtp(nextOtp);
        inputRefs.current[idx + 1].focus();
      }
    },
    [inputRefs, otp, setOtp],
  );

  const handleBackspace = useCallback(
    (e, idx) => {
      if (e.key === "Backspace") {
        const nextOtp = [...otp];
        nextOtp[idx] = "";

        if (idx > 0 && !otp[idx]) {
          inputRefs.current[idx - 1].value = "";
          nextOtp[idx - 1] = "";
          inputRefs.current[idx - 1].focus();
        }
        setOtp(nextOtp);
      }
    },
    [inputRefs, otp, setOtp],
  );

  return { handleChange, handleBackspace };
}

export default useInputHooks;
