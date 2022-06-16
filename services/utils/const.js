var token = "";
export const gateway =
  process.env.REACT_APP_GATEWAY || "http://159.65.130.104:8081/api/v1";

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
