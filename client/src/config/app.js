const PRODUCTION_SERVER_API = ''
const DEVELOPMENT_SERVER_API = 'http://api.lvh.me:3001'
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