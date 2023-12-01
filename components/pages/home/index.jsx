import React from "react";
import Banner from "./Banner";
import Category from "./Category";
import { Button, Col, Image, Row } from "antd";
import ProductNew from "./Product/ProductNew";
import CardBase from "@/components/common/CardBase";

const listImage = [
  "https://pos.nvncdn.net/dca44c-69300/bn/20230518_NRuLyeyJ.png",
  "https://pos.nvncdn.net/dca44c-69300/bn/20221208_l0EK09MD8OqaJG0u.png",
  "https://pos.nvncdn.net/dca44c-69300/bn/20230518_iiOArOu7.png",
  "https://scontent.xx.fbcdn.net/v/t1.15752-9/398324449_196004303567818_172238991446465391_n.png?stp=dst-png_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=510075&_nc_ohc=ybPY66rNQ9wAX9d9nDj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSe3x9yIZ7tDPBGyVBentWKHX2Qerxsw_jTKpjASTB0IQ&oe=65917D14",
];

function HomePages() {
  return (
    <div>
      <Banner />
      <div className="w-[1280px] m-[auto] px-5 py-10">
        <div className="my-[30px]">
          <div className="text-[25px] underline mb-2 font-bold">
            Sản Phẩm Nổi Bật
          </div>
          <ProductNew />
        </div>
        <div className="mt-[150px]">
          <Category />
        </div>
        <div className="mt-[100px]">
          <div className="text-[25px] underline mb-2 font-bold">
            Sản Phẩm Khác
          </div>
          <Row gutter={[20, 30]}>
            {[1, 2, 3, 4].map((e) => {
              return (
                <Col span={6} key={e}>
                  <CardBase hoverAction height={"400px"} />
                </Col>
              );
            })}
          </Row>
          <div className="text-center mt-5">
            <Button size="large">Xem Thêm</Button>
          </div>
        </div>
        <div className="my-[100px]">
          <Row gutter={[30, 30]}>
            {listImage.map((e) => {
              return (
                <Col span={12} key={e} className="cursor-pointer">
                  <img
                    alt=""
                    src={e}
                    preview={false}
                    className="w-full h-full object-cover"
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default HomePages;
