export default (state: any, action: any) => {
    const { payload, type } = action;
    switch (type) {
        case "USER_LOADED":
            let token = localStorage.getItem("token");
            console.log("hellooo")
            return {
                ...state,
                isAuthenticated: token ? true : false,
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
                isAuthenticated: true,
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