import { Checkbox, Form } from "antd";
import React from "react";

function Category({category}) {
  return (
    <Form.Item name={["filter", "category"]}>
      <Checkbox.Group options={category} className="flex flex-col space-y-2" />
    </Form.Item>
  );
}

export default Category;
