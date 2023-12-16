import request from ".";

export async function loginUser(data) {
  return request(`/auth/login`, {
    method: "POST",
    data,
  });
}

export async function createUser(data) {
  return request(`/auth/register`, {
    method: "POST",
    data
  });
}

export async function userGetMe() {
  return request(`/me`, {
    method: "GET",
  });
}

export async function updateUser(id,data) {
  return request(`/user/update/${id}`, {
    method: "POST",
    data
  });
}

export async function changePasswordUser(id,data) {
  return request(`/user/change-password/${id}`, {
    method: "PUT",
    data
  });
}