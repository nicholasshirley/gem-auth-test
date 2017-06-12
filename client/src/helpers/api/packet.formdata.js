import { USER_DATA_KEY } from '../../helpers/AppStorage'

const convertJsonToFormData = data => {
    let formData = new FormData()
    for(let key in data){
        if(data[key] instanceof Array ){
            data[key].forEach((item,index)=> {
                if(item instanceof Blob){
                    formData.append(key+'[]', item)
                }else{
                    formData.append(key+'[]', JSON.stringify(item))
                }
            })
        }
        else
            formData.append(key, data[key])
    }
    return formData
}

export const getPacketFormData = (method = "POST", data = {}, headers = {}) => {
    let user = window.STORAGE.get(USER_DATA_KEY)
    if(user){
        let token = user.token
        headers = {
            Authorization: `Bearer ${token}`,
            ...headers
        }
    }

    switch(method){
        case 'POST': case 'post':{
            return {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                    ...headers
                },
                // body: JSON.stringify(data)
                body: convertJsonToFormData(data)
            }
        }
        default:{
            return {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                    ...headers
                },
                // body: JSON.stringify(data)
                body: convertJsonToFormData(data)
            }
        }
    }
}