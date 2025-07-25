/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaCaretDown } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

import "./Menu.scss";
import { toast } from "react-toastify";
const Menu = () => {
  const navigate = useNavigate();
  const quantityOfProducts = useSelector((state) => state.order.quantityOfCart);
  const [isLogin, setIsLogin] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const childRef = useRef(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      // navigate("/auth");
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (childRef.current && !childRef.current.contains(event.target)) {
        setIsShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [childRef]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    toast.success("Đăng xuất thành công");
    setIsLogin(false);
    navigate("/auth");
  };
  return (
    <>
      <div className="menu-desktop">
        <ul className="menu-desktop__list">
          <li className="menu-desktop__item">
            <span
              onClick={() => navigate("/")}
              className="menu-desktop__item-span"
            >
              Trang chủ
            </span>
          </li>
          <li className="menu-desktop__item">
            <span className="menu-desktop__item-span">
              Nữ <FaCaretDown className="menu-desktop__item-span-down" />
              <FaCaretUp className="menu-desktop__item-span-up" />
            </span>
            <div className="menu-desktop__sub sub1">
              <ul className="menu-desktop__sub-list">
                <li className="menu-desktop__sub-list-title">Phụ kiện nữ </li>
                <li className="menu-desktop__sub-list-item">Tất nữ</li>
                <li className="menu-desktop__sub-list-item">Túi nữ</li>
                <li className="menu-desktop__sub-list-item">
                  Phụ kiện nữ khác
                </li>
              </ul>
              <ul className="menu-desktop__sub-list">
                <li className="menu-desktop__sub-list-title">Áo nữ</li>
                <li className="menu-desktop__sub-list-item">Áo khoác nữ</li>
                <li className="menu-desktop__sub-list-item">
                  Áo hoodie - Ảo nỉ nữ
                </li>
                <li className="menu-desktop__sub-list-item">Áo polo nữ</li>
                <li className="menu-desktop__sub-list-item">Áo sơ mi nữ</li>
                <li className="menu-desktop__sub-list-item">Áo thun nữ</li>
              </ul>
            </div>
          </li>
          <li className="menu-desktop__item">
            <span className="menu-desktop__item-span">
              Nam <FaCaretDown className="menu-desktop__item-span-down" />
              <FaCaretUp className="menu-desktop__item-span-up" />
            </span>
            <div className="menu-desktop__sub sub2">
              <ul className="menu-desktop__sub-list">
                <li className="menu-desktop__sub-list-title">Phụ kiện nam </li>
                <li className="menu-desktop__sub-list-item">Tất nam</li>
                <li className="menu-desktop__sub-list-item">Túi xách nam</li>
                <li className="menu-desktop__sub-list-item">Mũ nam</li>
              </ul>
              <ul className="menu-desktop__sub-list">
                <li className="menu-desktop__sub-list-title">Áo nam</li>
                <li className="menu-desktop__sub-list-item">Áo khoác nam</li>
                <li className="menu-desktop__sub-list-item">Áo nỉ nam</li>
                <li className="menu-desktop__sub-list-item">Áo len nam</li>
              </ul>
              <ul className="menu-desktop__sub-list">
                <li className="menu-desktop__sub-list-title">Quần nam</li>
                <li className="menu-desktop__sub-list-item">Quần kaki</li>
                <li className="menu-desktop__sub-list-item">Quần short nam</li>
                <li className="menu-desktop__sub-list-item">Quần jeans nam</li>
                <li className="menu-desktop__sub-list-item">Quần âu nam</li>
              </ul>
            </div>
          </li>
          <li className="menu-desktop__item">
            <span
              onClick={() => navigate("/blog")}
              className="menu-desktop__item-span"
            >
              Tin tức
            </span>
          </li>
          <li className="menu-desktop__item">
            <span
              onClick={() => navigate("/contact")}
              className="menu-desktop__item-span"
            >
              Liên hệ
            </span>
          </li>
          <li className="menu-desktop__item">
            <span
              onClick={() => navigate("/market-system")}
              className="menu-desktop__item-span"
            >
              Hệ thống cửa hàng
            </span>
          </li>
          <li className="menu-desktop__item">
            <span
              className="menu-desktop__item-span"
              onClick={() => navigate("/references")}
            >
              Kiểm tra đơn hàng
            </span>
          </li>
        </ul>
      </div>

      <div className="menu-mobile">
        <ul className="menu-mobile__list relative">
          <li className="menu-mobile__item flex flex-col items-center justify-center">
            <FaBars className="menu-mobile_item-icon" />
            <p className="menu-mobile_item-p">Menu</p>
          </li>
          <li
            className="menu-mobile__item flex flex-col items-center justify-center"
            onClick={() => navigate(`/followingProducts`)}
          >
            <IoHeart className="menu-mobile_item-icon" />
            <p className="menu-mobile_item-p">Yêu thích</p>
          </li>
          <li
            className="menu-mobile__item flex flex-col items-center justify-center"
            onClick={() => setIsShow(!isShow)}
          >
            <MdAccountCircle className="menu-mobile_item-icon" />
            <p className="menu-mobile_item-p">Tài khoản</p>
          </li>
          {isShow && !isLogin && (
            <div
              ref={childRef}
              className="absolute bottom-[50px] right-[15%] bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2"
            >
              <p onClick={() => navigate("/auth")}>Đăng ký</p>
              <p onClick={() => navigate("/auth")}>Đăng nhập</p>
            </div>
          )}
          {isShow && isLogin && (
            <div
              ref={childRef}
              className="absolute bottom-[50px] right-[15%] bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2"
            >
              <p onClick={() => navigate("/profile")}>Trang cá nhân</p>
              <p onClick={handleLogout}>Đăng xuất</p>
            </div>
          )}
          <li
            className="menu-mobile__item relative flex flex-col items-center justify-center"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="menu-mobile_item-icon" />
            {quantityOfProducts > 0 && (
              <span className="text-red-500 bg-lime-50 min-w-[20px] h-[20px] rounded-full flex items-center justify-center absolute -top-2 right-0 text-[14px]">
                {quantityOfProducts}
              </span>
            )}
            <p className="menu-mobile_item-p">Giỏ hàng</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
