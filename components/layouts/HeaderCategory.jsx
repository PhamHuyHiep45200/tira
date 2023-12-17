import { getAllCategory } from "@/service/category";
import { getImage } from "@/utils/image.util";
import { Col, Image, Row } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function HeaderCategory({ open, closeMenu }) {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState("");
  const searchCategory = (id) => {
    closeMenu();
    router.push({
      pathname: "/search",
      query: {
        category: [id],
      },
    });
  };
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
      <Row gutter={[30, 0]}>
        <Col span={0} xl={6}>
          <Image
            className="!w-[300px] !h-[300px] border"
            src={image ?? ""}
            alt="Ảnh Thể Loại"
          />
        </Col>
        <Col span={24} xl={18}>
          <Row className="!w-full" gutter={[20, 20]}>
            {!!category.length &&
              category.map((e) => {
                return (
                  <Col
                    span={12}
                    sm={8}
                    md={8}
                    lg={6}
                    xl={6}
                    key={e.id}
                    className=" hover:text-primary flex items-center space-x-2 hover:font-semibold text-[18px] cursor-pointer"
                    onMouseEnter={() => setImage(getImage(e.image))}
                    onMouseLeave={() => setImage("")}
                    onClick={() => searchCategory(e.id)}
                  >
                    <Image
                      className="xl:hidden"
                      preview={false}
                      src={getImage(e.image)}
                      width={30}
                      height={20}
                      alt=""
                    />
                    <span>{e.name}</span>
                  </Col>
                );
              })}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default HeaderCategory;
