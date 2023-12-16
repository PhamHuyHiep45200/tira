import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";

function QuantityProduct({ value, onChange }) {
  const [quantity, setQuantity] = useState(value);
  const ref = useRef(null);
  useEffect(() => {
    setQuantity(value);
  }, [value]);
  const handlePlus = () => {
    setQuantity(quantity + 1);
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      onChange?.(quantity + 1);
    }, [400]);
  };
  const handleMinus = () => {
    if (quantity !== 1) setQuantity(quantity - 1);

    if (quantity !== 1) {
      clearTimeout(ref.current);
      ref.current = setTimeout(() => {
        onChange?.(quantity - 1);
      }, [400]);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="flex items-center border-solid border-[1px]">
        <div
          className="flex justify-center select-none cursor-pointer items-center h-[25px] w-[25px] md:h-[35px] md:w-[35px] border-r-[1px]"
          onClick={handleMinus}
        >
          <MinusOutlined
            style={{
              opacity: quantity === 1 ? 0.3 : 1,
            }}
          />
        </div>
        <div className="px-2 md:px-5">{quantity}</div>
        <div
          className="flex justify-center select-none cursor-pointer items-center h-[25px] w-[25px] md:h-[35px] md:w-[35px] border-l-[1px]"
          onClick={handlePlus}
        >
          <PlusOutlined />
        </div>
      </div>
    </div>
  );
}

export default QuantityProduct;
