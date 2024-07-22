import { useState, useEffect, useMemo } from "react";

function getTimeLeft(otpGeneratedAt) {
  if (!otpGeneratedAt) return null;

  const currTime = new Date();
  const otpExpiredAt = new Date(otpGeneratedAt).setMinutes(
    otpGeneratedAt.getMinutes() + 15
  );
  const timeLeft = otpExpiredAt - currTime;

  if (timeLeft >= 0) {
    const minutesLeft = Math.trunc(timeLeft / 1000 / 60);
    const secondsLeft = Math.trunc((timeLeft - minutesLeft * 60 * 1000) / 1000);
    const nextValidityTimeLeft = {
      min: minutesLeft,
      sec: secondsLeft,
    };

    return nextValidityTimeLeft;
  } else {
    return { min: 0, sec: 0 };
  }
}

const OtpTimer = ({ otpGeneratedAt, ...delegated }) => {
  const [validityTimeLeft, setValidityTimeLeft] = useState(
    getTimeLeft(otpGeneratedAt)
  );

  useMemo(() => {
    setValidityTimeLeft(getTimeLeft(otpGeneratedAt));
  }, [otpGeneratedAt]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const nextValidityTimeLeft = getTimeLeft(otpGeneratedAt);
      setValidityTimeLeft(nextValidityTimeLeft);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [otpGeneratedAt, validityTimeLeft]);

  if (!otpGeneratedAt || !validityTimeLeft) {
    return <span {...delegated}>‒‒:‒‒</span>;
  }

  return (
    <span {...delegated}>{`${validityTimeLeft?.min
      .toString()
      .padStart(2, 0)}:${validityTimeLeft?.sec
      .toString()
      .padStart(2, 0)}`}</span>
  );
};

export default OtpTimer;
