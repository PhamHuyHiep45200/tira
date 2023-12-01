import { FileSearchOutlined } from "@ant-design/icons";
import { Card, Image, Rate } from "antd";
import { useRouter } from "next/router";
import React from "react";

function Search() {
    const router=useRouter()
    const redirectDetail = ()=>{
        router.push('/detail/896524952')
    }
  return (
    <div className="mt-[70px] px-5 mb-[100px]">
      <div className="h-[35px] border-b flex items-center text-[#000] text-[16px]">
        <FileSearchOutlined className="text-primary text-[20px]" />{" "}
        <span className="text-primary font-bold text-[20px] ml-[5px]">10</span>
      </div>
      <div className="flex flex-col items-center space-y-[20px] mt-10">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => {
          return (
            <Card
              key={e}
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
                    <span
                      className="text-[12px] ml-[6px] text-primary underline underline-offset-2 font-medium"
                    >
                      100
                    </span>
                  </div>
                  <Rate />
                </div>
                <span className="textNameMoto font-bold text-[14px] text-[black]" onClick={redirectDetail}>
                  Xe máy điện XMEN CAPTAIN 2 giảm sóc đời mới
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  )
}

export default Search