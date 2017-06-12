const PRODUCTION_SERVER_API = '/api/'
const DEVELOPMENT_SERVER_API = 'http://localhost:3000/api/'
/*
    ENVIROMENT: env
    ---------------------
    0: development
    1: production 
    ---------------------
*/
const env = 0

// =======================

export const getEnv = () => {
    if(env) return PRODUCTION_SERVER_API
    return DEVELOPMENT_SERVER_API
}