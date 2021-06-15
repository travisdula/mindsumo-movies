import React from 'react';
import { OMDbAPISearch, OMDbSearchResult, OMDbAPIGetByID, DetailedOMDbResponse } from './omdb_search';
import { key } from './key.json';

interface AppState {
    query: string;
    responseArray: Array<OMDbSearchResult>;
    index: number;
    totalResults: number;
    error: string;
}

class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            query: "",
            responseArray: [],
            index: 1,
            totalResults: 0,
            error: "",
        };
    }

    render() {
        const error = this.state.error !== ""
            ? (
            <div className="text-gray-200 text-2xl font-semibold bg-gray-700 text-center rounded-lg">
                <div className="m-4">
                    { this.state.error }
                </div>
            </div>
            )
            : null;
        const movies = this.state.responseArray ?
            this.state.responseArray
            .map(res => (<Movie value={res}/>))
            : (<div> no results </div>);
        const button = this.state.responseArray.length === this.state.totalResults ?
            null
            : (
                <button
                    className="loadMoreButton transition duration-500 bg-opacity-60 hover:bg-opacity-100 bg-blue-400 rounded-lg mb-2 text-xl font-medium h-12 w-36 "
                    onClick={this.loadMore.bind(this)}>
                    Load More
                </button>
            );

        return (
          <div className="App min-h-screen bg-gradient-to-b from-blue-200 to-purple-200">
            <header className="App-header flex flex-grow justify-center">
                <div className="w-96 m-4">
                    {/*
                    <div className="text-center">{"Query: " + this.state.query}</div>
                    */}
                    <form className="query text-center" onSubmit={this.handleSubmit.bind(this)}>
                        <input className="text-center text-2xl bg-blue-50 rounded-lg" onChange={this.handleChange.bind(this)} placeholder="search a movie" />
                    </form>
                </div>
            </header>
           <div className="w-auto flex flex-col items-center">
               { error }
               { movies }
               { button }
           </div>
          </div>
        );
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const userQuery = event.target.value;
        this.setState({
            query: userQuery,
        });
    }

    async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const response = await OMDbAPISearch(key, this.state.query)
        console.log(response);
        if (response.Response === "False") {
            this.setState({
                query: "",
                responseArray: [],
                index: 1,
                totalResults: 0,
                error: response.Error,
            })
        } else {
            this.setState({
                responseArray: response.Search,
                index: 1,
                totalResults: parseInt(response.totalResults),
                error: "",
            });
        }
    }

    async loadMore(_: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const idx = this.state.index + 1;
        const response = await OMDbAPISearch(key, this.state.query, idx);
        this.setState({
            responseArray: this.state.responseArray.concat(response.Search),
            index: idx,
        });
    }
}


function Movie({ value }: any) {
    const result = value;
    console.log("res", result);
    const [expanded, setExpanded] = React.useState(false);
    const [moreInfo, setMoreInfo]
        : [DetailedOMDbResponse | undefined, React.Dispatch<DetailedOMDbResponse | undefined>]
        = React.useState();
    return (
        <button 
            key={result.imdbID}
            onClick={async () =>
                {
                    !(moreInfo && 'Title' in moreInfo) &&
                        setMoreInfo(await OMDbAPIGetByID(key, result.imdbID));
                    setExpanded(!expanded);
                }
            }
            className="movie transition duration-500 rounded-lg bg-opacity-25 hover:bg-opacity-100 md:w-96 w-11/12 bg-gray-400 m-4 mt-0 ">
            <div className="flex flew-row flex-auto">
                <img className="w-32 flex-shrink-0 rounded-lg text-gray-500 italic text-center" src={result.Poster} alt="no poster" />
                <div className="flex flex-col w-full m-2">
                    <div className="flex flex-row">
                        <span className="title text-lg text-gray-700 text-left font-semibold flex-grow"> {result.Title} </span>
                        <span className="year text-gray-600 text-right flex-grow"> {result.Year} </span>
                    </div>
                    { expanded && (<div> {moreInfo && moreInfo.Plot} </div>) }
                </div>
            </div>
        </button>
    );
}


export default App;
