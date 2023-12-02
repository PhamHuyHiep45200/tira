import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

function QuantityProduct({ value, onChange }) {
  const [quantity, setQuantity] = useState(value);
  useEffect(() => {
    setQuantity(value);
  }, [value]);
  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  const handleMinus = () => {
    if (quantity !== 1) setQuantity(quantity - 1);
  };
  return (
    <div className="flex justify-center">
      <div className="flex items-center border-solid border-[1px]">
        <div
          className="flex justify-center select-none cursor-pointer items-center h-[35px] w-[35px] border-r-[1px]"
          onClick={handleMinus}
        >
          <MinusOutlined />
        </div>
        <div className="px-5">{quantity}</div>
        <div
          className="flex justify-center select-none cursor-pointer items-center h-[35px] w-[35px] border-l-[1px]"
          onClick={handlePlus}
        >
          <PlusOutlined />
        </div>
      </div>
    </div>
  );
}

export default QuantityProduct;
