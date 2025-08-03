import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import { Link } from "react-router-dom";

const GENRES = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"];

function Carousel({ movies }) {
  return (
    <div id="movieCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
      <div className="carousel-inner">
        {movies.slice(0, 3).map((movie, idx) => (
          <div key={idx} className={`carousel-item${idx === 0 ? " active" : ""}`}>
            <img
              src={movie.image}
              className="d-block w-100"
              alt={movie.name}
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>{movie.name}</h5>
              <p>{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#movieCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#movieCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}

function GenreDropdown({ selected, setSelected }) {
  return (
    <select
      className="form-select w-auto mb-3"
      value={selected}
      onChange={e => setSelected(e.target.value)}
    >
      <option value="">All Genres</option>
      {GENRES.map(genre => (
        <option value={genre} key={genre}>{genre}</option>
      ))}
    </select>
  );
}

export default function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    API.get("/movies").then(res => setMovies(res.data));
  }, []);

  const filtered = movies.filter(
    m =>
      (!genre || m.genre === genre) &&
      (!search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4">Welcome to MovieBooker!</h2>
      <Carousel movies={movies} />
      <div className="d-flex mb-3">
        <GenreDropdown selected={genre} setSelected={setGenre} />
        <input
          type="text"
          className="form-control ms-3"
          placeholder="Search movies..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="row">
        {filtered.map(movie => (
          <div className="col-md-4 mb-4" key={movie._id}>
            <div className="card h-100 shadow">
              <img
                src={movie.image}
                className="card-img-top"
                alt={movie.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <p className="card-text">{movie.description.slice(0, 90)}...</p>
                <span className="badge bg-info">{movie.genre}</span>
              </div>
              <div className="card-footer">
                <Link
                  to={`/moviedetails/${movie._id}`}
                  className="btn btn-primary w-100"
                >
                  View & Book
                </Link>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-12 text-center text-muted py-4">No movies found</div>
        )}
      </div>
    </div>
  );
}
