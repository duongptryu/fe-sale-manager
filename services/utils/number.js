import moment from "moment";

export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};
