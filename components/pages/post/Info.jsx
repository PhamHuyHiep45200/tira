import DesctiptionBase from "@/components/pages/post/Desctiption";
import { getAllCategory, getAllCollection } from "@/service/category";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { Editor } from "primereact/editor";
import React, { useEffect, useState } from "react";

function Info() {
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState([])
  const [collection, setCollection] = useState([])

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    await Promise.all([getAllDataCategory(), getAllDataCollection()])
  }
  const getAllDataCategory = async () => {
    setLoading(true);
    try {
      const { categories } = await getAllCategory();
      setCategory(categories.data.map((category) => ({
        label: category.name,
        value: category.id
      })));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllDataCollection = async () => {
    setLoading(true);
    try {
      const { collections } = await getAllCollection();
      setCollection(collections.data.map((category) => ({
        label: category.name,
        value: category.id
      })));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full pl-0 md:pl-[100px]">
      <h3 className="text-[22px] text-white bg-[#333] text-center py-2">
        Thông Tin Sản Phẩm
      </h3>
      <Row gutter={[0, 20]} className="mt-10">
        <Col span={6} className="flex items-center pl-5 font-semibold">
          Tên Sản Phẩm
        </Col>
        <Col span={18}>
          <Form.Item name="name" rules={[{required: true, message: 'Trường này bắt buộc'}]}>
            <Input size="large" className="max-w-[350px]" />
          </Form.Item>
        </Col>
        <Col span={6} className="flex items-center pl-5 font-semibold">
          Số Lượng
        </Col>
        <Col span={18}>
          <Form.Item name="quantity" rules={[{required: true, message: 'Trường này bắt buộc'}]}>
          <InputNumber size="large" className="max-w-[350px]" />
          </Form.Item>
        </Col>
        <Col span={6} className="flex items-center pl-5 font-semibold">
          Giá Sản Phẩm
        </Col>
        <Col span={18}>
          <Form.Item name="price" rules={[{required: true, message: 'Trường này bắt buộc'}]}>
            <InputNumber size="large" className="max-w-[350px]" />
          </Form.Item>
        </Col>
        <Col span={6} className="flex items-center pl-5 font-semibold">
          Thể Loại
        </Col>
        <Col span={18}>
          <Form.Item name="category" rules={[{required: true, message: 'Trường này bắt buộc'}]}>
            <Select
              size="large"
              className="rounded-[20px] min-w-[250px]"
              options={category}
            ></Select>
          </Form.Item>
        </Col>
        <Col span={6} className="flex items-center pl-5 font-semibold">
          Bộ Sưu Tập
        </Col>
        <Col span={18}>
          <Form.Item name="collection" rules={[{required: true, message: 'Trường này bắt buộc'}]}>
            <Select
              size="large"
              className="rounded-[20px] min-w-[250px]"
              options={collection}
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="description" rules={[{required: true, message: 'Trường này bắt buộc'}]}>
        <DesctiptionBase label="Chi Tiết Sản Phẩm" />
      </Form.Item>
      <Form.Item name="note" rules={[{required: true, message: 'Trường này bắt buộc'}]}>
        <DesctiptionBase label="Chú Ý" />
      </Form.Item>
      <div className="mt-5 text-center">
        <Button size="large" type="primary" htmlType="submit" className="bg-primary">
          Đăng Sản Phẩm
        </Button>
      </div>
    </div>
  );
}

export default Info;
