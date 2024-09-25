import React, { useState } from "react";
import YouTube from "react-youtube";

const MovieDetailCarrusel = ({
  movie,
  movies = [],
  selectMovie,
  playing,
  trailer,
  setPlaying,
}) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  // Variable para controlar el índice actual usando el estado de React
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para manejar el botón "anterior"
  const handleClickPrev = () => {
    if (currentIndex > 0) {
      selectMovie(movies[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1); // Decrementar el índice
      console.log(movies);
    } else {
      console.log("Ya estás en la primera película.");
    }
  };

  // Función para manejar el botón "siguiente"
  const handleClickNext = () => {
    if (currentIndex < movies.length - 1) {
      selectMovie(movies[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1); // Incrementar el índice
    } else {
      console.log("Ya estás en la última película.");
    }
  };


  return (
    <div
      id="carousel"
      className="carousel-section carousel-dark slide"
      data-bs-ride="carousel"
    >
      <div
        id="carouselExampleCaptions"
        className="carousel carousel-dark slide"
      >
        <div className="carousel-indicators">
          {movies.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {movie ? (
            <div
              className="viewtrailer carousel-item active"
              style={{
                minHeight: 700,
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
                backgroundSize: "cover", // Ajusta la imagen para que cubra el contenedor
                backgroundPosition: "center", // Centra la imagen
                backgroundRepeat: "no-repeat", // Evita la repetición de la imagen
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 1,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">
                    Close
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="">
                    {trailer ? (
                      <button
                        className="boton"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Sorry, no trailer available"
                    )}
                    <div className="carousel-caption d-none d-md-block">
                      <h1 className="text-white">{movie.title}</h1>
                      <p className="text-white">{movie.overview}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Controles del carrusel */}
        <button
          className="carousel-control-prev"
          type="button"
          onClick={handleClickPrev} // Llamar directamente a la función
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={handleClickNext} // Llamar directamente a la función
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default MovieDetailCarrusel;
