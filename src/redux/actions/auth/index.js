export const LoginAction = ({ token, refresh_token }) => {
    return dispatch => dispatch({ type: "LOGIN", payload: { token, refresh_token } })
}

export const LogoutAction = () => {
    return dispatch => dispatch({ type: "LOGOUT" })
}

