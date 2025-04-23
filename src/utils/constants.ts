// export const HOST = import.meta.env.VITE_SERVER_URL;
export const HOST = "http://localhost:3030"
const AUTH_ROUTES = "/api/auth";
export const SIGNIN_ROUTE          = `${AUTH_ROUTES}/login`;
export const SIGNUP_ROUTE          = `${AUTH_ROUTES}/register`;
export const LOGOUT_ROUTE          = `${AUTH_ROUTES}/logout`;
export const VERIFY_ACCOUNT_ROUTE  = `${AUTH_ROUTES}/verifyAccount`;
export const FORGET_PASSWORD_ROUTE = `${AUTH_ROUTES}/forgetpassword`;
export const CHECK_OTP_ROUTE       = `${AUTH_ROUTES}/verify/checkOTP`;
export const RESET_PASSWORD_ROUTE  = `${AUTH_ROUTES}/resetpassword`;
    

const USER_ROUTES = "/api/users";
export const USER_PROFILE_ROUTE = `${USER_ROUTES}/profile`;
export const FOLLOW_USER_ROUTE = `${USER_ROUTES}/follow`;
export const USER_COUNT_ROUTE = `${USER_ROUTES}/count`;


export const POSTS_ROUTES = "/api/posts";
export const LIKE_POST_ROUTE = `${POSTS_ROUTES}/like`;
export const POST_COUNT_ROUTE = `${POSTS_ROUTES}/get/post/count`;


export const COMMENTS_ROUTE = "/api/comments";
export const COMMENTS_COUNT_ROUTE = `${COMMENTS_ROUTE}/get/count`;


export const CATEGORIES_ROUTE = "/api/categories"