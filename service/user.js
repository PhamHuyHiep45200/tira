import request from ".";

export async function loginUser(data) {
  return request(`/user/login`, {
    method: "POST",
    data,
  });
}

export async function createUser(data) {
  return request(`/user`, {
    method: "POST",
    data
  });
}

export async function userGetMe(id) {
  return request(`/user/${id}`, {
    method: "GET",
  });
}

export async function updateUser(id,data) {
  return request(`/user/update-user/${id}`, {
    method: "PUT",
    data
  });
}

export async function changePasswordUser(id,data) {
  return request(`/user/change-password/${id}`, {
    method: "PUT",
    data
  });
}