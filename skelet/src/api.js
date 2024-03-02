import { userHelper } from "./userHelper.js";
const baseURL = "http://localhost:3030/";
async function reguester(url, method, data) {
  const options = {
    method,
    headers: {},
  };
  const userData = userHelper.getUserData();
  if (userData) {
    options.headers["x-authorization"] = userData.accessToken;
  }
  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(baseURL + url, options);
    if (response.ok === false) {
      const error = await response.json();
      throw new Error(error.message);
    }
    if (response.status === 204) {
      return response;
    }

    return await response.json();
  } catch (error) {
    alert(error);
    throw error;
  }
}

async function get(url) {
  return reguester(url, "GET");
}

async function post(url, data) {
  return reguester(url, "POST", data);
}

async function put(url, data) {
  return reguester(url, "PUT", data);
}

async function del(url) {
  return reguester(url, "DELETE");
}

export const api = {
  get,
  post,
  put,
  del,
};
