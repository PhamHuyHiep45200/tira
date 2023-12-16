import Upload from "@/components/pages/post/Upload";
import { Form } from "antd";
import React, { useContext } from "react";
import Info from "@/components/pages/post/Info";
import { postProduct } from "@/service/product";
import { CreateContext } from "@/context/ContextProviderGlobal";

function Post() {
  const { successNoti } = useContext(CreateContext);
  const [form] = Form.useForm();
  const postProducct = async (values) => {
    try {
      const dataPost = {
        ...values,
        image: [values.image],
      };
      await postProduct(dataPost);
      form.resetFields()
      successNoti("Đăng bài thành công! Vui lòng đợi Admin Duyệt Bài.");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form onFinish={postProducct} form={form}>
      <div className="flex justify-center">
        <div className="mb-[100px] mt-[50px] w-full xl:w-[1280px] px-2 md:px-0">
          <h3 className="font-bold text-[30px] text-center mb-10">
            ĐĂNG BÁN SẢN PHẨM
          </h3>
          <div className="flex flex-col md:flex-row items-center xl:items-start">
            <Form.Item
              name="image"
              rules={[{ required: true, message: "Trường này bắt buộc" }]}
            >
              <Upload />
            </Form.Item>
            <Info />
          </div>
        </div>
      </div>
    </Form>
  );
}

export default Post;
