import axios from "axios";
import { BASE_URL } from "./AxiosRequest";

export async function login(email: string, password: string) {
  const response = await axios.post(`${BASE_URL}/sessions`, {
    email,
    password,
  });
  return response.data;
}
