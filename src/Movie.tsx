import React from 'react';
//import { DetailedOMDbResponse, OMDbAPIGetByID } from './omdb_search'
//import { key }from './key.json';

export function Movie(props: any) {
    /*const [expanded, setExpanded] = React.useState(false);
    const [moreInfo, setMoreInfo]
        : [DetailedOMDbResponse | undefined, React.Dispatch<DetailedOMDbResponse | undefined>]
        = React.useState();*/
    /*if (moreInfo?.imdbID !== result.imdbID) {
        setExpanded(false);
    }*/
    const result = props.result;
    const expanded = props.expanded;
    const moreInfo = props.moreInfo;
    return (
        <button 
            onClick={props.onClick}
            className="shadow-md transition duration-500 rounded-lg bg-opacity-25 hover:bg-opacity-100 max-w-4xl md:w-1/2 w-11/12 bg-gray-400 m-4 mt-0 ">
            <div className="flex flex-col">
                <div className="flex flew-row flex-auto">
                    <img className="w-20 flex-shrink-0 rounded-lg text-gray-500 italic text-center" src={result.Poster} alt="no poster" />
                    <div className="flex flex-col w-full m-2">
                        <div className="flex flex-row">
                            <span className="title text-xl text-gray-700 text-left font-semibold mr-2"> {result.Title} </span>
                            <span className="year text-gray-600 text-right flex-grow"> {(moreInfo && expanded) ? moreInfo.Released : result.Year} </span>
                        </div>
                        {
                            expanded &&
                            (
                                <div className="text-md">
                                    <div className="flex flex-row flex-auto">
                                        <span className="text-left text-gray-700 font-semibold"> {moreInfo && filterNA(moreInfo.Director, "director")} </span>
                                        <span className="text-right flex-grow text-gray-600"> {moreInfo && filterNA(moreInfo.Runtime, "runtime")} </span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div>
                    { expanded && (<div className="text-lg m-2 mb-0 text-justify select-all"> {moreInfo && filterNA(moreInfo.Plot, "plot")} </div>) }
                    { expanded && (<span className="text-center text-gray-700 flex-grow"> {moreInfo && filterNA(moreInfo.Genre, "genre")} </span>) }
                </div>
            </div>
        </button>
    );
}

function filterNA(prop: string, propertyName: string = ""): JSX.Element {
    return (<span className={prop === "N/A" ? "italic" : ""}> {prop === "N/A" ? propertyName + " not found" : prop} </span>)
        
}
