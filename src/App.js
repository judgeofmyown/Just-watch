import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './screens/Register';
import { Context, ContextProvider } from './Context/Context';
import MovieCard from './components/MovieCard';
import Search from './components/Search';
import Homepage from './screens/Homepage';
import MoviesBanner from './components/MoviesBanner';
import About from './screens/About';


function App() {
  // `http://www.omdbapi.com/?s=${movieTitle}&apikey=475d8782

  const [movies, setMovies] = useState([]);
  const [showBanner, setShowBanner] = useState(true);

  const { searchItem, setSearchItem, searchClicked, setSearchClicked } = useContext(Context);

  async function handleSearch(title) {
    const response = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=475d8782`)
    const data = await response.json()
    setMovies(data.Search);
    setSearchClicked(prev => prev = true)
    console.log(searchItem);
    console.log(movies)
  }



  const router = createBrowserRouter([
    {
      path:"/",
      element: <>
                  <Header/>
                  <Homepage/>
                </>
    },
    {
      path:"/watch",
      element: <>
                  <Header/>
                  <Search search={handleSearch}/>
                  <MoviesBanner/>
                </>
    },
    {
      path:`/search?`,
      element: <>
                  <Header/>
                  <Search search={handleSearch}/>
                  {
                    (movies !== undefined?(<div className='movie-container'>
                      {
                        movies.map((movie) => <MovieCard movie={movie}/>)                    
                      }
                  </div>):<h2>No Movies Found</h2>)
                  }
                </>
    },
    {
      path:"/register",
      element: <>
                  <Register/>

                </>,

    },
    {
      path:"/profile",
      element:<h3>Profile</h3>
    },
    {
      path:"/About",
      element:<About/>
    }
  ])


  return (
    <>
        <RouterProvider router={router}/>
    </>
  );
}


export default App;
