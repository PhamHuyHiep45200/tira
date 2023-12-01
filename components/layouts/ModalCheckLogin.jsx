import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import React from "react";

function ModalCheckLogin({ open, closeModal }) {
  const router = useRouter();
  const redirectLogin = () => {
    router.push("/login");
    closeModal()
  };
  return (
    <Modal open={open} title={false} footer={false}  centered onCancel={closeModal}>
      <div className="text-[#333] text-[16px] font-medium mt-[30px] mb-5">
        Bạn chưa đăng nhập, hãy đăng nhập rồi quay lại đây!
      </div>
      <div className="flex items-center space-x-[10px]">
        <Button size="large" className="w-full" onClick={closeModal}>
          Huỷ
        </Button>
        <Button
          className="w-full !bg-primary !text-[white]"
          size="large"
          onClick={redirectLogin}
        >
          Đăng nhập
        </Button>
      </div>
    </Modal>
  );
}

export default ModalCheckLogin;