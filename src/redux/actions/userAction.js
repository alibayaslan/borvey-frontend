import { USER_LOGIN, UPDATE_USER, LOG_OUT } from "../type";

export const userLogin = (payload) => {
  return {
    type: USER_LOGIN,
    payload: payload,
  };
};

export const updateUser = (payload) => {
  return {
    type: UPDATE_USER,
    payload: payload,
  };
};

export const logoutUser = (payload) => {
  return {
    type: LOG_OUT,
    payload: payload,
  };
};
