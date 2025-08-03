import React, { useEffect, useState } from "react";
import API from "../../../utils/api";
import { useParams } from "react-router-dom";

export default function UserProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get(`/users/${id}/profile`).then((res) => setProfile(res.data));
  }, [id]);

  if (!profile)
    return <div className="container py-4">Loading profile...</div>;

  return (
    <div className="container py-4">
      <h3>User Profile</h3>
      <div className="mb-3">
        <strong>Username:</strong> {profile.user.username}
        <br />
        <strong>Email:</strong> {profile.user.email}
      </div>
      <h4>Bookings</h4>
      <ul className="list-group">
        {profile.bookings.length === 0 && (
          <li className="list-group-item">No bookings yet.</li>
        )}
        {profile.bookings.map((b) => (
          <li key={b._id} className="list-group-item">
            <strong>{b.show.movie.name}</strong> <br />
            <span>
              {b.show.city} - {b.show.theatre}, {b.show.date} {b.show.time}
            </span>
            <br />
            <span>Seats: {b.seats.join(", ")}</span>
            <br />
            <span className="text-muted">
              Booked at: {new Date(b.bookedAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
