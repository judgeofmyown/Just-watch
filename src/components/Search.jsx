import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import './Search.css'
import { Link, useSearchParams } from 'react-router-dom'
import { Context } from '../Context/Context'

function Search({search}) {

  const {searchItem, setSearchItem} = useContext(Context)


  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchItem(value);
  }

  return (
    <>
        <div className='search'>
            <input 
              placeholder='what to watch?' 
              type='text'
              value={searchItem} 
              onChange={handleSearch}>
            </input>
            <Link to={`/search?`}><img onClick={() => search(searchItem)}  src={assets.search_icon} alt="searchIcon"/></Link>
        </div>
    </>

  )
}

export default Search