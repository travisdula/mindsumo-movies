import React from 'react';
import { OMDbAPISearch, OMDbResult } from './omdb_search';
import { key } from './key.json';

interface AppState {
    query: string;
    responseArray: Array<OMDbResult>;
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
            .map(res => displayMovie(res))
            : (<div> no results </div>);
        const button = this.state.responseArray.length === this.state.totalResults ?
            null
            : (
                <button
                    className="loadMoreButton bg-opacity-60 hover:bg-opacity-100 bg-blue-400 rounded-lg mb-2 text-xl font-medium h-12 w-36 "
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

function displayMovie(result: OMDbResult) {
    return (
        <div key={result.imdbID} className="movie rounded-lg bg-opacity-25 md:w-96 w-11/12 bg-gray-400 m-4 mt-0 flex flex-row">
            <img className="w-32 flex-shrink-0 rounded-lg text-gray-500 italic text-center" src={result.Poster} alt="no poster" />
            <span className="title m-2 text-lg text-gray-700 font-semibold"> {result.Title} </span>
            <span className="year m-2 text-gray-600 text-right flex-grow"> {result.Year} </span>
        </div>
    );
}


export default App;
