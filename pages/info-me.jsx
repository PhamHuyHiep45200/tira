import Upload from "@/components/pages/post/Upload";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { updateMe, updateUser } from "@/service/user";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Row,
} from "antd";
import React, { useContext, useEffect, useState } from "react";

function InfoMe() {
  const { user, getMe } = useContext(CreateContext);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      image: user?.image,
      name: user?.name,
      email: user?.email,
      address: user?.address,
    });
  }, [user]);

  const updateUserSubmit = async (values) => {
    try {
      await updateMe({
        ...user
        ,...values,
        role: 'client'
      });
      await getMe();
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="mb-[100px] mt-[50px] w-full xl:w-[1280px] relative">
        <div className="flex justify-center">
          <Card className="max-w-[350px] min-w-[350px] md:max-w-[800px] md:min-w-[800px] flex justify-center">
            <h3 className="text-center my-5 font-bold text-[20px]">
              THÔNG TIN TÀI KHOẢN
            </h3>
            <Image
              alt="Ảnh Đại Diện"
              width={300}
              height={300}
              preview={false}
              className="rounded-full"
              src={user?.image ?? "/image/no-image.png"}
            />
            <div className="flex flex-col items-center space-y-4">
              <span className="text-[18px] font-semibold">{user?.name}</span>
              <Button size="large" onClick={() => setOpen(true)}>
                <EditOutlined /> Chỉnh Sửa
              </Button>
              <Divider />
              <Row gutter={[0, 20]}>
                <Col span={6}>
                  <Image alt="" src="/image/email.gif" width={30} height={30} />
                </Col>
                <Col span={18}>
                  <span className="leading-[2.2] text-[16px] font-semibold">
                    {user?.email ?? "..."}
                  </span>
                </Col>
                <Col span={6}>
                  <Image
                    alt=""
                    src="/image/address.gif"
                    width={30}
                    height={30}
                  />
                </Col>
                <Col span={18}>
                  <span className="leading-[2.4] text-[16px] font-semibold">
                    {user?.address ?? "..."}
                  </span>
                </Col>
              </Row>
            </div>
          </Card>
        </div>
      </div>
      <Modal
        title="Chỉnh Sửa Thông Tin"
        footer={false}
        open={open}
        onCancel={handleCancel}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          colon={false}
          requiredMark={false}
          onFinish={updateUserSubmit}
        >
          <div className="flex justify-center">
            <Form.Item name="image">
              <Upload
                styleBody={{
                  justifyContent: "center",
                }}
              />
            </Form.Item>
          </div>
          <Form.Item name="name" label="Tên">
            <Input size="large" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input size="large" />
          </Form.Item>
          <Form.Item name="address" label="Địa Chỉ">
            <Input size="large" />
          </Form.Item>
          <div className="flex justify-center">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="bg-primary hover:bg-primary"
            >
              Lưu Thông Tin
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default InfoMe;
