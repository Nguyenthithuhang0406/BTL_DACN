/* eslint-disable */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { formatNumber } from "@/utils/function";
import { FaRegHeart } from "react-icons/fa";

import "./ProductItem.scss";

const ProductItem = ({product}) => {
  const [indexImage, setIndexImage] = useState(0);
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/product/2")} className="product-item">
      <button className="product-item_discount">- {product.discount}%</button>
      <div className="product-item_following">
        <FaRegHeart />
      </div>
      <div className="product-item_img">
        <img src={product.image[indexImage]} alt={product.name} />
      </div>
      <button className="product-item_add-to-card">Thêm vào giỏ hàng</button>
      <div className="product-item_img-list">
        {product.image.map((image, index) => (
          <div
            onMouseEnter={() => setIndexImage(index)}
            key={index}
            className={`product-item_img-list-item ${
              index === indexImage ? "active" : ""
            }`}
          >
            <img src={image} alt={product.name} />
          </div>
        ))}
      </div>
      <p className="product-item_name">{product.name}</p>
      <p className="product-item_sold">
        Đã bán: <span>{product.count}</span> sản phẩm
      </p>
      <div className="product-item_price">
        <p className="product-item_price-fake">
          {formatNumber(product.price * (1 - product.discount / 100))}đ
        </p>
        <p className="product-item_price-real">
          {formatNumber(product.price)} đ
        </p>
      </div>
    </div>
  );
}

export default ProductItem;
