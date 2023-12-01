import CardBase from "@/components/common/CardBase";
import { Image } from "antd";
import React from "react";
import Slider from "react-slick";

function ProductNew() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "center",
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    swipeToSlide: true,
    dots: false
  };
  return (
    <Slider {...settings}>
      {[1, 2, 3, 4, 5].map((e, i) => {
        return (
          <div className="px-[30px]" key={e}>
            <CardBase />
          </div>
        );
      })}
    </Slider>
  );
}

export default ProductNew;
