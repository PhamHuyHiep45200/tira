import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Category from "./Category";
import { Button, Col, Image, Row } from "antd";
import ProductNew from "./Product/ProductNew";
import CardBase from "@/components/common/CardBase";
import { getAllCategory } from "@/service/category";
import { getAllProduct, getProductTopOrder } from "@/service/product";
import useWindowSize from "@/hooks/useResize";
import { REPONSIVE_SCREEN } from "@/enum/reponsive";

const listImage = [
  "https://scontent.xx.fbcdn.net/v/t1.15752-9/398324449_196004303567818_172238991446465391_n.png?stp=dst-png_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=510075&_nc_ohc=ybPY66rNQ9wAX9d9nDj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSe3x9yIZ7tDPBGyVBentWKHX2Qerxsw_jTKpjASTB0IQ&oe=65917D14",
  "https://scontent.xx.fbcdn.net/v/t1.15752-9/398324449_196004303567818_172238991446465391_n.png?stp=dst-png_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=510075&_nc_ohc=ybPY66rNQ9wAX9d9nDj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSe3x9yIZ7tDPBGyVBentWKHX2Qerxsw_jTKpjASTB0IQ&oe=65917D14",
  "https://scontent.xx.fbcdn.net/v/t1.15752-9/398324449_196004303567818_172238991446465391_n.png?stp=dst-png_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=510075&_nc_ohc=ybPY66rNQ9wAX9d9nDj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSe3x9yIZ7tDPBGyVBentWKHX2Qerxsw_jTKpjASTB0IQ&oe=65917D14",
  "https://scontent.xx.fbcdn.net/v/t1.15752-9/398324449_196004303567818_172238991446465391_n.png?stp=dst-png_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=510075&_nc_ohc=ybPY66rNQ9wAX9d9nDj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSe3x9yIZ7tDPBGyVBentWKHX2Qerxsw_jTKpjASTB0IQ&oe=65917D14",
];

function HomePages() {
  const [width, height] = useWindowSize();
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [productTop, setProductTop] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    limit: 4,
  });

  const getProductTop = async () => {
    try {
      const response = await getProductTopOrder();
      setProductTop(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDataCategory = async () => {
    try {
      const { categories } = await getAllCategory();
      setCategory(categories.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllProductData = async () => {
    setLoadingProduct(true);
    try {
      const { products } = await getAllProduct({
        status: 1,
        page: pagination.page,
        limit: pagination.limit,
      });
      setPagination({
        ...pagination,
        total: products.total
      })
      setProduct([
        ...product,
        ...products.data
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProduct(false);
    }
  };
  const getAllData = async () => {
    try {
      await Promise.all([getAllDataCategory(), getProductTop()]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    getAllProductData();
  }, [pagination.page]);
  return (
    <div>
      <Banner />
      <div className="w-full xl:w-[1280px] m-[auto] px-2 md:px-5 py-10">
        <div className="my-[30px]">
          <div className="text-[20px] xl:text-[25px] underline mb-2 font-bold">
            Sản Phẩm Nổi Bật
          </div>
          <ProductNew data={productTop} />
        </div>
        {/* {!!category.length && (
          <div className="mt-[150px]">
            <Category data={category} />
          </div>
        )} */}

        <div className="my-[50px]">
        <div className="text-[20px] xl:text-[25px] underline mb-2 font-bold">
            Thể Loại Nổi Bật
          </div>
          <Row gutter={[30, 30]}>
            {listImage.map((e) => {
              return (
                <Col span={12} key={e} className="cursor-pointer">
                  <img alt="" src={e} className="w-full h-full object-cover" />
                </Col>
              );
            })}
          </Row>
        </div>
        <div className="mt-[50px]">
          <div className="text-[20px] xl:text-[25px] underline mb-2 font-bold">
            Sản Phẩm Khác
          </div>
          <Row
            gutter={[
              width < REPONSIVE_SCREEN.MD ? 10 : 20,
              width < REPONSIVE_SCREEN.MD ? 5 : 30,
            ]}
          >
            {product.map((e) => {
              return (
                <Col span={12} sm={12} md={8} lg={6} xl={6} key={e}>
                  <CardBase hoverAction infoProduct={e} />
                </Col>
              );
            })}
          </Row>
          {pagination.total > product.length && (
            <div className="text-center mt-5">
              <Button
                size="large"
                onClick={() =>
                  setPagination({ ...pagination, page: pagination.page + 1 })
                }
              >
                Xem Thêm
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePages;
