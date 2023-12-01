import React from "react";
import Banner from "./Banner";
import Category from "./Category";
import { Col, Row } from "antd";
import ProductNew from "./Product/ProductNew";
import CardBase from "@/components/common/CardBase";

function HomePages() {
  return (
    <div>
      <Banner />
      <div className="w-[1280px] m-[auto] px-5 py-10">
        <div className="my-[30px]">
          <div className="text-[25px] underline mb-2 font-bold">Sản Phẩm Mới Nhất</div>
          <ProductNew />
        </div>
        <div className="mt-[150px]">
          <Category />
        </div>
        <div className="mt-[100px]">
          <div className="text-[25px] underline mb-2 font-bold">Sản Phẩm Khác</div>
          <Row gutter={[40, 50]}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e) => {
              return (
                <Col span={8} key={e}>
                  <CardBase hoverAction height={'500px'} />
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
