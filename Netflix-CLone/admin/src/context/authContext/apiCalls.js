import axios from "axios";
import { loginFailure, loginStart, loginSuccess, logout } from "./AuthActions";

export const login = async (user, d) => {
  d(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    d(loginSuccess(res.data))
  } catch (err) {
    d(loginFailure());
  }
};

export const Logout = (d) => {
  d(logout());
}