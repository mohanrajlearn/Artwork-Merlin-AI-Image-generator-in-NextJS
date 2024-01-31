import axios from "axios";

export const $axios = axios;
 
export const baseUrl = "http://localhost:8080";

export const $windowExists = typeof window !== "undefined";
