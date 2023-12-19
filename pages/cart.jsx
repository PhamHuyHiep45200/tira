import QuantityProduct from "@/components/pages/cart/QuantityProduct";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { REPONSIVE_SCREEN } from "@/enum/reponsive";
import useWindowSize from "@/hooks/useResize";
import { getCart, updateCartById } from "@/service/cart";
import { formatMoney } from "@/utils/common.util";
import { Button, Image, Skeleton, Table } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Fragment } from "react";

function Cart() {
  const [widthScreen, height] = useWindowSize();
  const { getMe, startLoading, stopLoading } = useContext(CreateContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [carts, setCarts] = useState([]);
  const [cartsObj, setCartsObj] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const total = newSelectedRowKeys.reduce(
      (acc, newRow) =>
        acc + cartsObj[newRow].quantity * cartsObj[newRow].product.price,
      0
    );
    setTotalPrice(total);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns = useMemo(() => {
    const list = [
      {
        title: "Sản Phẩm",
        width: 300,
        render: (_, record) => (
          <div className="flex items-center space-x-2 md:space-x-4">
            <div>
              <Image
                src={JSON.parse(record?.product?.image ?? "")?.[0]}
                alt=""
                className="min-w-[60px] min-h-[40px] max-w-[60px] max-h-[40px] md:max-w-[150px] md:max-h-[150px] rounded-[6px]"
              />
            </div>
            <div className="max-w-[200px] truncate-2">
              {record?.product?.name}
            </div>
            {widthScreen > REPONSIVE_SCREEN.SM && (
              <div>
                <span className="block text-[12px] text-[#999] italic">
                  Thể Loại
                </span>
                <span>{record?.category?.name}</span>
              </div>
            )}
          </div>
        ),
      },
      {
        width: 100,
        title: "Đơn Giá",
        render: (_, record) => (
          <span>{formatMoney(record?.product?.price ?? 0)} đ</span>
        ),
      },
      {
        width: 100,
        title: "Số Lượng",
        align: "center",
        render: (_, record) => (
          <QuantityProduct
            value={record?.quantity}
            onChange={(qty) => updateCart(qty, record.id)}
          />
        ),
      },
      {
        width: 100,
        title: "Tổng Tiền",
        render: (_, record) => (
          <span className="text-[red] text-[12px] md:text-[14px] whitespace-nowrap font-semibold">
            {formatMoney((record?.product?.price ?? 0) * record.quantity)} đ
          </span>
        ),
      },
    ];
    if (widthScreen < REPONSIVE_SCREEN.MD) list.splice(1, 1);
    return list;
  }, [totalPrice, carts]);

  const paymentCart = () => {
    router.push({
      pathname: "/payment",
      query: {
        product: selectedRowKeys,
      },
    });
  };
  const getAllCart = async () => {
    startLoading();
    try {
      const { cart } = await getCart();
      setCarts(
        cart[0].cart_details.map((e) => ({
          ...e,
          key: e.id,
        }))
      );
      // orderby cart object with key id
      const obj = {};
      cart[0].cart_details.map((e) => {
        obj[e.id] = e;
      });
      setCartsObj(obj);
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  const updateCart = async (qty, id) => {
    try {
      await updateCartById(id, {
        quantity: qty,
      });
    } catch (error) {
      console.log(error);
    } finally {
      getAllCart();
      getMe();
    }
  };

  useEffect(() => {
    getAllCart();
  }, []);
  return (
    <div className="flex justify-center">
      <div className="mb-[100px] mt-[50px] w-[1280px] relative px-2 sm:px-0">
        <div className="flex items-center justify-center mb-5">
          <div className="flex items-center">
            <span className="text-[40px] font-semibold">Giỏ Hàng</span>
            <img src="/image/cart.gif" />
          </div>
        </div>
        <Button danger className="my-2 float-right">
          Xoá Sản Phẩm
        </Button>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={carts}
          pagination={false}
          scroll={{ x: 400 }}
        />
        <div className="sticky bottom-0 h-[140px] bg-white border-t-[2px] flex flex-col items-end justify-center">
          <span>
            Tổng Tiền:{" "}
            <span className="text-primary text-[20px] font-bold">
              {formatMoney(totalPrice)}đ
            </span>
          </span>
          <Button
            className="bg-primary text-white !px-[30px] mt-[10px] hover:!text-white"
            size="large"
            disabled={!selectedRowKeys.length}
            onClick={paymentCart}
          >
            Mua Hàng
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
