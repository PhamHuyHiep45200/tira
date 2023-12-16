import CardOrder from "@/components/pages/order/CardOrder";
import { getOrderMe } from "@/service/order";
import React, { useEffect, useState } from "react";

function OrderMe() {
  const [order, setOrder] = useState([]);
  const getDataOrderMe = async () => {
    try {
      const { order } = await getOrderMe();
      setOrder(order.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataOrderMe();
  }, []);
  console.log(order);
  return (
    <div className="flex justify-center">
      <div className="mb-[100px] mt-[50px] w-[1280px] relative px-2 sm:px-0">
        {order.length &&
          order.map((e) => (
            <div className="mb-5" key={e.id}>
              <CardOrder
                data={e.order_details}
                status={e.status}
                totalPrice={e.total_price}
                id={e.id}
                refresh={getDataOrderMe}
                paymentType={e.kind_of_payment}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default OrderMe;
