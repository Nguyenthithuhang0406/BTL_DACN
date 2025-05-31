/* eslint-disable*/
import React from "react";

import "./Ordered.scss";

const Ordered = () => {
  return (
    <div className="ordered" data-aos="fade-left">
      <div className="ordered__container">
        <h1 className="ordered__container-title">Lịch sử mua hàng</h1>
        <div className="ordered__container-menu">
          <p>Tất cả</p>
          <p>Đang giao hàng</p>
          <p>Đã giao hàng</p>
          <p>Đã hủy</p>
        </div>
      </div>
    </div>
  );
};

export default Ordered;
