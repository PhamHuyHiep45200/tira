import { formatMoney } from "@/utils/common.util";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import React from "react";

function CardBase({ hoverAction, width, height }) {
  return (
    <Card
      title={false}
      bodyStyle={{
        padding: 0,
        width: width ? width : "100%",
        height: height ? height : "400px",
        borderRadius: "5px",
        overflow: "hidden",
        cursor: "pointer",
      }}
      bordered={false}
      className={hoverAction ? "container-card" : ""}
      style={{ boxShadow: "0 0 5px 3px #eaeaea" }}
    >
      <div className="w-full h-[70%] overflow-hidden">
        <img
          src="https://down-vn.img.susercontent.com/file/66cf77a415f77625ed1b9baf84fc7804"
          alt=""
          className={`w-full h-full ${hoverAction ? "image-card" : ""}`}
        />
      </div>
      <div className="px-5">
        <div className="text-[20px] font-semibold leading-[1.3] truncate-2 mt-2">
          Nguyên bộ máy tính để bàn chuyên đồ họa Core i5 Ram 8GB
        </div>
        <div className="flex justify-between items-end mt-[15px]">
          {/* <span className="text-[#999]">Số lượng: <span className="text-[#ff7b0f]">18</span></span> */}
          <span className="text-[red] text-[22px] font-bold">
            {formatMoney(12000)} đ
          </span>
          <Button className="flex items-center space-x-1">
            Add to cart <ShoppingCartOutlined />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default CardBase;
