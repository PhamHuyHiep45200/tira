import CardBase from "@/components/common/CardBase";
import { REPONSIVE_SCREEN } from "@/enum/reponsive";
import useWindowSize from "@/hooks/useResize";
import { getAllCategory } from "@/service/category";
import { getAllProduct } from "@/service/product";
import { FileSearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Drawer,
  Form,
  Image,
  Rate,
  Row,
  Slider,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import Slide from "./Slide";
import Category from "./Category";

function Search() {
  const [width, height] = useWindowSize();
  const router = useRouter();
  const [form] = Form.useForm();
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    limit: 2,
  });
  const [priceSlider, setPriceSlider] = useState({
    min: 0,
    max: 100,
  });

  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const items = useMemo(() => {
    let itemsTable = [
      {
        key: "1",
        label: <span className="font-semibold">Lọc Theo Giá</span>,
        children: <Slide priceSlider={priceSlider} />,
      },
      {
        key: "2",
        label: <span className="font-semibold">Lọc Theo Thể Loại</span>,
        children: <Category category={category} />,
      },
    ];
    if (width < REPONSIVE_SCREEN.MD) itemsTable = [];
    return itemsTable;
  }, [category, form]);

  const getAllProductData = async () => {
    // setLoadingProduct(true);
    try {
      const { products, max_price, min_price } = await getAllProduct({
        status: 1,
        page: pagination.page,
        limit: pagination.limit,
        ...router.query,
      });
      setProduct([...product, ...products.data]);
      setPriceSlider({
        ...priceSlider,
        min: min_price,
        max: max_price,
      });
      form.setFieldsValue({
        filter: {
          price: [min_price, max_price],
        },
      });
      setPagination({
        ...pagination,
        total: products.total,
      });
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
          label: <span className="text-[16px] text-[#666]">{e.name}</span>,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filter = (value) => {
    onClose();
    const queryData = {
      category: value?.filter?.category,
      price_min: value?.filter?.price?.[0],
      price_max: value?.filter?.price?.[1],
    };
    Object.entries(queryData).map((item) => {
      if (!item[1]) {
        delete queryData[item[0]];
      }
    });
    router.push({
      query: {
        ...router.query,
        ...queryData,
      },
    });
  };

  useEffect(() => {
    if (router.query && Object.values(router.query).length) {
      getAllProductData();
    }
  }, [router.query, pagination.page]);

  useEffect(() => {
    getAllDataCategory();
  }, []);
  return (
    <div className="flex justify-center">
      <div className="mb-[100px] mt-5 md:mt-[50px] w-[1280px] relative">
        <div
          className="md:hidden flex items-center space-x-1 px-2 mb-2 cursor-pointer"
          onClick={onOpen}
        >
          <Image
            preview={false}
            src="/image/filter.png"
            width={20}
            height={20}
            alt=""
          />
          <span className="text-[12px] font-semibold">Bộ lọc</span>
        </div>
        <Row gutter={[0, 40]}>
          <Col span={0} lg={6} className="hidden md:block">
            <Form onFinish={filter} form={form}>
              <div className="w-[80%] bg-[#f5f5f5] pb-5">
                <Collapse
                  items={items}
                  activeKey={["1", "2"]}
                  bordered={false}
                  className="bg-[#f5f5f5]"
                />
                <div className="flex px-5 justify-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="text-white hover:!text-white bg-primary w-full"
                  >
                    Tìm kiếm
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
          <Col span={24} lg={18}>
            <Row
              gutter={[
                width < REPONSIVE_SCREEN.MD ? 10 : 20,
                width < REPONSIVE_SCREEN.MD ? 5 : 30,
              ]}
              className="px-2 lg:px-0"
            >
              {product.length &&
                product.map((e) => {
                  return (
                    <Col span={width < REPONSIVE_SCREEN.MD ? 12 : 8} key={e}>
                      <CardBase hoverAction infoProduct={e} height={"400px"} />
                    </Col>
                  );
                })}
            </Row>
            {pagination.total > product.length && (
              <div className="text-center mt-5">
                <Button
                  onClick={() =>
                    setPagination({ ...pagination, page: pagination.page + 1 })
                  }
                  size="large"
                >
                  Xem Thêm
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </div>
      {width < REPONSIVE_SCREEN.MD && (
        <Drawer
          title="Tìm kiếm bằng bộ lọc"
          placement={"bottom"}
          onClose={onClose}
          open={open}
        >
          <Form onFinish={filter} form={form}>
            <div>
              <span>Theo Giá</span>
              <Slide priceSlider={priceSlider} />
            </div>
            <div>
              <span>Theo Thể Loại</span>
              <Category category={category} />
            </div>
            <div className="flex px-5 justify-center">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="text-white hover:!text-white bg-primary w-full"
              >
                Tìm kiếm
              </Button>
            </div>
          </Form>
        </Drawer>
      )}
    </div>
  );
}

export default Search;
