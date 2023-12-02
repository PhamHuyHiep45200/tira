import request from ".";

export async function postProduct(data) {
  return request(`/product/create`, {
    method: "POST",
    data,
  });
}

export async function getAllProduct(params) {
  return request(`/product/all`, {
    method: "GET",
    params
  });
}

export async function getProductTopOrder() {
  return request(`/product/get-top-order`, {
    method: "GET",
  });
}