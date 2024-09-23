import React, { useEffect } from "react";
import YouTube from "react-youtube";

const MovieDetailCarrusel = ({
  movie,
  movies = [],
  playing,
  trailer,
  setPlaying,
}) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    if (movie) {
      // Aquí puedes realizar cualquier acción adicional si es necesario
    }
  }, [movie]);
  

  return (
    <div
      id="carousel col-12"
      className="carousel-section carousel-dark slide"
      data-bs-ride="carousel"
    >
      <div
        id="carouselExampleCaptions"
        className="carousel carousel-dark slide"
      >
        <div className="carousel-indicators">
          {movies.map((movie, index) => (
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
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`viewtrailer carousel-item ${
                index === 0 ? "active" : ""
              }`}
            >
              <img
                src={`${IMAGE_PATH}${movie.backdrop_path}`}
                className="d-block w-100"
                alt={movie.title}
                style={{ minHeight: "600px", objectFit: "cover" }}
              />
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
                        controls: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">
                    Close
                  </button>
                </>
              ) : (
                <div className="container carousel-caption d-none d-md-block">
                  {trailer ? (
                    <button
                      className="boton"
                      onClick={() => setPlaying(true)}
                      type="button"
                    >
                      Play Trailer
                    </button>
                  ) : (
                    <p>Sorry, no trailer available</p>
                  )}
                  <h1 className="text-white">{movie.title}</h1>
                  <p className="text-white">{movie.overview}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controles del carrusel */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
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
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
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
