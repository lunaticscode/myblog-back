export const API_RESULT = {
    SUCCESS: 20000,
    FAIL: 50000,
}

export const REDIS = {
    PORT: ( process.env.MODE === "LOCAL" ) ? 63799 : 6379,
    EXPIRE_TIME: 600, 
}