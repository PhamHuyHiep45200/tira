import { getAllCategory } from "@/service/category";
import { getImage } from "@/utils/image.util";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Col, Image, Row, Tabs } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Category from "./tabsHeader/Category";
import Collection from "./tabsHeader/collection";

function HeaderCategory({ open, closeMenu }) {
  const [category, setCategory] = useState([]);
  const router = useRouter()

  const items = [
    {
      key: "1",
      label: "Trang Chủ",
      children: "",
    },
    {
      key: "2",
      label: "Thể Loại",
      children: <Category category={category} closeMenu={closeMenu} />,
    },
    {
      key: "3",
      label: "Bộ Sưu Tập",
      children: <Collection closeMenu={closeMenu}/>,
    },
  ];
  const changeTab = (e) => {
    if(e === '1') {
      router.push('/')
      closeMenu()
    }
  }
  const getAllDataCategory = async () => {
    try {
      const { categories } = await getAllCategory();
      setCategory(categories.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllDataCategory();
  }, []);
  return (
    <div
      className="w-full absolute top-[100%] left-0 right-0 bg-[white] border-t-[1px] border-b-[1px] overflow-hidden px-10"
      style={{
        transition: "all 0.4s ease",
        height: `${open ? "auto" : "0px"}`,
        padding: `${open ? "40px" : "0px"}`,
      }}
    >
      <Tabs defaultActiveKey="2" items={items} onChange={changeTab} />
    </div>
  );
}

export default HeaderCategory;
