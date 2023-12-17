import { CreateContext } from "@/context/ContextProviderGlobal";
import { REPONSIVE_SCREEN } from "@/enum/reponsive";
import useWindowSize from "@/hooks/useResize";
import { addCart } from "@/service/cart";
import { formatMoney } from "@/utils/common.util";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";

function CardBase({ hoverAction, width, height, infoProduct }) {
  const { getMe, user, errorNoti } = useContext(CreateContext);
  const [widthScreen, heightScreen] = useWindowSize();
  const router = useRouter();
  const addToCart = async () => {
    if (user) {
      try {
        await addCart({
          product: infoProduct.id,
          quantity: 1,
        });
        getMe();
      } catch (error) {
        errorNoti(error.message ?? "");
      }
    } else {
      router.push("/login");
    }
  };
  const detailProduct = () => {
    router.push(`/detail/${infoProduct.id}`);
  };

  const heightCard = useMemo(() => {
    if (widthScreen < REPONSIVE_SCREEN.MD) return "240px";
    if (height) return height;
    return "380px";
  }, [widthScreen, height]);
  return (
    <Card
      title={false}
      bodyStyle={{
        padding: 0,
        width: width ? width : "100%",
        height: heightCard,
        borderRadius: "5px",
        overflow: "hidden",
        cursor: "pointer",
      }}
      bordered={false}
      className={hoverAction ? "container-card" : ""}
      style={{ boxShadow: "0 0 5px 3px #eaeaea" }}
    >
      <div className="w-full h-[150px] md:h-[200px] xl:h-[260px] overflow-hidden">
        <img
          src={
            infoProduct && infoProduct?.image
              ? infoProduct?.image_master
              : ""
          }
          alt=""
          onClick={detailProduct}
          className={`w-full h-full ${hoverAction ? "image-card" : ""}`}
        />
      </div>
      <div className="px-5">
        <div
          className="text-[16px] lg:text-[20px] font-semibold h-[40px] lg:h-[50px] leading-[1.3] truncate-2 mt-2"
          onClick={detailProduct}
        >
          {infoProduct?.name ?? ""}
        </div>
        <div className="flex justify-between items-end mt-0 md:mt-[5px]">
          {/* <span className="text-[#999]">Số lượng: <span className="text-[#ff7b0f]">18</span></span> */}
          <span className="text-[red] text-[14px] lg:text-[22px] font-bold" onClick={detailProduct}>
            {formatMoney(infoProduct?.price ?? 0)} đ
          </span>
          <Button
            size={widthScreen < REPONSIVE_SCREEN.MD ? "small" : ""}
            className="flex items-center space-x-1"
            onClick={addToCart}
          >
            + <ShoppingCartOutlined />
          </Button>
        </div>
        {/* <div className="flex">
          <span className="underline text-primary" onClick={detailProduct}>
            Xem Chi Tiết
          </span>
        </div> */}
      </div>
    </Card>
  );
}

export default CardBase;
