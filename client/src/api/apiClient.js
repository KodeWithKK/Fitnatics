import axios from "axios";
import MyError from "@utils/MyError";

// access through req.query
async function makeGetRequest(url, formData = {}) {
  let data, error;
  await axios
    .get(url, {
      params: formData,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
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
  throw new MyError(
    error?.title ?? "Internal Server!",
    error?.message ?? "Something went wrong while making the API Request"
  );
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
  throw new MyError(
    error?.title ?? "Internal Server!",
    error?.message ?? "Something went wrong while making the API Request"
  );
}

const apiClient = {
  get: makeGetRequest,
  post: makePostRequest,
};

export default apiClient;
