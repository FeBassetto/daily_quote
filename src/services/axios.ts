import axios from "axios";

export const api = axios.create({
  baseURL: "https://n8n.jrmendonca.com.br/webhook/testeReact",
  headers: {
    "Content-Type": "application/json",
  },
});
