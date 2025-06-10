/* eslint-disable*/
import React, { useEffect, useState } from "react";

import "./Ordered.scss";
import { getOrderByOrderType } from "@/api/orderAPI/order";

const Ordered = () => {
  const [orderType, setOrderType] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrderByOrderType(orderType);
        setOrders(response.data);
        console.log("Fetched orders:", response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [orderType]);

  return (
    <div className="ordered" data-aos="fade-left">
      <div className="ordered__container">
        <h1 className="ordered__container-title">Lịch sử mua hàng</h1>
        <div className="ordered__container-menu">
          <p onClick={() => setOrderType("")}>Tất cả</p>
          <p onClick={() => setOrderType("PENDING")}>Đang giao hàng</p>
          <p onClick={() => setOrderType("SHIPPED")}>Đã giao hàng</p>
          <p onClick={() => setOrderType("CANCELED")}>Đã hủy</p>
        </div>
      </div>
    </div>
  );
};

export default Ordered;
