import React, { useState } from 'react'
import './App.css'
import Moviecard from "./components/Moviecard"

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function App() {
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])

  const searchMovies = async (e) => {
    e.preventDefault()

    const api_key = "075e6d91545f3eba53112e9e1399c5d4"
    if (query !== "") {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=1`
    
      try {
        const response = await fetch(url)
        const data = await response.json()
        const { results } = data
        // console.log(data)
        setMovies(results)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <header>
        <h1>ZORPCORN!</h1>

        <div className="search-container">
          <form onSubmit={searchMovies}>
            <label htmlFor="query">
              <input
                name="query"
                onChange={e => setQuery(e.target.value)}
                value={query}
                placeholder="Search movies..."
                className="searchbar"
                autoComplete="off"
              >
              </input>
            </label>
            <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
          </form>
        </div>

      </header>

      <div className="movie-list">
        {movies.map(movie => (
          <Moviecard key={movie.id} movie={movie} />
        ))}
      </div>
      
    </div>
  )
}