import { CreateContext } from "@/context/ContextProviderGlobal";
import React, { useContext } from "react";

function AccountInfo({ editForm }) {
  const {user} = useContext(CreateContext);
  return (
    <div>
      <div
        className="flex items-center mt-[10px] h-[50px]"
        style={{ borderBottom: "1px dashed #ccc" }}
      >
        <span className="text-[black] text-[14px] font-medium">
          Họ Và Tên :
        </span>
        <span className="text-primary text-[14px] font-bold ml-[20px]">
          {user?.name}
        </span>
      </div>
      <div
        className="flex items-center mt-[10px] h-[50px]"
        style={{ borderBottom: "1px dashed #ccc" }}
      >
        <span className="text-[black] text-[14px] font-medium">Email :</span>
        <span className="text-primary text-[14px] font-bold ml-[20px]">
          {user?.email}
        </span>
      </div>
      <div
        className="flex items-center mt-[10px] h-[50px]"
        style={{ borderBottom: "1px dashed #ccc" }}
      >
        <span className="text-[black] text-[14px] font-medium">
          Số Điện Thoại :
        </span>
        <span className="text-primary text-[14px] font-bold ml-[20px]">
          {user?.phone}
        </span>
      </div>
      <div className="text-center">
        <div
          className="bg-primary flex items-center h-[45px] justify-center rounded-[4px] mt-5 text-[white] cursor-pointer"
          onClick={() => editForm(true)}
        >
          Thay Đổi thông tin
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;