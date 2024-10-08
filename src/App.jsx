import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./components/MovieList";
import "./App.css";
import ResponsiveAppBar from "./components/NavBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "./themes";
import MovieDetailCarousel from "./components/Carrusel";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Función para alternar el modo
  const mode = (newMode) => {
    setIsDarkMode(newMode);
  };

  // Auto-theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Detecta el tema al cargar la app
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (event) => {
      setIsDarkMode(event.matches);
    };

    // Escucha cambios en las preferencias del sistema
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Fetch movies on app load
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";

  // variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  // const [selectedMovie, setSelectedMovie] = useState({});
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  // Función para buscar películas
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    try {
      const {
        data: { results },
      } = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
        },
      });

      setMovies(results);
      setMovie(results[0]);

      if (results.length) {
        await fetchMovie(results[0].id);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  //TODO arreglar la seleccion de una peli y la proyeccion del trailer.
  // funcion para la peticion de un solo objeto y mostrar en reproductor de videos
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    //return data
    setMovie(data);
  };

  const selectMovie = async (movie) => {
    // const data = await fetchMovie(movie.id)
    // console.log(data);
    // setSelectedMovie(movie)
    fetchMovie(movie.id);

    setMovie(movie);
    window.scrollTo(0, 0);
  };

  // Función para manejar la búsqueda
  const searchMoviesHandler = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <ResponsiveAppBar
          isDarkMode={isDarkMode}
          mode={mode}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          searchMovies={searchMoviesHandler}
        />

        {/* Prueba de Carrusel */}
        <MovieDetailCarousel
          movie={movie}
          movies={movies}
          selectMovie={selectMovie}
          trailer={trailer}
          playing={playing}
          setPlaying={setPlaying}
        />

        {/* Componente MovieList */}
        <div className="container mt-3">
          <MovieList
            movies={movies}
            selectMovie={selectMovie}
            movie={movie}
          />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
