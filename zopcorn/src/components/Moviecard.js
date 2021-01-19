import React from "react"

export default function Moviecard( { movie } ) {
    return(
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt=""/>
            <div className="movie-details">
                <h4>{movie.title} ({movie.release_date.slice(0, 4)})</h4>
                <h5>{movie.vote_average}/10</h5>
                <hr/>
                <p>{movie.overview}</p>
            </div>
        </div>
    )
}