import request from ".";

export async function createPayment(data) {
  return request(`/order/create`, {
    method: "POST",
    data,
  });
}

export async function checkPayment(data) {
  return request(`/order/check-paypal`, {
    method: "POST",
    data,
  });
}
