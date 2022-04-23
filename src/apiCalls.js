import { publicRequest, userRequest } from "./requestMethods";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await publicRequest.post("/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const updateUser = async (userCredential, dispatch, id) => {
  dispatch({ type: "UPDATE_START" });
  try {
    const res = await userRequest.put(`/users/${id}`, userCredential);
    dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "UPDATE_FAILURE" });
  }
};
