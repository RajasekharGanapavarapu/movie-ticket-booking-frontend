import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { useParams, Link } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    API.get(`/movies/${id}`).then((res) => setMovie(res.data));
  }, [id]);

  if (!movie)
    return <div className="container py-4">Loading movie details...</div>;

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-5">
          <img
            src={movie.image}
            alt={movie.name}
            className="img-fluid rounded mb-3"
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-7">
          <h3>{movie.name}</h3>
          <p>{movie.description}</p>
          <span className="badge bg-info">{movie.genre}</span>
          <hr />
          <Link
            to={`/booktickets/${movie._id}`}
            className="btn btn-primary mt-2"
          >
            Book Tickets
          </Link>
        </div>
      </div>
    </div>
  );
}
