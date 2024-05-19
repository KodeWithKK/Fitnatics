import axios from "axios";

async function makeGetRequest(url, formData = {}) {
  let data, error;

  await axios
    .get(url, {
      data: formData,
      withCredentials: true,
    })
    .then(
      (res) => {
        data = res.data?.data;
      },
      (err) => {
        const res = err?.response?.data;
        error = res.message?.error;
      }
    );

  if (data) return data;
  throw error;
}

async function makePostRequest(url, formData = {}) {
  let data, error;

  await axios
    .post(url, formData, {
      withCredentials: true,
    })
    .then(
      (res) => {
        data = res.data?.data;
      },
      (err) => {
        const res = err?.response.data;
        error = res.message?.error;
      }
    );

  if (data) return data;
  throw error;
}

export { makeGetRequest, makePostRequest };
