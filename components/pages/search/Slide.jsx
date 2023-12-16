import { Form, Slider } from "antd";
import React from "react";

function Slide({priceSlider}) {
  return (
    <Form.Item noStyle name={["filter", "price"]}>
      <Slider range min={priceSlider.min} max={priceSlider.max} />
    </Form.Item>
  );
}

export default Slide;
