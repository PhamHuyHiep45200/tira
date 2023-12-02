import QuantityProduct from "@/components/pages/cart/QuantityProduct";
import { formatMoney } from "@/utils/common.util";
import { Button, Image, Skeleton, Table } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Fragment } from "react";

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    name: `Quần Áo Công Sở`,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrOYhlH3bZMJ_gtzF0jfgxAfee3jywUxBeGg&usqp=CAU",
    quantity: 2,
    price: 500000,
    category: {
      name: "Quần Áo",
    },
  });
}
function Cart() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState([]);
  const router = useRouter()

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
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
              src={record?.image}
              alt=""
              className="max-w-[150px] max-h-[150px] rounded-[6px]"
            />
            <div className="max-w-[200px]">
              {record?.name} fsdn fdsfklkds fdskljfdskfs fsdkl
            </div>
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
        render: (_, record) => <span>{formatMoney(record.price)} đ</span>,
      },
      {
        title: "Số Lượng",
        align: "center",
        render: (_, record) => <QuantityProduct value={record.quantity} />,
      },
      {
        title: "Tổng Tiền",
        render: (_, record) => (
          <span className="text-[red] font-semibold">
            {formatMoney(record.price * record.quantity)} đ
          </span>
        ),
      },
    ];
  }, []);

  const paymentCart = ()=>{
    router.push('/payment')
  }
  const getAllCart = async () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setCarts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };
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
              dataSource={data}
              pagination={false}
            />
          </Fragment>
        )}
        <div className="sticky bottom-0 h-[140px] bg-white border-t-[2px] flex flex-col items-end justify-center">
          <span>
            Tổng Tiền:{" "}
            <span className="text-primary text-[20px] font-bold">
              {formatMoney(10000000)}đ
            </span>
          </span>
          <Button
            className="bg-primary text-white !px-[30px] mt-[10px] hover:!text-white"
            size="large"
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
