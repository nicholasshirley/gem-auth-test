import { USER_DATA_KEY } from '../../helpers/AppStorage'

// const convertJsonToFormData = data => {
//     let formData = new FormData()
//     for(let key in data){
//         formData.append(key, data[key])
//     }
//     return formData
// }


export const getPacketData = (method = "GET", data = {}, headers = {}) => {
    let user = window.STORAGE.get(USER_DATA_KEY)
    if(user){
        let token = user.token
        headers = {
            Authorization: `Bearer ${token}`,
            ...headers
        }
    }
    

    switch(method){
        case 'GET': case 'get':{
            return {
                method: 'GET',
                headers: {
                    'accept'         : 'application/json, application/xml, text/plain, text/html, *.*',
                    'content-type'   : 'application/json; charset = utf-8',
                    'accept-encoding': 'gzip, deflate',
                    ...headers
                },
            }
        }
        case 'POST': case 'post':{
            return {
                method: 'POST',
                headers: {
                    'accept'         : 'application/json, application/xml, text/plain, text/html, *.*',
                    'accept-encoding': 'gzip, deflate, gzip, deflate',
                    'content-type'   : 'application/json',
                    ...headers
                },
                body: JSON.stringify(data)
                // body: convertJsonToFormData(data)
            }
        }
        case 'PUT': case 'put':{
            return {
                method: 'PUT',
                headers: {
                    'accept': 'application/json',
                    'accept-encoding': 'gzip, deflate, gzip, deflate',
                    'content-type'   : 'application/json',
                    ...headers
                },
                // credentials: 'same-origin',
                credentials: 'include',
                body: JSON.stringify(data),
            }
        }
        case 'DELETE': case 'delete':{
            return {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                    'accept-encoding': 'gzip, deflate, gzip, deflate',
                    'content-type'   : 'application/json',
                    ...headers
                },
                // credentials: 'same-origin',
                credentials: 'include',
                body: JSON.stringify(data),
            }
        }
        default:{}
    }
}
