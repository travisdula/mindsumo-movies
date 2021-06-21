import React from 'react';
import { OMDbAPISearch, OMDbSearchResult, DetailedOMDbResponse, OMDbAPIGetByID } from './omdb_search';
import { key } from './key.json';
import { Movie } from './Movie';

interface AppState {
    query: string;
    responseArray: Array<OMDbSearchResult>;
    index: number;
    totalResults: number;
    error: string;
    expandedMovie: string | undefined;
    moreInfo: DetailedOMDbResponse | undefined;
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
            expandedMovie: undefined,
            moreInfo: undefined,
        };
    }

    render() {
        const error = this.state.error !== ""
            ?
            (<div className="text-gray-200 text-2xl font-semibold bg-gray-700 text-center rounded-lg">
                <div className="m-4">
                    { this.state.error }
                </div>
            </div>)
            : null;

        const movies = this.state.responseArray
            .map(res => (
                <Movie
                    key={res.imdbID}
                    result={res}
                    expanded={res.imdbID===this.state.expandedMovie}
                    moreInfo={this.state.moreInfo}
                    onClick={async () =>
                        {
                            this.setState({
                                expandedMovie: res.imdbID === this.state.expandedMovie ? undefined : res.imdbID,
                                moreInfo: res.imdbID === this.state.moreInfo?.imdbID
                                    ? this.state.moreInfo
                                    : await OMDbAPIGetByID(key, res.imdbID),
                            });
                        }
                    }
                />
            ));

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
        if (response.Response === "False") {
            this.setState({
                query: "",
                responseArray: [],
                totalResults: 0,
                error: response.Error,
            })
        } else {
            this.setState({
                responseArray: response.Search,
                totalResults: parseInt(response.totalResults),
                error: "",
            });
        }
        this.setState({
            expandedMovie: undefined,
            moreInfo: undefined,
            index: 1,
        })
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

export default App;
