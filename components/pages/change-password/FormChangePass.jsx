import { CreateContext } from "@/context/ContextProviderGlobal";
import { changePasswordUser } from "@/service/user";
import { Button, Form, Input } from "antd";
import React, { useContext } from "react";

function FormChangePass() {
  const {errorNoti, successNoti} =useContext(CreateContext)
  const [form]=Form.useForm()
  const handleChangePass= async (e)=>{
    const response = await changePasswordUser(localStorage.getItem('userId'),{
      passWord: e.passwordOld,
      newPassWord: e.password
    })
    if(response.data && response.data.status===200){
      form.resetFields()
      successNoti('request thành công')
    }else{
      errorNoti('đã có lỗi xảy ra')
    }
  }
  return (
    <Form onFinish={handleChangePass} form={form}>
      <Form.Item
        label="Nhập lại mật khẩu cũ"
        name="passwordOld"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống!",
          },
        ]}
      >
        <Input.Password size="large" placeholder="Mật khẩu" />
      </Form.Item>
      <Form.Item
        label="Mật khẩu mới"
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
        label="Nhập lại mật khẩu mới"
        name="confirmPassword"
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
        <Input.Password size="large" placeholder="tên" />
      </Form.Item>
      <Button className="mt-5 bg-primary w-full" type='primary' size='large' htmlType="submit">Thay đổi mật khẩu</Button>
    </Form>
  );
}

export default FormChangePass;