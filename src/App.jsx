import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: 'd5c775389c73a0b2a2bc815d05093528',
            language: 'es-MX',
          },
        });

        setPopularMovies(response.data.results);
      } catch (error) {
        console.error('Error al obtener películas populares:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="app">
      <h1>API de Películas</h1>
      <h2>Películas Populares:</h2>
      <ul className="movie-list">
        {popularMovies.map((movie) => (
          <li key={movie.id} className="movie-item" onClick={() => handleMovieClick(movie)}>
            <h3>{movie.title}</h3>
            <p>Calificación: {movie.vote_average}</p>
          </li>
        ))}
      </ul>
      {selectedMovie && (
        <div className="selected-movie">
          <h3>{selectedMovie.title}</h3>
          <p>Descripción: {selectedMovie.overview}</p>
          <p>Calificación: {selectedMovie.vote_average}</p>
        </div>
      )}
    </div>
  );
}

export default App;

