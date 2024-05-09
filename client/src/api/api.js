function makeOTPRequest(email, password) {
  fetch("http://localhost:8000/api/v1/auth/generate-otp", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      console.log("OTP Sent!");
    })
    .catch((error) => console.error(error));
}

async function verifyOTP(email, password, otp) {
  let isOTPCorrect = false;

  await fetch("http://localhost:8000/api/v1/auth/verify-otp", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      otp,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result.success) isOTPCorrect = true;
    })
    .catch((error) => console.error(error));

  return isOTPCorrect;
}

export { makeOTPRequest, verifyOTP };
