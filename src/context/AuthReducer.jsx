const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "UPDATE_START":
      return {
        ...state,
        isFetching:true
      };
    case "UPDATE_SUCCESS":
      return {
        isFetching: false,
        user: {
          ...state.user,
          ...action.payload
        },
      };
    case "UPDATE_FAILURE":
      return {
        ...state,
        error:true
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [
            ...state.user.followings.filter(
              (following) => following !== action.payload
            ),
          ],
        },
      };
    case "TOGGLE":
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case "HAMBURGER":
      return {
        ...state,
        hamburger: !state.hamburger,
      };
    case "HAMBURGER_OFF":
      return {
        ...state,
        hamburger: false,
      };
    case "NOT":
      return {
        ...state,
        not: !state.not,
      };
    case "NOT_OFF":
      return {
        ...state,
        not: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;




// const usersInfo = {userId1:{username:"kağan",Img:"ajhjsdkaasd"},userId2:{username:"kaan",Img:"ajhjsdka"}}

