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

  const handleClickPrev = () => {
    console.log(movies);
    console.log('clickPrev')
  };
  
  const handleClickNext = () => {
    console.log(movies);
    console.log('clickNext')
  };

  useEffect(() => {
    if (movie) {
      // Aquí puedes realizar cualquier acción adicional si es necesario
    }
  }, [movie]);

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
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
          onClick={() => {
            handleClickPrev();
          }}
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
          onClick={() => {
            handleClickNext();
          }}
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
