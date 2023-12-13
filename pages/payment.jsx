import DesctiptionBase from "@/components/pages/post/Desctiption";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { getCart } from "@/service/cart";
import { checkPayment, createPayment } from "@/service/payment";
import { formatMoney } from "@/utils/common.util";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Button, Form, Image, InputNumber, Radio, Table, Tag } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";

const exchangeRate = 0.000043;
function Payment() {
  const { getMe } = useContext(CreateContext);
  const [paymentType, setPaymentType] = useState(2);
  const [loading, setLoading] = useState(false);
  const selectPaymentType = (e) => {
    setPaymentType(e.target.value);
  };
  const router = useRouter();
  const { product } = router.query;
  const [products, setProducts] = useState([]);
  const [required, setRequired] = useState(true);

  const onValuesChange = (e, a) => {
    if (Object.values(a).every((e) => e)) {
      setRequired(false);
    } else {
      setRequired(true);
    }
  };

  const getAllCart = async () => {
    setLoading(true);
    try {
      const { cart } = await getCart();
      const productPayment = [];
      cart[0].cart_details.forEach((e) => {
        if (product.includes(String(e.id))) {
          productPayment.push(e);
        }
      });
      setProducts(
        productPayment.map((e) => ({
          ...e,
          key: e.id,
        }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(() => {
    return [
      {
        title: "Sản Phẩm",
        dataIndex: "name",
        key: "name",
        align: "center",
        render: (_, record) => (
          <div className="flex items-center space-x-4">
            <Image
              width={80}
              height={60}
              src={JSON.parse(record?.product?.image)?.[0] ?? ""}
              alt=""
            />
            <span>{record?.product?.name}</span>
          </div>
        ),
      },
      {
        title: "Số Lượng",
        dataIndex: "age",
        align: "center",
        render: (_, record) => (
          <span className="font-semibold">{record?.quantity}</span>
        ),
      },
      {
        title: "Giá",
        dataIndex: "address",
        align: "center",
        render: (_, record) => (
          <span className="font-semibold">
            {formatMoney(record?.product?.price ?? 0)} đ
          </span>
        ),
      },
    ];
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((a, b) => {
      return a + b?.product?.price * b?.quantity;
    }, 0);
  }, [products]);

  const checkPaypalPayment = async (id) => {
    try {
      await checkPayment({ bill_id: id });
      await refresh();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (product) getAllCart();
  }, [router]);
  console.log((exchangeRate * totalPrice).toFixed(2));
  return (
    <div className="flex justify-center">
      <div className="mb-[200px] mt-[50px] min-w-[600px] max-w-[600px]  flex flex-col items-center">
        <div className="bg-[#ebebeb] w-full py-4 flex justify-center rounded-md italic font-semibold text-[20px] text-[red]">
          Đơn Hàng Của Tôi
        </div>
        <div className="w-full">
          <Table
            columns={columns}
            dataSource={products}
            loading={loading}
            pagination={false}
          />
        </div>
        <div className="bg-[#ebebeb] w-full py-4 flex justify-center rounded-md italic font-semibold text-[20px] text-[red] my-5">
          Tổng Tiền: {formatMoney(totalPrice)} đ
        </div>
        <Form onValuesChange={onValuesChange}>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Trường này bắt buộc" }]}
          >
            <DesctiptionBase label="Địa Chỉ" />
          </Form.Item>
          <div className="pl-5 font-semibold">Số Điện Thoại</div>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Trường này bắt buộc" }]}
          >
            <InputNumber size="large" className="w-full" />
          </Form.Item>
        </Form>
        <span className="text-[12px] self-start text-[red] italic">
          *Vui lòng điền đầy đủ thông tin trước khi thanh toán
        </span>
        <div className="bg-[#ebebeb] w-full py-4 flex justify-center rounded-md italic font-semibold text-[20px] text-[red] mb-5 mt-2">
          Phương Thức Thanh Toán
        </div>
        <div
          style={{
            opacity: required ? "0.5" : "1",
            pointerEvents: required ? "none" : "unset",
          }}
        >
          <Radio.Group value={paymentType} onChange={selectPaymentType}>
            <Radio value={1}>
              <Tag color="blue" className="py-2 px-4 text-[18px]">
                Thanh Toán Khi Nhận Hàng
              </Tag>
            </Radio>
            <Radio value={2}>
              <Tag color="green" className="py-2 px-4 text-[18px]">
                Thanh Toán Online
              </Tag>
            </Radio>
          </Radio.Group>
          <div className="min-w-[500px] max-w-[500px] mt-5">
            {paymentType === 1 ? (
              <Button
                size="large"
                className="bg-primary hover:!text-white text-white w-full !h-[55px]"
              >
                Đặt Hàng
              </Button>
            ) : (
              <PayPalScriptProvider
                options={{
                  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                }}
              >
                <PayPalButtons
                  createOrder={async (data, actions, err) => {
                    try {
                      const { order } = await createPayment({
                        cart_detail: product,
                        address: "gfdgfd",
                        phone: "0948320948",
                        kind_of_payment: paymentType,
                      });
                      await getMe();
                      return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                          {
                            description: order.id,
                            amount: {
                              currency_code: "USD",
                              value: (exchangeRate * order.total_price).toFixed(
                                2
                              ),
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
                    router.push('/order-me')
                  }}
                  onError={(err) => {
                    console.log(err);
                    // setTransactionStatus("failure");
                  }}
                />
              </PayPalScriptProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
