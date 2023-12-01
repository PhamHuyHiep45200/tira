import LayoutLogin from "@/components/layouts/LayoutLogin";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { loginUser } from "@/service/user";
import { GooglePlusOutlined, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import React, { useContext } from "react";

function Login() {
  const { errorNoti } = useContext(CreateContext);
  const router = useRouter();
  const redirectRegister = (path) => {
    router.push("/register");
  };
  const submit = async (e) => {
    router.push("/");
    // try {
    //   const response = await loginUser(e);
    //   if (response.data && response.data.status === 200) {
    //     if (localStorage.getItem("userId")) {
    //       localStorage.removeItem("userId");
    //     }
    //     await localStorage.setItem("userId", response.data.data.id);
    //     router.push("/");
    //   } else {
    //     errorNoti(response.data.message);
    //   }
    // } catch (error) {
    //   errorNoti(error);
    // }
  };
  return (
    <div>
      <div className="my-5 font-[500] text-center text-[30px]">Login</div>
      <Form onFinish={submit}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Không được bỏ trống!" },
            { type: "email", message: "Bắt buộc email" },
          ]}
        >
          <Input size="large" placeholder="Email" className="round-[15px]" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input.Password size="large" placeholder="Mật khẩu" />
        </Form.Item>
        <Button
          className="w-full !bg-primary !my-2 !font-medium !text-[white] !rounded-[20px]"
          size="large"
          htmlType="submit"
        >
          Đăng Nhập
        </Button>
        <span
          className="block text-right text-primary underline underline-offset-1 cursor-pointer font-medium"
          onClick={redirectRegister}
        >
          Đăng kí tài khoản
        </span>
      </Form>
    </div>
  );
}

export default Login;

Login.getLayout = function getLayout(page) {
  return <LayoutLogin>{page}</LayoutLogin>;
};
