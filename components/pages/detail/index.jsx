import React, { useContext, useEffect, useState } from "react";
import { getProductById } from "@/service/product";
import { useRouter } from "next/router";
import { formatMoney } from "@/utils/common.util";
import { Button, Col, Image, Row } from "antd";
import Slider from "react-slick";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addCart } from "@/service/cart";
import { CreateContext } from "@/context/ContextProviderGlobal";
import useWindowSize from "@/hooks/useResize";
import { REPONSIVE_SCREEN } from "@/enum/reponsive";

function DetailProduct() {
  const [width, height] = useWindowSize();
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
      setImages([product.image_master,...JSON.parse(product.image)]);
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
      <div className="mb-[100px] mt-[10px] lg:mt-[50px] w-full xl:w-[1280px]">
        <div className="flex items-start justify-center">
          <Row gutter={width < REPONSIVE_SCREEN.MD ? 0 : 20} className="w-full">
            <Col span={24} lg={10}>
              <Slider {...settings}>
                {images.length &&
                  images.map((e, i) => {
                    return (
                      <div className="lg:px-[30px]" key={e}>
                        <Image
                          height={350}
                          width={'100%'}
                          className=" object-cover h-[250px] w-full"
                          alt=""
                          src={e}
                        />
                      </div>
                    );
                  })}
              </Slider>
            </Col>
            <Col span={24} lg={14} className="flex flex-col justify-between h-auto xl:h-[400px]">
              <div className="px-2 sm:px-0">
                <div className="text-[20px] xl:text-[25px] font-semibold truncate-2">
                  {detail?.name}
                </div>
                <br className="hidden sm:block" />
                <span className="text-[red] underline text-[16px] xl:text-[18px] font-bold">
                  {formatMoney(detail?.price ?? 0)}đ
                </span>
                <br className="hidden sm:block"  />
                <span className="block mt-2">
                  Thể Loại:{" "}
                  <span className="text-primary">{detail?.category?.name}</span>
                </span>
                <br className="hidden sm:block"  />
                <span className="block mt-2">Số Lượng: {detail?.quantity ?? 0}</span>
                <br className="hidden sm:block"  />
                <br className="hidden sm:block"  />
                <span className="text-[red] font-semibold italic text-[12px]">
                  Note:
                </span>
                <div className="bg-[red] text-[red] bg-opacity-[0.2] p-4">
                  <span dangerouslySetInnerHTML={{ __html: detail?.note }} />
                </div>
              </div>
              <div className="flex space-x-4 justify-center md:justify-start mt-5 md:mt-0">
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
          <div className="px-5 py-1 text-[#666] break-all">
            <span dangerouslySetInnerHTML={{ __html: detail?.description }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
