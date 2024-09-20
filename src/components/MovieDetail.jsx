import React from "react";
import YouTube from "react-youtube";

const MovieDetail = ({ movie, playing, trailer, setPlaying }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      {movie ? (
        <div
          className="viewtrailer"
          style={{
            backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
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
                    controls: 0,
                  },
                }}
              />
              <button onClick={() => setPlaying(false)} className="boton">
                Close
              </button>
            </>
          ) : (
            <div className="container">
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
              <h1 className="text-white">{movie.title}</h1>
              <p className="text-white">{movie.overview}</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MovieDetail;
