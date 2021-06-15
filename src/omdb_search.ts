import axios from "axios";

export interface OMDbResponse {
    Search: Array<OMDbResult>;
    totalResults: string;
    Response: string;
}

export interface OMDbResult {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
    Type: string;

}
async function OMDbAPISearch(key: string, title: string, page: Number = 1): Promise<OMDbResponse> {
    return axios.get(`https://www.omdbapi.com/?type=movie&apikey=${key}&s=${title}&page=${page}`)
    .then(res => {return res.data})
    .catch(err => console.error(err));
}

export { OMDbAPISearch };
