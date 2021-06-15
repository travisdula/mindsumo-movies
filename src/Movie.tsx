import React from 'react';
import { DetailedOMDbResponse, OMDbAPIGetByID } from './omdb_search'
import { key  }from './key.json';

export function Movie({ result }: any) {
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
                    { expanded && (<div className="text-xs"> {moreInfo && moreInfo.Plot} </div>) }
                </div>
            </div>
        </button>
    );
}
