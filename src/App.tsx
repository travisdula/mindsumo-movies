import React from 'react';
import { OMDbAPISearch } from './omdb_search';
import { key } from './key.json';

interface AppState {
    query: string;
    responseArray: Array<any>;
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
                .filter(res => res.Type === "movie")
                .map(res => displayMovie(res))
            : (<div> no results </div>);
        return (
          <div className="App">
            <header className="App-header flex justify-center ">
                <div className="w-3/4 m-4">
                    <div className="text-center">{"Query: " + this.state.query}</div>
                    <form className="query text-center" onSubmit={this.handleSubmit.bind(this)}>
                        <input onChange={this.handleChange.bind(this)} placeholder="search a movie" />
                    </form>
                    <div className="w-auto">
                        { movies }
                    </div>
                </div>
            </header>
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
        console.log(response.Search);
        this.setState({
            query: this.state.query,
            responseArray: response.Search
        });
    }
}

function displayMovie(result: any) {
    return (
        <div key={result.Title + result.Year} className="movie flex flex-row">
            <span className="title flex-grow"> {result.Title} </span>
            <span className="year text-right flex-grow"> {result.Year} </span>
        </div>
    );
}

export default App;
