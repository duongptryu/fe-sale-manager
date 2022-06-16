import { useRouter } from "next/router";
import { useEffect } from "react";

const main = () => {
  const Router = useRouter();

  useEffect(() => {
    Router.push("/dashboard");
  }, []);
};

export default main;
