
import {DownloadMovie} from "../components/downloads";
const MovieCard = ({ movie, onClick }) => {
    return (
        <div className="moviecard" onClick={onClick}>

            <img
                src={movie.backdropUrl || movie.posterUrl}
                alt={movie.title}
            />

            <div className="rate">
                ⭐ {movie.rating ?? "N/A"}
            </div>

            <div>
                <h3>{movie.title}</h3>

                <h6>{movie.genre}</h6>

                <button className="download" onClick={()=>DownloadMovie(movie.id)}>
                    ⬇ Download
                </button>
            </div>

        </div>
    );
};

export { MovieCard };