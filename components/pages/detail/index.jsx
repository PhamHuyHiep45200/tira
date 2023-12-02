import React from "react";
import Upload from "../post/Upload";

function DetailProduct() {
  return (
    <div className="flex justify-center">
      <div className="mb-[100px] mt-[50px] w-[1280px]">
        <div className="flex items-start">
          <Upload />
          <div className="flex flex-col justify-between h-[400px]">
            <div>
              <span>ten</span>
              <br />
              <br />
              <span>Gia</span>
              <br />
              <br />
              <span>the loai</span>
              <br />
              <br />
              <span>soluong</span>
              <br />
              <br />
              <div>note</div>
            </div>
            <div className="flex space-x-4">
              <div>Them gio hang Hàng</div>
            </div>
          </div>
        </div>
        <div>des</div>
      </div>
    </div>
  );
}

export default DetailProduct;
