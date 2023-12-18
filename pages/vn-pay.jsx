import { Button } from "antd";
import React from "react";
import { VNPay } from "vn-payments";

function VnPay() {
  const handlePayment = async () => {
    const vnpay = new VNPay({
      vnp_TmnCode: "H4FC2WB0",
      vnp_Amount: 100000, // Số tiền cần thanh toán
      vnp_Command: "pay",
      vnp_CreateDate: new Date().toISOString(),
      vnp_CurrCode: "VND",
      vnp_IpAddr: "127.0.0.1",
      vnp_Locale: "vn",
      vnp_OrderInfo: "Thanh toán đơn hàng",
      vnp_ReturnUrl: "http://localhost:3000/vn-pay",
      vnp_TxnRef: "123456789",
    });

    const paymentUrl = await vnpay.buildCheckoutUrl();
    window.location.href = paymentUrl;
  };
  return (
    <div>
      <Button onClick={handlePayment}>Thanh toán VnPay</Button>
    </div>
  );
}

export default VnPay;
