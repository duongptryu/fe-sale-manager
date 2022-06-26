var token = "";
export const gateway =
  // process.env.REACT_APP_GATEWAY || "http://localhost:8080/api/v1";
  process.env.REACT_APP_GATEWAY || "http://165.232.171.53/api/v1";

export function getToken() {
  var t = localStorage.getItem("token") || "";
  token = t;
  return t;
}

export function setToken(newToken) {
  token = newToken;
  localStorage.setItem("token", newToken);
}

export const dateFormat = "DD/MM/YYYY";
export const dateFormatSearch = "YYYY-MM-DD";
