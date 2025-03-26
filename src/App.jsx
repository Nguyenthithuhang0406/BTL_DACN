/* eslint-disable */
import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import DetailProduct from "./pages/product/DetailProduct/DetailProduct";
import Search from "./pages/product/search/Search";
import Cart from "./pages/cart/Cart";
import Auth from "./pages/auth/Auth";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Thời gian hiệu ứng (ms)
      once: true, // Chỉ chạy một lần khi cuộn
    });
  }, []);

  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/product/:id",
      element: <DetailProduct/>,
    },
    {
      path: "/search",
      element: <Search/>,
    },
    {
      path: "/cart",
      element: <Cart/>
    },
    {
      path: "/auth",
      element: <Auth/>,
    }
  ]);
  return <>{routes}</>;
};

export default App;
