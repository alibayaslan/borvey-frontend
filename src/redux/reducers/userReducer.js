import { USER_LOGIN, UPDATE_USER, LOG_OUT } from "../type";

const initialState = {
  user: {
    token: "",
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...action.payload.data,
        type: action.payload.type,
        token: action.payload.token,
      };
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload,
      };
    case LOG_OUT:
      return {
        user: {
          token: "",
        },
      };
    default:
      return state;
  }
}
