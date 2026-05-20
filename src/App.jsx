import React ,{ useState ,useEffect,useCallback} from 'react'
import MovieList from './Components/MovieList';
 import './App.css';
function App(){
  const[movies,setMovies]=useState([]);
   const[isloading,setIsLoading]=useState(false);
   const[error,setError]=useState(null);
    
   

  const   fetchMovieHandler= useCallback(async()=>{
    setIsLoading(true);
    setError(null)
    try{
      const response =  await  fetch('https://swapi.info/api/films');
 
  if(!response.ok){
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
},[]);

useEffect(()=>{
    fetchMovieHandler();
   },[fetchMovieHandler])


let content=<p>Found no movies.</p>
if(movies.length>0){
  content=<MovieList movies={movies}/>
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