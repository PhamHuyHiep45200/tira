import {
  KIND_MANUAL,
  STATUS_ORDERED,
  StatusOrder,
  StatusTextOrder,
} from "@/enum/order-status";
import { checkPayment } from "@/service/payment";
import { formatMoney } from "@/utils/common.util";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Button, Card, Image, Modal, Table, Tag } from "antd";
import React, { useMemo, useState } from "react";

const exchangeRate = 0.000043;

function CardOrder({ data, id, status, totalPrice, refresh, paymentType }) {
  const [open, setOpen] = useState(false);
  const columns = [
    {
      title: "Sản Phẩm",
      dataIndex: "name",
      align: "center",
      render: (_, record) => (
        <div className="flex flex-col space-x-2">
          {
            <div className="flex items-center space-x-4">
              <Image
                className="max-w-[60px] min-h-[40px] sm:min-h-[80px] sm:min-w-[100px] min-w-[60px] max-h-[40px] sm:max-h-[80px] sm:max-w-[100px]"
                src={JSON.parse(record.product.image)[0]}
                alt=""
              />
              <span className="font-semibold truncate-2">
                {record.product.name}
              </span>
            </div>
          }
        </div>
      ),
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Giá",
      key: "price",
      align: "center",
      render: (_, record) => (
        <span className="font-semibold text-[red]">
          {formatMoney(record.price * record.quantity)}đ
        </span>
      ),
    },
  ];

  const checkPaypalPayment = async (id) => {
    try {
      await checkPayment({ bill_id: id });
      await refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card bodyStyle={{ padding: 0 }}>
        <div className="bg-[#00ffdd] bg-opacity-[0.4] py-5 px-8">
          <span className="mr-5 font-semibold text-[#666]">
            Trạng Thái Đơn Hàng
          </span>
          <Tag
            color={StatusOrder[status ?? STATUS_ORDERED]}
            className="font-bold"
          >
            {StatusTextOrder[status ?? STATUS_ORDERED]}
          </Tag>
        </div>
        <div className="flex !w-full">
          <Table
            pagination={false}
            className="w-full"
            dataSource={data}
            columns={columns}
          />
        </div>
        <div className="bg-[#f5f5f5] py-5 px-8 flex justify-between items-center">
          <div>
            Thanh Toán:{" "}
            <span className="font-bold text-promary">
              {paymentType === KIND_MANUAL
                ? "Khi Nhận Hàng"
                : "Thanh Toán OnLine"}
            </span>
          </div>
          <div>
            <span className="mr-2 font-semibold text-[#666]">Tổng Tiền:</span>
            <div className="text-[17px] text-[red] font-semibold">
              {formatMoney(totalPrice ?? 0)}đ
            </div>
            {status === STATUS_ORDERED && paymentType !== KIND_MANUAL && (
              <Button
                className="ml-5 bg-primary hover:bg-primary"
                type="primary"
                size="large"
                onClick={() => setOpen(true)}
              >
                Thanh Toán
              </Button>
            )}
          </div>
        </div>
      </Card>
      <Modal
        title="Thanh Toán"
        centered
        open={open}
        footer={false}
        onCancel={() => setOpen(false)}
      >
        <PayPalScriptProvider
          options={{
            "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          }}
        >
          <PayPalButtons
            createOrder={async (data, actions, err) => {
              try {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      description: id,
                      amount: {
                        currency_code: "USD",
                        value: (exchangeRate * totalPrice).toFixed(2),
                      },
                    },
                  ],
                });
              } catch (error) {
                return;
              }
            }}
            onApprove={async (data, actions) => {
              const order = await actions.order.capture();
              await checkPaypalPayment(order.id);
              setOpen(false);
            }}
            onError={(err) => {
              console.log(err);
              // setTransactionStatus("failure");
            }}
          />
        </PayPalScriptProvider>
      </Modal>
    </div>
  );
}
export default CardOrder;
