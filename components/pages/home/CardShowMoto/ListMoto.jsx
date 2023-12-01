import CardBase from "@/components/common/CardBase";
import { EyeOutlined, SketchOutlined, StarOutlined } from "@ant-design/icons";
import { Card, Carousel, Image, Rate } from "antd";
import React, { useMemo } from "react";

function ListMoto({ type }) {
  const icon = useMemo(() => {
    switch (type) {
      case "star":
        return <StarOutlined className="text-[#ffb341] text-[20px]" />;
      case "rent":
        return <SketchOutlined className="text-[#9d34ff] text-[20px]" />;
      default:
        return <EyeOutlined className="text-primary text-[20px]" />;
    }
  }, [type]);
  const color = useMemo(() => {
    switch (type) {
      case "star":
        return "#ffb341";
      case "rent":
        return "#9d34ff";
      default:
        return "#07c2b2";
    }
  }, [type]);
  return (
    <Carousel draggable dots={false}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
        <div key={e} className="w-full">
          <div className="w-[90%] h-[300px] flex justify-center m-auto items-center">
            <Card
              title={false}
              bodyStyle={{
                padding: 0,
                height: "280px",
                borderRadius: "5px",
                overflow: "hidden",
              }}
              bordered={false}
              style={{ width: 300, boxShadow: "0 0 5px 3px #eaeaea" }}
            >
              <Image
                alt=""
                src="/image/list-moto.webp"
                wrapperStyle={{ width: "100%" }}
                className="!h-[180px]"
              />
              <div className="px-5 py-[10px]">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {icon}
                    <span
                      className="text-[12px] ml-[6px] underline underline-offset-2 font-medium"
                      style={{ color: color }}
                    >
                      100
                    </span>
                  </div>
                  <Rate />
                </div>
                <span className="textNameMoto font-bold text-[14px] text-[black]">
                  Xe máy điện XMEN CAPTAIN 2 giảm sóc đời mới
                </span>
              </div>
            </Card>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default ListMoto;
