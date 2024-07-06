import React from 'react'
import './MovieCard.css'

function MovieCard({movie}) {
  return (
    <>
        <div className="card">
          { movie.Poster === "N/A"? (
            <img src='https://placehold.co/600x400' alt='placeholder'/>
          ):(
            <img src={movie.Poster} alt="" />
          )
          }
        </div>
    </>
  )
}

export default MovieCard