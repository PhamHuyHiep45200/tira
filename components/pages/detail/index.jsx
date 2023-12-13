import React, { useContext, useEffect, useState } from "react";
import { getProductById } from "@/service/product";
import { useRouter } from "next/router";
import { formatMoney } from "@/utils/common.util";
import { Button, Col, Image, Row } from "antd";
import Slider from "react-slick";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addCart } from "@/service/cart";
import { CreateContext } from "@/context/ContextProviderGlobal";

function DetailProduct() {
  const { getMe } = useContext(CreateContext);
  const [detail, setDetail] = useState();
  const router = useRouter();
  const [images, setImages] = useState([]);
  const { id } = router.query;

  const addToCart = async () => {
    try {
      await addCart({
        product: detail.id,
        quantity: 1,
      });
      getMe();
    } catch (error) {
      console.log(error);
    }
  };
  const getDataproductById = async () => {
    try {
      const { product } = await getProductById(id);
      setDetail(product);
      setImages(JSON.parse(product.image));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) getDataproductById();
  }, [router]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "center",
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    dots: false,
    pauseOnHover: false,
  };
  return (
    <div className="flex justify-center">
      <div className="mb-[100px] mt-[50px] w-[1280px]">
        <div className="flex items-start">
          <Row gutter={20} className="w-full">
            <Col span={10}>
              <Slider {...settings}>
                {images.length &&
                  images.map((e, i) => {
                    return (
                      <div className="px-[30px]" key={e}>
                        <Image
                          className=" object-contain"
                          preview={false}
                          width={400}
                          height={400}
                          alt=""
                          src={e}
                        />
                      </div>
                    );
                  })}
              </Slider>
            </Col>
            <Col span={14} className="flex flex-col justify-between h-[400px]">
              <div>
                <div className="text-[25px] font-semibold truncate-2">
                  {detail?.name}
                </div>
                <br />
                <span className="text-[red] text-[18px] font-bold">
                  {formatMoney(detail?.price ?? 0)} đ
                </span>
                <br />
                <br />
                <span>
                  Thể Loại:{" "}
                  <span className="text-primary">{detail?.category?.name}</span>
                </span>
                <br />
                <br />
                <span>Số Lượng: {detail?.quantity ?? 0}</span>
                <br />
                <br />
                <span className="text-[red] font-semibold italic text-[12px]">
                  Note:
                </span>
                <div className="bg-[red] text-[red] bg-opacity-[0.2] p-4">
                  <span dangerouslySetInnerHTML={{ __html: detail?.note }} />
                </div>
              </div>
              <div className="flex space-x-4">
                <Button
                  size="large"
                  type="primary bg-primary hover:bg-primary flex items-center"
                  onClick={addToCart}
                >
                  Thêm Vào Giỏ Hàng <ShoppingCartOutlined />
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="bg-[#333] bg-opacity-5 mt-8">
          <div className="px-5 bg-[#333] bg-opacity-[0.7] text-white font-bold text-[20px] py-2">
            Chi Tiết Sản Phẩm
          </div>
          <div className="px-5 py-1 text-[#666]">
            <span dangerouslySetInnerHTML={{ __html: detail?.description }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
