import React from 'react'
import './MovieCard.css'

function MovieCard({movie}) {
  return (
    <>
        <div className="card">
          { movie.Poster === "N/A"? (
            <>
              <img src='https://placehold.co/600x400' alt='placeholder'/>
              <div className="card_details">
              <h3>{movie.Title}</h3>
              <p>{movie.Type} <br/> {movie.Year}</p>
            </div>
            </>
          ):(
            <>
            <img src={movie.Poster} alt="" />
            <div className="card_details">
              <h3>{movie.Title}</h3>
              <p>{movie.Type} <br/> {movie.Year}</p>
            </div>
            </>
          )
          }
        </div>
    </>
  )
}

export default MovieCard