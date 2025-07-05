// src/components/Loading/RouteChangeLoader.jsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NProgress from "nprogress";

const RouterLoader = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300); // simulate delay, adjust as needed

    return () => clearTimeout(timeout);
  }, [location]);

  return null;
};

export default RouterLoader;
