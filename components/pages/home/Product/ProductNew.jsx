import CardBase from "@/components/common/CardBase";
import { REPONSIVE_SCREEN } from "@/enum/reponsive";
import useWindowSize from "@/hooks/useResize";
import { Col, Image, Pagination, Row } from "antd";
import React, { useMemo } from "react";
import Slider from "react-slick";

function ProductNew({ data }) {
  const [width, height] = useWindowSize();

  const settings = useMemo(() => {
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
      pauseOnHover: false,
    };
  }, [width]);

  return (
    // <Slider {...settings}>
    //   {data.length && data.map((e, i) => {
    //     return (
    //       <div className="px-[10px] md:px-[30px]" key={e}>
    //         <CardBase infoProduct={e} />
    //       </div>
    //     );
    //   })}
    // </Slider>
    <Row
      gutter={[
        width < REPONSIVE_SCREEN.MD ? 10 : 20,
        width < REPONSIVE_SCREEN.MD ? 5 : 30,
      ]}
    >
      {data.map((e) => {
        return (
          <Col span={12} sm={12} md={8} lg={6} xl={6} key={e}>
            <CardBase hoverAction infoProduct={e} />
          </Col>
        );
      })}
    </Row>
  );
}

export default ProductNew;
