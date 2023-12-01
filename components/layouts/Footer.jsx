import { PhoneOutlined } from "@ant-design/icons";
import React from "react";

function Footer() {
  return (
    <div className="bg-primary bg-opacity-25 px-5 py-5 fixed bottom-0 left-0 right-0">
      <div className="flex items-center">
        <span className="text-[#777] font-medium text-[14px]">
          Liên hệ với chúng tôi :{" "}
        </span>
        <span className="flex items-center font-bold ml-[10px] text-[#333]">
          <PhoneOutlined />
          .09748265428
        </span>
      </div>
    </div>
  );
}

export default Footer;
