import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

function Payment() {
  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };
  console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
  return (
    <div className="my-[200px] flex justify-center">
      <div className="min-w-[500px]">
        <PayPalScriptProvider
          options={{
            "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          }}
        >
          <PayPalButtons
            createOrder={(data, actions, err) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "MacBook Laptop",
                    amount: {
                      currency_code: "USD",
                      value: 325.33,
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const order = await actions.order.capture();

              console.log("success", order);
              // setTransactionStatus("success");
            }}
            onError={(err) => {
              console.log(err);
              // setTransactionStatus("failure");
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}

export default Payment;
