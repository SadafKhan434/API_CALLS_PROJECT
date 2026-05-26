import React ,{ useState ,useEffect,useCallback} from 'react'
import MovieList from './Components/MovieList';
import MovieForm from './Components/MovieForm';
 import './App.css';
function App(){
  const[movies,setMovies]=useState([]);
   const[isloading,setIsLoading]=useState(false);
   const[error,setError]=useState(null);
    
   

  const   fetchMovieHandler= useCallback(async()=>{
    setIsLoading(true);
    setError(null)
    try{
      const response =  await  fetch('https://react-http-420ff-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json');
 
  if(!response.ok){
    throw new Error("Something went wrong!");
    
  }
    const data = await response.json();

    const loadedMovies=[];

    for (const key in data){

      loadedMovies.push({
        id:key,
        title:data[key].title,
        openingText:data[key].openingText,
        releaseDate:data[key].releaseDate
      });
    }

    
    setMovies(loadedMovies);
     
  } catch(error){
  setError(error.message)
  }
  setIsLoading(false);
},[]);

useEffect(()=>{
    fetchMovieHandler();
   },[fetchMovieHandler])


 async function addMovieHandler(movie){
   const response= await fetch('https://react-http-420ff-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',{
    method:'POST',
    body:'JSON.stringify(movie)',
    headers:{
      'Content-Type': 'application/json'
    }
    })
    const data = await response.json()
    console.log(data);
}


let content=<p>Found no movies.</p>
if(movies.length>0){
  content=<MovieList movies={movies}/>
}
 
    
 // const addMovieHandler = useCallback((newMovie) => {
//  const movieWithId = {
   // ...newMovie,
    //id: Date.now().toString(), 
  //};//

//  setMovies((prevMovies) => [movieWithId, ...prevMovies]); 
 //}, []);//


return(
  <React.Fragment>
    <section>
            <MovieForm onAddMovie={addMovieHandler} /> 

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