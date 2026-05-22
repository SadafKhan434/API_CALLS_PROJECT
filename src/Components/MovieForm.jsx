import React, { useState } from 'react';
import classes from './MovieForm.module.css'; 

const MovieForm = () => {
  
  const [movieData, setMovieData] = useState({
    title: '',
    openingText: '',
    releaseDate: '',
  });

  
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    
    if (!movieData.title.trim() || !movieData.openingText.trim() || !movieData.releaseDate.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    
    const NewMovieObj = {
      title: movieData.title,
      openingText: movieData.openingText,
      releaseDate: movieData.releaseDate,
    };
    
    console.log(NewMovieObj);

    
    setMovieData({
      title: '',
      openingText: '',
      releaseDate: '',
    });
  };

  return (
    <div className={classes['form-container']}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title" 
            value={movieData.title}
            onChange={inputChangeHandler}
          />
        </div>
        
        <div className={classes.control}>
          <label htmlFor="openingText">Opening Text</label>
          <textarea
            id="openingText"
            name="openingText" 
            rows="5"
            value={movieData.openingText}
            onChange={inputChangeHandler}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="text"
            id="releaseDate"
            name="releaseDate" 
            placeholder="YYYY-MM-DD"
            value={movieData.releaseDate}
            onChange={inputChangeHandler}
          />
        </div>

        <div className={classes.actions}>
          <button type="submit">Add Movie</button>
        </div>
      </form>
    </div>
  );
};


export default React.memo(MovieForm);
