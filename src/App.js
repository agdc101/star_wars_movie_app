import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMovies() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/film');
      if (!response.ok) {
        throw new Error('Error! - There\'s a disturbance in the force');
      }

      const data = await response.json();
      const transformedMovies = data.results.map(movieData => { // this function is renaming the api data properties. not mandatory.
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      });
      setMovies(transformedMovies);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }

  let content = <p>Click the fetch button!</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  } else {
    <p><i>No Movies Found.</i></p>
  }

  if (error) {
    content = <p>{error}</p>
  }
  if (isLoading) {
    content = <p><i>Loading...</i></p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Get Star Wars Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
