import axios from "axios";
import { gateway } from "../utils/const";

const authGateway = gateway + "/login";

export const authPostAPI = (url, data, config) => {
  return axios.post(authGateway + url, data, config);
};
