export default (state: any, action: any) => {
    const { payload, type } = action;
    switch (type) {
        case "USER_LOADED":
            let token = localStorage.getItem("token");
            return {
                ...state,
                isAuthenticated: payload.valid,
                isLoading: false,
                user: payload,
                token: token
            };
        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS":
        case "VALIDATION_SUCCESS":
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: payload.user.valid,
                isLoading: false
            };
        case "REGISTER_FAIL":
        case "LOGIN_FAIL":
        case "AUTH_ERROR":
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                token: null,
                user: null
            };

        default:
            return state;
    }
}