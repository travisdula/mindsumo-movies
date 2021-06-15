import axios from "axios";

export interface OMDbResponse {
    Error: string;
    Search: Array<OMDbSearchResult>;
    totalResults: string;
    Response: string;
}

export interface OMDbSearchResult {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
    Type: string;

}

export interface DetailedOMDbResponse {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Array<Rating>;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export interface Rating {
    Source: string;
    Value: string;
}

async function OMDbAPISearch(key: string, title: string, page: Number = 1): Promise<OMDbResponse> {
    return axios.get("https://www.omdbapi.com/", {
        params: {
            type: "movie",
            apikey: key,
            s: title,
            page: page,
        }
    })
    .then(res => {return res.data})
    .catch(err => console.error(err));
}

async function OMDbAPIGetByID(key: string, id: string): Promise<DetailedOMDbResponse> {
    return axios.get("https://www.omdbapi.com/", {
        params: {
            apikey: key,
            i: id,
        }
    })
    .then(res => {return res.data})
    .catch(err => console.error(err));
}

export { OMDbAPISearch, OMDbAPIGetByID };
