import React from 'react';
import { OMDbAPISearch, OMDbResult } from './omdb_search';
import { key } from './key.json';

interface AppState {
    query: string;
    responseArray: Array<OMDbResult>;
}

class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            query: "",
            responseArray: [],
        };
    }

    render() {
        const movies = this.state.responseArray ? this.state.responseArray
                .map(res => displayMovie(res))
            : (<div> no results </div>);
        return (
          <div className="App h-screen bg-gray-400">
            <div className="App-header flex flex-grow justify-center ">
                <div className="w-3/4 m-6">
                    {/*
                    <div className="text-center">{"Query: " + this.state.query}</div>
                    */}
                    <form className="query text-center" onSubmit={this.handleSubmit.bind(this)}>
                        <input onChange={this.handleChange.bind(this)} placeholder="search a movie" />
                    </form>
                </div>
            </div>
           <div className="w-auto">
               { movies }
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
        this.setState({
            query: this.state.query,
            responseArray: response.Search,
        });
    }
}

function displayMovie(result: OMDbResult) {
    return (
        <div key={result.Title + result.Year} className="movie bg-gray-700 m-2 flex flex-row">
            <img className="w-32" src={result.Poster} alt="movie poster" />
            <span className="title text-lg text-gray-50 font-semibold flex-grow"> {result.Title} </span>
            <span className="year text-gray-100 text-right flex-grow"> {result.Year} </span>
        </div>
    );
}

export default App;
