import DesctiptionBase from "@/components/pages/post/Desctiption";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { getCart } from "@/service/cart";
import { checkPayment, createPayment } from "@/service/payment";
import { formatMoney } from "@/utils/common.util";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Radio,
  Table,
  Tag,
} from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";

const { TextArea } = Input;

const exchangeRate = 0.000043;
function Payment() {
  const [form] = Form.useForm()
  const { getMe, errorNoti } = useContext(CreateContext);
  const [paymentType, setPaymentType] = useState(2);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { product } = router.query;
  const [products, setProducts] = useState([]);
  const [required, setRequired] = useState(true);
  const [infoPayment, setInfoPayment] = useState({});

  const onValuesChange = async (e, a) => {
    try {
      await form.validateFields()
    } catch (error) {
      if (!error.errorFields.length) {
        setRequired(false);
      } else {
        setRequired(true);
      }
    }
  };

  const selectPaymentType = (e) => {
    setPaymentType(e.target.value);
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
              className="min-w-[60px] min-h-[40px] max-w-[60px] max-h-[40px] md:min-w-[80px] md:min-h-[80px] md:max-w-[80px] md:max-h-[80px]"
              src={JSON.parse(record?.product?.image)?.[0] ?? ""}
              alt=""
            />
            <span className="truncate-2">{record?.product?.name}</span>
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
          <span className="font-semibold text-[12px] md:text-[14px] whitespace-nowrap">
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

  const paymentOrder = async () => {
    try {
      const { order } = await createPayment({
        cart_detail: product,
        address: infoPayment.address,
        phone: infoPayment.phone,
        kind_of_payment: paymentType,
      });
      await getMe();
    } catch (error) {
      Object.values(error.message).forEach((e) => errorNoti(e?.[0]));
    }
  };

  useEffect(() => {
    if (product) getAllCart();
  }, [router]);
  return (
    <div className="flex justify-center">
      <div className="mb-[200px] mt-[50px] px-2 md:px-0 min-w-[350px] md:min-w-[600px] max-w-[600px]  flex flex-col items-center">
        <div className="bg-[#ebebeb] w-full py-2 md:py-4 flex justify-center rounded-md italic font-semibold text-[16px] md:text-[20px] text-[red]">
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
        <div className="bg-[#ebebeb] w-full py-2 md:py-4 flex justify-center rounded-md italic font-semibold text-[16px] md:text-[20px] text-[red] my-5">
          Tổng Tiền: {formatMoney(totalPrice)} đ
        </div>
        <Form onValuesChange={onValuesChange} className="w-full" form={form}>
          <div className="font-semibold">Địa Chỉ</div>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Trường này bắt buộc" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <div className="font-semibold">Số Điện Thoại</div>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Trường này bắt buộc" },
              { min: 10, message: "Số điện thoại phải chứa ít nhất 10 số" },
              { max: 11, message: "Số điện thoại chứa nhiều nhất 11 số" },
            ]}
          >
            <Input size="large" className="w-full" />
          </Form.Item>
        </Form>
        {required && (
          <span className="text-[12px] self-start text-[red] italic">
            *Vui lòng điền đầy đủ thông tin trước khi thanh toán
          </span>
        )}
        <div className="bg-[#ebebeb] w-full py-2 md:py-4 flex justify-center rounded-md italic font-semibold text-[16px] md:text-[20px] text-[red] mb-5 mt-2">
          Phương Thức Thanh Toán
        </div>
        <div
          className="px-2"
          style={{
            opacity: required ? "0.5" : "1",
            pointerEvents: required ? "none" : "unset",
          }}
        >
          <div className="flex justify-center">
            <Radio.Group value={paymentType} onChange={selectPaymentType}>
              <Radio value={1} className="mt-2 sm:mt-0">
                <Tag
                  color="blue"
                  className="py-1 md:py-2 px-2 md:px-4 text-[14px] md:text-[18px]"
                >
                  Thanh Toán Khi Nhận Hàng
                </Tag>
              </Radio>
              <Radio value={2} className="mt-2 sm:mt-0">
                <Tag
                  color="green"
                  className="py-1 md:py-2 px-2 md:px-4 text-[14px] md:text-[18px]"
                >
                  Thanh Toán Online
                </Tag>
              </Radio>
            </Radio.Group>
          </div>
          <div className="w-full md:min-w-[500px] md:max-w-[500px] mt-5 flex justify-center md:block">
            {paymentType === 1 ? (
              <Button
                size="large"
                className="bg-primary hover:!text-white text-white w-full !h-[55px]"
                onClick={paymentOrder}
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
                        address: infoPayment.address,
                        phone: infoPayment.phone,
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
                    router.push("/order-me");
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
