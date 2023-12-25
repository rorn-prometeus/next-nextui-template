"use server";

import { auth, signOut } from "@/auth";
import axios, { AxiosError, HttpStatusCode } from "axios";

export const apiPublic = axios.create({
  baseURL: process.env.API_URL,
});

export const apiPrivate = axios.create({
  baseURL: process.env.API_URL,
});
apiPrivate.interceptors.request.use(
  async function (config) {
    const session = await auth();
    config.headers.Authorization = `Bearer ${session?.tokens.access}`;
    return config;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

apiPrivate.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === HttpStatusCode.Unauthorized) {
        await signOut();
      }
    }

    return Promise.reject(error);
  }
);

export default apiPrivate;
