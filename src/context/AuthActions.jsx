export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
export const Logout = () => ({
  type: "LOGOUT",
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});

export const darkMode = () => ({
  type: "DARKMODE",
});

export const hamburger = () => ({
  type: "HAMBURGER",
});
export const hamburgerOff = () => ({
  type: "HAMBURGER_OFF",
});
export const not = () => ({
  type: "NOT",
});
export const notOff = () => ({
  type: "NOT_OFF",
});

export const updateStart = () => ({
  type: "UPDATE_START",
});

export const updateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const updateFailure = () => ({
  type: "UPDATE_FAILURE",
});
