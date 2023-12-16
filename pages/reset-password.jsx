import LayoutLogin from "@/components/layouts/LayoutLogin";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { createUser, resetPassWord } from "@/service/user";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

function Register() {
  const { errorNoti, successNoti } = useContext(CreateContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const redirectLogin = () => {
    router.push("/login");
  };
  const resetPass = async (e) => {
    setLoading(true);
    const { password, token } = e;
    try {
      await resetPassWord({
        email: router.query.email,
        password,
        token
      });
      successNoti("Reset password thành công");
      redirectLogin();
    } catch (error) {
      errorNoti("vui lòng kiểm tra lại thông tin!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="my-5 font-[500] text-center text-[30px]">
        Reset Mật Khẩu
      </div>
      <Form onFinish={resetPass}>
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
        <Form.Item
          name="token"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống!",
            },
          ]}
        >
          <Input size="large" placeholder="Mã nhận từ Email" />
        </Form.Item>
        <Button
          className="w-full !bg-primary !text-[white] !my-3"
          size="large"
          htmlType="submit"
          loading={loading}
        >
          Reset Mật Khẩu
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
