import { CreateContext } from "@/context/ContextProviderGlobal";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  BellOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Drawer,
  Form,
  Input,
  Tooltip,
} from "antd";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import HeaderCategory from "./HeaderCategory";

function Header() {
  const { user, totalCart, resetStore } = useContext(CreateContext);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const router = useRouter();

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const closeCategory = () => {
    setOpenCategory(false);
  };

  const redirectRouter = (path) => {
    router.push(path ?? "/");
    onClose();
  };

  const searchProduct = () => {
    if (name) {
      router.push({
        pathname: "/search",
        query: {
          name,
        },
      });
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[1000] bg-[white] flex justify-center py-[20px] px-5 xl:px-0"
      style={{
        boxShadow: "0 0 10px 5px #999",
      }}
    >
      <HeaderCategory open={openCategory} closeMenu={closeCategory} />
      <div className="w-[1280px] flex justify-between items-center">
        <div className="flex items-center">
        <div className="hidden md:block">
          <Image
            className="cursor-poniter"
            width={160}
            height={200}
            src="/image/logo.png"
            alt="logo"
            onClick={() => redirectRouter("/")}
          />
        </div>
        <div className="items-center md:hidden">
          <MenuUnfoldOutlined className="text-[25px]" onClick={onOpen} />
        </div>
        <div className="flex items-center space-x-4 ml-5">
          <span
            className={`text-[17px] cursor-pointer mr-2 ${
              openCategory ? "text-primary" : ""
            }`}
            onClick={() => setOpenCategory(!openCategory)}
          >
            <AppstoreOutlined className="text-[28px]" />
          </span>
        </div>
        </div>
        <Form>
          <Form.Item noStyle name="name">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="large"
              className="rounded-[20px] max-w-[230px] min-w-[230px] sm:max-w-[500px] sm:min-w-[450px] pl-[15px] pr-[20px]"
              placeholder="Tìm kiếm ..."
              suffix={
                <SearchOutlined
                  className="text-[20px]"
                  onClick={searchProduct}
                />
              }
            />
          </Form.Item>
        </Form>
        <div className="flex items-center space-x-3 md:space-x-6">
          <Tooltip
            className="hidden md:block"
            title="Đăng Sản Phẩm"
            onClick={() => redirectRouter(user ? "/post" : "/login")}
          >
            <Image
              width={40}
              height={40}
              src="/image/post.png"
              alt=""
              className="cursor-pointer"
            />
          </Tooltip>
          <Badge count={2} className="hidden md:block">
            <BellOutlined className="text-[22px]" />
          </Badge>
          <Badge
            count={totalCart ?? 0}
            onClick={() => redirectRouter(user ? "/cart" : "/login")}
          >
            <ShoppingCartOutlined className="text-[25px]" />
          </Badge>
          {user ? (
            <div className="items-center cursor-pointer hidden md:flex">
              <Tooltip
                className="space-x-1"
                title={
                  <div>
                    <div
                      className="text-[#333] px-5 py-2 cursor-pointer"
                      onClick={() => {
                        redirectRouter("/info-me");
                      }}
                    >
                      Thông Tin Của Tôi
                    </div>
                    <div
                      className="text-[#333] px-5 py-2 cursor-pointer"
                      onClick={() => {
                        redirectRouter("/order-me");
                      }}
                    >
                      Đơn Hàng Của Tôi
                    </div>
                    <div
                      className="text-[#333] px-5 py-2 cursor-pointer"
                      onClick={() => {
                        redirectRouter("/order-me");
                      }}
                    >
                      Đơn Hàng Đã Đăng Bán
                    </div>
                    <div
                      className="text-[#333] px-5 py-2 cursor-pointer"
                      onClick={() => {
                        redirectRouter("/login");
                        resetStore();
                      }}
                    >
                      Đăng Xuất
                    </div>
                  </div>
                }
                color="white"
              >
                <Avatar src={user?.image}>{user?.name?.[0]}</Avatar>
                <span>{user.name}</span>
              </Tooltip>
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center hidden md:block">
                <Button onClick={() => redirectRouter("/login")}>
                  Đăng Nhập
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <Drawer
        title={
          <div className="flex items-center justify-end space-x-2">
            {user && <Avatar src={user?.image}>{user?.name?.[0]}</Avatar>}
            <span>{user?.name}</span>
          </div>
        }
        placement={"left"}
        width={"80%"}
        onClose={onClose}
        open={open}
      >
        <div className="flex justify-center mb-5">
          <Image
            className="cursor-poniter"
            width={160}
            height={200}
            src="/image/logo.png"
            alt="logo"
            onClick={() => redirectRouter("/")}
          />
        </div>
        {user ? (
          <>
            <div
              className="text-[#333] px-5 py-2 cursor-pointer font-semibold"
              onClick={() => {
                redirectRouter("/info-me");
              }}
            >
              Thông Tin Của Tôi
            </div>
            <Divider className="!my-0" />
            <div
              className="text-[#333] px-5 py-2 cursor-pointer font-semibold"
              onClick={() => {
                redirectRouter("/post");
              }}
            >
              Đăng Bán Sản Phẩm
            </div>
            <Divider className="!my-0" />
            <div
              className="text-[#333] px-5 py-2 cursor-pointer font-semibold"
              onClick={() => {
                redirectRouter("/order-me");
              }}
            >
              Đơn Hàng Của Tôi
            </div>
            <Divider className="!my-0" />
            <div
              className="text-[#333] px-5 py-2 cursor-pointer font-semibold"
              onClick={() => {
                redirectRouter("/order-me");
              }}
            >
              Đơn Hàng Đã Đăng Bán
            </div>
            <Divider className="!my-0" />
            <div
              className="text-[#333] px-5 py-2 cursor-pointer font-semibold"
              onClick={() => {
                redirectRouter("/login");
                resetStore();
              }}
            >
              Đăng Xuất
            </div>
          </>
        ) : (
          <div className="flex justify-center mt-5">
            <Button onClick={() => redirectRouter("/login")}>Đăng Nhập</Button>
          </div>
        )}
      </Drawer>
    </div>
  );
}

export default Header;
