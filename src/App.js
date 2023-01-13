import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMovies() {
    setIsLoading(true);
    const response = await fetch('https://swapi.dev/api/films');
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
    setIsLoading(false);

  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Get Star Wars Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {isLoading && <p><i>Loading...</i></p>}
        {!isLoading && movies.length === 0 && <p><i>No Movies Found!</i></p>}
      </section>
    </React.Fragment>
  );
}

export default App;
