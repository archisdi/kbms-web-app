
const defaultState = { 
  token: "",
  refresh_token: ""
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case "LOGIN": {
      const { token, refresh_token } = action.payload;
      return { ...state, token, refresh_token }
    }

    case "LOGOUT": {
      return { ...state, token: "", refresh_token: "" }
    }
  
    default: {
      return state
    }
  }
}
