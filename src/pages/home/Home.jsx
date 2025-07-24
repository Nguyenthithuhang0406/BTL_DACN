/* eslint-disable */
import Banner from "@/components/commons/banner/Banner";
import Layout from "@/components/commons/layout/Layout";
import Category from "@/components/product/category/Category";
import Accessory from "@/components/product/collection/accessory/Accessory";
import Female from "@/components/product/collection/female/Female";
import Male from "@/components/product/collection/male/Male";
import Comment from "@/components/product/comment/Comment";
import DiscountedProduct from "@/components/product/discountedProduct/DiscountedProduct";
import SuggestedProduct from "@/components/product/suggestedProducts/SuggestedProduct";
import Voucher from "@/components/product/voucher/Voucher";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Home = () => {
  useEffect(() => {
    const getCodeToBE = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        try {
          const response = await getCodeFromGoogle(code);
          if (response.status === "SUCCESS" && response.data) {
            toast.success("Đăng nhập thành công");
          }
        } catch (error) {
          console.error("Error fetching code from Google:", error);
        }
      }
    };
    getCodeToBE();
  }, []);
  
  return (
    <div>
      <Layout>
        <Banner />
        <Category />
        <Voucher />
        <DiscountedProduct />
        <SuggestedProduct />
        <Male />
        <Female />
        <Accessory />
        <Comment />
      </Layout>
    </div>
  );
};

export default Home;
