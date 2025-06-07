/* eslint-disable*/
import React, { useEffect, useState } from "react";
import { fakeProducts } from "@/utils/const/Constant";

import "./ProductsContainer.scss";
import ProductItem from "../../discountedProduct/productItem/ProductItem";
import { Pagination } from "antd";
import { getAllProducts } from "@/api/productAPI/product";

const ProductsContainer = ({ categoryName }) => {
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchProductByCategory = async () => {
      const data = {
        sortedBy: "createdAt",
        sortDirection: "desc",
        page: currentPage - 1,
        size: pageSize,
        category: categoryName,
        status: "true",
      };
      try {
        const response = await getAllProducts(data);
        // console.log("Products by category response:", response);
        setProducts(response.data.content);
        setTotalProducts(response.data.totalElements);
      } catch (error) {
        console.error("Lấy sản phẩm theo danh mục không thành công:", error);
      }
    };
    fetchProductByCategory();
  }, [pageSize, currentPage, categoryName]);


  return (
    <div className="productsContainer">
      <div className="productsContainer__header">
        <h1>Tất cả sản phẩm</h1>
        <div className="productsContainer__header-search">
          <p>Sắp xếp theo</p>
          <select>
            <option>Mặc định</option>
            <option>A - Z</option>
            <option>Z - A</option>
            <option>Giá tăng dần</option>
            <option>Giá giảm dần</option>
            <option>Hàng mới nhất</option>
            <option>Hàng cũ nhất</option>
          </select>
        </div>
      </div>
      <div className="productsContainer__list">
        {products?.map((product, index) => (
          <ProductItem product={product} />
        ))}
      </div>
      <Pagination
        align="center"
        pageSize={pageSize}
        total={totalProducts}
        current={currentPage}
        onChange={handleChangePage}
        style={{ marginBottom: "20px" }}
      />
    </div>
  );
};

export default ProductsContainer;
