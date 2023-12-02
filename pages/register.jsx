import LayoutLogin from "@/components/layouts/LayoutLogin";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { createUser } from "@/service/user";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

function Register() {
  const { errorNoti, successNoti } = useContext(CreateContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const redirectLogin = () => {
    router.push("/login");
  };
  const createAccount = async (e) => {
    setLoading(true)
    const { confirm, ...datas } = e;
    try {
      await createUser(datas);
      successNoti('Đăng ký thành công')
      redirectLogin()
    } catch (error) {
      errorNoti('vui lòng kiểm tra lại thông tin!');
    } finally {
      setLoading(false)
    }
  };
  return (
    <div>
      <div className="my-5 font-[500] text-center text-[30px]">Register</div>
      <Form onFinish={createAccount}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" placeholder="Tên" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Không được bỏ trống!" },
            { type: "email", message: "Bắt buộc email" },
          ]}
        >
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống!",
            },
          ]}
          hasFeedback
        >
          <Input.Password size="large" placeholder="Mật khẩu" />
        </Form.Item>

        <Form.Item
          name="password_confirmation"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Nhập lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Nhập lại mật khẩu" />
        </Form.Item>
        <Button
          className="w-full !bg-primary !text-[white] !my-3"
          size="large"
          htmlType="submit"
          loading={loading}
        >
          Đăng kí
        </Button>
        <span
          className="block text-right underline cursor-pointer underline-offset-1 text-primary font-medium"
          onClick={redirectLogin}
        >
          Đăng nhập
        </span>
      </Form>
    </div>
  );
}

export default Register;

Register.getLayout = function getLayout(page) {
  return <LayoutLogin>{page}</LayoutLogin>;
};
