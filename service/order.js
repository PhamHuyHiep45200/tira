import request from ".";

export async function getOrderMe() {
  return request(`/order/get-by-user`, {
    method: "GET",
  });
}