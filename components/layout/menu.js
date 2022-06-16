import { setToken } from "../../services/utils/const";

const handleLogout = () => {
  setToken("");
};

const MenuKey = {
  Dashboard: {
    key: "1",
    link: "/dashboard",
  },
  Category: {
    key: "2",
    link: "/category",
  },
  Seller: {
    key: "3",
    link: "/seller",
  },
  Order: {
    key: "4",
    link: "/order",
  },
  Logout: {
    key: "5",
    handle: handleLogout,
  },
};

export default MenuKey;
