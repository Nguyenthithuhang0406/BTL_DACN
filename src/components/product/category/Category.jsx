/* eslint-disable */
import React from 'react'

import "./Category.scss";
const Category = () => {
  const listCategory = [
    {
      image:
        "https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/image_cate_1.png?1741622097223",
      title: "Áo nữ",
    },
    {
      image:
        "https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/image_cate_2.png?1741622097223",
      title: "Váy",
    },
    {
      image:
        "https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/image_cate_3.png?1741622097223",
      title: "Áo nam",
    },
    {
      image:
        "https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/image_cate_4.png?1741622097223",
      title: "Sơ mi",
    },
    {
      image:
        "https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/image_cate_5.png?1741622097223",
      title: "Quần",
    },
    {
      image:
        "https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/image_cate_6.png?1741622097223",
      title: "Áo khoác",
    },
    {
      image:
        "https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/image_cate_7.png?1741622097223",
      title: "Giày dép",
    },
    {
      image:
        "https://bizweb.dktcdn.net/100/534/571/themes/972900/assets/image_cate_8.png?1741622097223",
      title: "Phụ kiện",
    },
  ];
  return (
    <div data-aos="fade-up" className="category">
      {listCategory.map((item, index) => (
        <div key={index} className="category__item">
          <div className="category__item-img">
            <img src={item.image} alt={item.title} />
          </div>
          <button className="category__item-btn">{item.title}</button>
        </div>
      ))}
    </div>
  );
}

export default Category;
