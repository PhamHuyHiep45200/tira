import request from ".";

export async function getAllCategory() {
  return request(`/category/all`, {
    method: "GET"
  });
}

export async function getAllCollection() {
  return request(`/collection/all`, {
    method: "GET"
  });
}