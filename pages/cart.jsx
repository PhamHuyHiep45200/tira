import QuantityProduct from "@/components/pages/cart/QuantityProduct";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { getCart, updateCartById } from "@/service/cart";
import { formatMoney } from "@/utils/common.util";
import { Button, Image, Skeleton, Table } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Fragment } from "react";

function Cart() {
  const { getMe } = useContext(CreateContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState([]);
  const [cartsObj, setCartsObj] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

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
    return [
      {
        title: "Sản Phẩm",
        render: (_, record) => (
          <div className="flex items-center space-x-4">
            <Image
              src={JSON.parse(record?.product?.image ?? "")?.[0]}
              alt=""
              className="max-w-[150px] max-h-[150px] rounded-[6px]"
            />
            <div className="max-w-[200px]">{record?.product?.name}</div>
            <div>
              <span className="block text-[12px] text-[#999] italic">
                Thể Loại
              </span>
              <span>{record?.category?.name}</span>
            </div>
          </div>
        ),
      },
      {
        title: "Đơn Giá",
        render: (_, record) => (
          <span>{formatMoney(record?.product?.price ?? 0)} đ</span>
        ),
      },
      {
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
        title: "Tổng Tiền",
        render: (_, record) => (
          <span className="text-[red] font-semibold">
            {formatMoney(record?.product?.price ?? 0 * record.quantity)} đ
          </span>
        ),
      },
    ];
  }, [totalPrice, carts]);

  const paymentCart = () => {
    
    router.push({
      pathname: "/payment",
      query: {
        product: selectedRowKeys
      }
    });
  };
  const getAllCart = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const updateCart = async (qty, id)=>{
    try {
      await updateCartById(id, {
        quantity: qty
      })
    } catch (error) {
      console.log(error);
    } finally {
      getAllCart()
      getMe()
    }
  }

  useEffect(() => {
    getAllCart();
  }, []);
  return (
    <div className="flex justify-center">
      <div className="mb-[100px] mt-[50px] w-[1280px] relative">
        <div className="flex items-center justify-center mb-5">
          <div className="flex items-center">
            <span className="text-[40px] font-semibold">Giỏ Hàng</span>
            <img src="/image/cart.gif" />
          </div>
        </div>
        {loading ? (
          <Fragment>
            <Skeleton active />
            <Skeleton active className="mt-5" />
          </Fragment>
        ) : (
          <Fragment>
            <Button danger className="my-2 float-right">
              Xoá Sản Phẩm
            </Button>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={carts}
              pagination={false}
            />
          </Fragment>
        )}
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
