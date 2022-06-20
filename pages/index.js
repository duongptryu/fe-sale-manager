import { useRouter } from "next/router";
import { useEffect } from "react";

const Main = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);
};

export default Main;
