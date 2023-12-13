import request from ".";

export async function getCart() {
  return request(`/cart`, {
    method: "GET",
  });
}

export async function addCart(data) {
  return request(`/cart/add`, {
    method: "POST",
    data,
  });
}

export async function updateCartById(id, data) {
  return request(`/cart/update/${id}`, {
    method: "POST",
    data,
  });
}
