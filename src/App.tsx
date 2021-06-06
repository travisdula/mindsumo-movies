import React from 'react';
import './App.css';
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
        return (
          <div className="App">
            <header className="App-header">
                <form className="query" onSubmit={this.handleSubmit.bind(this)}>
                    <input onChange={this.handleChange.bind(this)} placeholder="search a movie" />
                </form>
                <div>{"Query: " + this.state.query}          </div>
            {this.state.responseArray
                .filter(res => res.Type === "movie")
                .map(res => <div> {res.Title} </div>)}
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

export default App;
