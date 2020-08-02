
const defaultState = { 
  token: "",
  refresh_token: "",
  name: "",
  role: "",
  expires_at: ""
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case "LOGIN": {
      return { ...state, ...action.payload }
    }

    case "LOGOUT": {
      return defaultState
    }
  
    default: {
      return state
    }
  }
}
