import React ,{ useState } from 'react'
import MovieList from './Components/MovieList';
 import './App.css';
function App(){
  const[movies,setMovies]=useState([]);
   const[isloading,setIsLoading]=useState(false);
   const[error,setError]=useState(null);

  async function fetchMovieHandler(){
    setIsLoading(true);
    setError(null)
    try{
      const response =  await  fetch('https://swapi.info/api/films');
 
  if(!respone.ok){
    throw new Error("Something went wrong!");
    
  }
    const data = await response.json();

    const transformedMovies = data.results.map((movieData)=>{
      return{
        id: movieData.episode_id,
      title: movieData.title,
      openingText: movieData.opening_crawl,
      releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
     
  } catch(error){
  setError(error.message)
  }
  setIsLoading(false);
}
 
    
  

return(
  <React.Fragment>
    <section>
      <button onClick={fetchMovieHandler}>Fetch Movies</button>
    </section>
    <section>
   {!isloading &&  movies.length > 0 && <MovieList movies={movies}/>}
   {!isloading && movies.length===0 && !error && <p> Found no movies </p>}
      {!isloading && error && <p>{error}</p>}
   {isloading && <p>Loading...</p>}
   
    </section>
  </React.Fragment>

)
}
export default App;