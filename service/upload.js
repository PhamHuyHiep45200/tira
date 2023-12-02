import request from ".";

export async function upploadImage(data) {
  return request(`/image/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}
