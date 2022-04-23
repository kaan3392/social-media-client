import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8800/api/"
    : "https://social-media-knlcl.herokuapp.com/api";
const TOKEN = JSON.parse(localStorage.getItem("user"))?.accessToken;
console.log(BASE_URL);
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
