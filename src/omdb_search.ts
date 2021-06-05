import axios from "axios";

async function OMDbAPISearch(key: string, title: string): Promise<any> {
    return axios.get('http://omdbapi.com/', {
        params: {
            apikey: key,
            s: title,
        }
    }).then(res => res.data);
}

export { OMDbAPISearch };
