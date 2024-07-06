import React from 'react'
import './Homepage.css'
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <>
      <div className="home-container">
        <div className="upper">
          <div className="intro">
            <h1>Your streaming guide for movies,<br/> TV shows & sports</h1>
          </div>
          
          <div className="towatch">
            <button><Link to="/watch">What to watch?</Link></button>
          </div>
          
          <div className="services">
            <h4>Streaming service on just movies</h4>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Homepage