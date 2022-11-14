import { BASE_URL, ORIGIN } from './constants.js';


const fetchData = async (url, method, bodyObj) => {
    const mode = 'cors';
    const credentials = 'include';
    const headers = {
        'Content-type': 'application/json; charset=UTF-8',
        'Origin' : ORIGIN
    };
    const body = JSON.stringify(bodyObj);
    
    const req =  method === 'GET' ? {method, credentials, mode, headers} :
        {method, credentials, mode, headers, body};
    try {
        //console.log(req)
        const res = await fetch(BASE_URL + url, req);
        //console.log(res);
        const json = await res.json()
        return {error: false, status:res.status, data:json};
    } catch (error) {
        return {error: true};
    }
    
}

export {fetchData};