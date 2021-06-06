import axios from "axios";

async function OMDbAPISearch(key: string, title: string): Promise<any> {
    return axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${title}`)
    .then(res => {return res.data})
    .catch(err => console.error(err));
}

export { OMDbAPISearch };
