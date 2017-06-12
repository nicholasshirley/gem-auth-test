import {
    UNABLE_INITIALIZE,
    UNABLE_PARSE_JSON,
    WAITING_LIMIT,
    HTTP_NO_CONTENT,
    HTTP_UNPROCESSABLE_ENTITY,
    isHttpSuccessCode,
} from './code.constants'
const CONNECTION_TIME_OUT =  30000

let notifyError = ( error_code, server_notify = null) => {
    if(server_notify)
        return { error_code, server_notify }
    return { error_code }
}

export const fetchJsonExternal = (fetchLib) => {
    return new Promise((resolve, reject) => {
        let timeout = setTimeout(() => {
            console.debug('CONNECTION TIMEOUT.')
            reject(notifyError(WAITING_LIMIT))
        }, CONNECTION_TIME_OUT)

        fetchLib().then(
            response => {
                clearTimeout(timeout)

                console.debug('CONNECTION RESPONSED.', response)
                response.json().then(
                    jsonData => {
                        console.debug('PARSE JSON SUCCESS.', jsonData)
                        if( isHttpSuccessCode(response.status) ){
                            resolve({
                                http_status: response.status,
                                data: jsonData
                            })
                        } else if(response.status === HTTP_UNPROCESSABLE_ENTITY){
                            console.debug('CLIENT VALIDATION DEBUG.', jsonData)
                            reject(notifyError(response.status, 'Validation error !'))
                        } else{
                            reject(notifyError(response.status, jsonData.message))
                        }

                    },
                    parseError => {
                        switch(response.status){
                            case HTTP_NO_CONTENT:{
                                resolve({http_status: HTTP_NO_CONTENT})
                                break
                            }
                            default:{
                                reject(notifyError(UNABLE_PARSE_JSON))
                                break
                            }
                        }
                    }
                )
            }, connect_error => {
                clearTimeout(timeout)
                console.debug('CONNECTION INITIAL FAILED !', connect_error)
                reject(notifyError(UNABLE_INITIALIZE))
            }
        )
    })
}