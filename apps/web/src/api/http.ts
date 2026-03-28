import axios from "axios";

export const http = axios.create({
  baseURL: `${import.meta.env.VITE_HTTP_SERVER_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
