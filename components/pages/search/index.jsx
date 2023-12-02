import CardBase from "@/components/common/CardBase";
import { getAllCategory } from "@/service/category";
import { getAllProduct } from "@/service/product";
import { FileSearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Image,
  Rate,
  Row,
  Slider,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

function Search() {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    limit: 4,
  });
  const redirectDetail = () => {
    router.push("/detail/896524952");
  };

  const onChangeCategory = (e)=>{
    console.log(e);
  }

  const items = useMemo(() => {
    return [
      {
        key: "1",
        label: <span className="font-semibold">Lọc Theo Giá</span>,
        children: <Slider range defaultValue={[20, 50]} />,
      },
      {
        key: "2",
        label: <span className="font-semibold">Lọc Theo Thể Loại</span>,
        children: (
          <Checkbox.Group
            options={category}
            onChange={onChangeCategory}
          />
        ),
      },
    ];
  }, [category]);

  const getAllProductData = async () => {
    // setLoadingProduct(true);
    console.log(router.query);
    try {
      const { products } = await getAllProduct({
        status: 1,
        page: pagination.page,
        limit: pagination.limit,
        ...router.query
      });
      setProduct(products.data);
      setPagination({
        ...pagination,
        total: products.total
      })
    } catch (error) {
      console.log(error);
    } finally {
      // setLoadingProduct(false);
    }
  };
  const getAllDataCategory = async () => {
    try {
      const { categories } = await getAllCategory();
      setCategory(
        categories.data.map((e) => ({
          value: e.id,
          label: e.name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getAllProductData()
  },[router.query])

  useEffect(() => {
    getAllDataCategory();
  }, []);
  return (
    <div className="flex justify-center">
      <div className="mb-[100px] mt-[50px] w-[1280px] relative">
        <Row gutter={[0, 40]}>
          <Col span={6}>
            <div className="w-[80%] bg-[#f5f5f5] pb-5">
              <Collapse
                items={items}
                defaultActiveKey={["1"]}
                bordered={false}
                className="bg-[#f5f5f5]"
              />
              <div className="flex px-5 justify-center">
                <Button
                  type="primary"
                  size="large"
                  className="text-white hover:!text-white bg-primary w-full"
                >
                  Filter
                </Button>
              </div>
            </div>
          </Col>
          <Col span={18}>
            <Row gutter={[20, 30]}>
              {product.length && product.map((e) => {
                return (
                  <Col span={8} key={e}>
                    <CardBase hoverAction infoProduct={e} height={"400px"} />
                  </Col>
                );
              })}
            </Row>
            <div className="text-center mt-5">
              <Button size="large">Xem Thêm</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Search;
