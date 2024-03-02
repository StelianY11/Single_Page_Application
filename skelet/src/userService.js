import { api } from "./api.js";
import { userHelper } from "./userHelper.js";
const userEndpoints = {
  login: "users/login",
  register: "users/register",
  logout: "users/logout",
};

async function register(email, password) {
  const data = await api.post(userEndpoints.register, {
    email,
    password,
  });
  userHelper.setUserData(data);
}

async function login(email, password) {
  const data = await api.post(userEndpoints.login, { email, password });
  userHelper.setUserData(data);
}

async function logout() {
  await api.get(userEndpoints.logout);
  userHelper.removeUserData();
}
export const userService = {
  register,
  login,
  logout,
};
