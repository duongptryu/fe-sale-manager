import axios from "axios";
import { gateway } from "../utils/const";

const authGateway = gateway + "/login";

export const authPostAPI = (url, data, config) => {
  return axios.post(authGateway + url, data, config);
};

export const getAPI = (url, params, token) => {
  if (params) {
    const queryString = objectToQueryString(params);
    return axios.get(gateway + url + "?" + queryString, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } else {
    return axios.get(gateway + url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
};

export const postAPI = (url, data, token) => {
  return axios.post(gateway + url, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const patchAPI = (url, id, data, token) => {
  return axios.patch(gateway + url + "/" + id, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const deleteAPI = (url, id, token) => {
  return axios.delete(gateway + url + "/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

function objectToQueryString(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}
