import axios from "axios";

async function makeLocalLoginRequest(formData) {
  let data, error;

  await axios
    .post("http://localhost:8000/api/v1/auth/login-local", formData)
    .then(
      (res) => {
        data = res.data.data;
      },
      (err) => {
        const res = err?.response.data;
        error = res.message?.error;
      }
    );

  return { data, error };
}

function makeOTPRequest(formData) {
  axios.post("http://localhost:8000/api/v1/auth/generate-otp", formData).then(
    (res) => {
      console.log(res.data);
      console.log("OTP Sent!");
    },
    (err) => {
      console.log(err);
    }
  );
}

async function verifyOTP(email, password, otp) {
  let isOTPCorrect = false;

  await axios
    .post("http://localhost:8000/api/v1/auth/verify-otp", {
      email,
      password,
      otp,
    })
    .then(
      (response) => {
        const res = response.data;
        if (res.success) isOTPCorrect = true;
      },
      (error) => {
        const res = error.response.data;
        console.log(res);
      }
    );

  return isOTPCorrect;
}

async function makeGetRequest(url, formData = {}) {
  let data, error;

  await axios
    .get(url, {
      data: formData,
      withCredentials: true,
    })
    .then(
      (res) => {
        data = res.data.data;
      },
      (err) => {
        const res = err?.response?.data;
        error = res.message?.error;
      }
    );

  return { data, error };
}

async function makePostRequest(url, formData = {}) {
  let data, error;

  await axios
    .post(url, {
      data: formData,
      withCredentials: true,
    })
    .then(
      (res) => {
        data = res.data.data;
      },
      (err) => {
        const res = err?.response.data;
        error = res.message?.error;
      }
    );

  return { data, error };
}

export {
  makeLocalLoginRequest,
  makeOTPRequest,
  verifyOTP,
  makeGetRequest,
  makePostRequest,
};
