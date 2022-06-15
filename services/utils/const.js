export const gateway =
  process.env.REACT_APP_GATEWAY || "http://159.65.130.104:8081/api/v1";

export function getToken() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token") || "";
    return token;
  }
  return "";
}

export function setToken(newToken) {
  localStorage.setItem("token", newToken);
}

export const dateFormat = "DD/MM/YYYY";
