import * as moment from 'moment';

export const LoginAction = ({ token, refresh_token, expires_in, name, role }) => {
    const expires_at = moment().add(expires_in, 'seconds');
    return dispatch => dispatch({ type: "LOGIN", payload: { token, refresh_token, name, role, expires_at } })
}

export const LogoutAction = () => {
    return dispatch => dispatch({ type: "LOGOUT" })
}

