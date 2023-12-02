import request from ".";

export async function getAllCategory() {
  return request(`/category/all`, {
    method: "GET"
  });
}