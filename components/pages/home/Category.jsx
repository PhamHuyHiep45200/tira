import { Carousel, Image } from "antd";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { CategoryData } from "@/data/banner";

function Category({data}) {
  const [dot, setDot] = useState(0);
  const settings = useMemo(()=>{
    return {
      dots: true,
      infinite: true,
      speed: 200,
      slidesToShow: data.length < 5 ? data.length : 5,
      slidesToScroll: 1,
      className: "center",
      draggable: true,
      autoplay: true,
      autoplaySpeed: 2000,
      centerMode: true,
      swipeToSlide: true,
      pauseOnHover: false
    }
  },[data]);
  const changeSwiper = (e) => {
    setDot(e);
  };
  return (
    <div>
      <div className="text-center">
        <Image src='/image/logo-cate.png' alt='' preview={false} />
      </div>
      <Slider {...settings} afterChange={changeSwiper}>
        {data.map((category, i) => {
          return (
            <div className="!flex justify-center p-[30px]" key={category.key}>
              <div className="flex flex-col items-center">
                <div
                  className="w-[180px] h-[180px] flex items-center justify-center rounded-full"
                  style={{
                    boxShadow: dot === i && data.length >4 ? "0 0 3px 3px #07c2b2" : "",
                  }}
                >
                  <div
                    className="w-[120px] border-solid border-[1px] h-[120px] overflow-hidden flex justify-center items-center rounded-full"
                    style={{
                      transform: dot === i && data.length >4 ? "scale(1.5)" : "scale(1)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Image
                      src={category.image}
                      className="w-full h-full"
                      alt="category"
                      preview={false}
                    />
                  </div>
                </div>
                <div className="mt-[30px] font-bold">{category.name}</div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Category;
