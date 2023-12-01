import { CreateContext } from "@/context/ContextProviderGlobal";
import { listHeader } from "@/data/header";
import {
  BellOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Drawer, Form, Input, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import ModalCheckLogin from "./ModalCheckLogin";
import { useRouter } from "next/router";
import Image from "next/image";

function Header() {
  const { user } = useContext(CreateContext);
  const router = useRouter();
  const [position, setPosition] = useState(0);
  const [open, setOpen] = useState(false);
  const [openCheckLogin, setOpenCheckLogin] = useState(false);
  const closeModal = () => {
    setOpenCheckLogin(false);
  };
  const showDrawer = () => {
    if (localStorage.getItem("userId")) {
      setOpen(true);
    } else {
      setOpenCheckLogin(true);
    }
  };

  const onClose = () => {
    setOpen(false);
  };
  const redirectLogin = ()=>{
    router.push('/login')
  }
  const redirect = (path) => {
    if (path === "/auth/login") {
      localStorage.clear();
    }
    router.push(path);
    onClose();
  };
  const handleSearch = () => {
    router.push("/search");
  };

  useEffect(() => {
    function updatePosition() {
      setPosition(window.pageYOffset);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[1000] bg-[white] flex justify-center py-[20px]"
      style={{
        boxShadow: '0 0 10px 5px #999'
      }}
    >
      <div className="w-[1280px] flex justify-between items-center">
        <div>
          <Image width={160} height={200} src="/image/logo.png" alt="logo" />
        </div>
        <Form>
          <Form.Item noStyle>
            <Input
              size="large"
              className="rounded-[20px] min-w-[400px] pl-[15px] pr-[20px]"
              placeholder="Tìm kiếm ..."
              suffix={<SearchOutlined className="text-[20px]" />}
            />
          </Form.Item>
        </Form>
        <div className="flex items-center space-x-8">
        
          <Badge count={2}>
            <BellOutlined className="text-[22px]" />
          </Badge>
          <Badge count={5}>
            <ShoppingCartOutlined className="text-[25px]" />
          </Badge>
          <div className="flex items-center cursor-pointer">
            <Tooltip
              className="space-x-1"
              title={
                <div className="text-[#333] px-5 py-2 cursor-pointer" onClick={redirectLogin}>
                  logout
                </div>
              }
              color="white"
            >
              <Avatar>A</Avatar>
              <span>Admin</span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
