import CardBase from "@/components/common/CardBase";
import { REPONSIVE_SCREEN } from "@/enum/reponsive";
import useWindowSize from "@/hooks/useResize";
import { Image } from "antd";
import React, { useMemo } from "react";
import Slider from "react-slick";

function ProductNew({data}) {
  const [width, height] = useWindowSize()

  const settings = useMemo(()=>{
    return {
      dots: true,
      infinite: true,
      speed: 400,
      slidesToShow: width < REPONSIVE_SCREEN.MD ? 1.2 : 3,
      slidesToScroll: 1,
      className: "center",
      draggable: true,
      autoplay: true,
      autoplaySpeed: 3000,
      centerMode: true,
      swipeToSlide: true,
      dots: false,
      pauseOnHover: false
    }
  },[width]);

  return (
    <Slider {...settings}>
      {data.length && data.map((e, i) => {
        return (
          <div className="px-[10px] md:px-[30px]" key={e}>
            <CardBase infoProduct={e} />
          </div>
        );
      })}
    </Slider>
  );
}

export default ProductNew;
