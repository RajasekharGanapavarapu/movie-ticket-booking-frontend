import React, { useEffect, useState } from "react";
import API from "../../../utils/api";

export default function BookTickets({ movieId }) {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState("");
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [msg, setMsg] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get(`/shows/movie/${movieId}`).then((res) => setShows(res.data));
  }, [movieId]);

  useEffect(() => {
    if (selectedShow) {
      const show = shows.find((s) => s._id === selectedShow);
      setSeats(show ? show.availableSeats : []);
    } else {
      setSeats([]);
    }
    setSelectedSeats([]);
  }, [selectedShow, shows]);

  const handleBooking = async () => {
    if (!selectedShow || selectedSeats.length === 0) {
      setMsg("Please select a show and seats.");
      return;
    }
    try {
      await API.post("/bookings", {
        user: user.id,
        show: selectedShow,
        seats: selectedSeats,
      });
      setMsg("Booking successful!");
    } catch (err) {
      setMsg("Booking failed. Try again.");
    }
  };

  return (
    <div>
      <h4>Select Show</h4>
      <select
        className="form-select mb-3"
        value={selectedShow}
        onChange={(e) => setSelectedShow(e.target.value)}
      >
        <option value="">Select show</option>
        {shows.map((show) => (
          <option value={show._id} key={show._id}>
            {show.city} - {show.theatre}, {show.date} {show.time}
          </option>
        ))}
      </select>
      {seats.length > 0 && (
        <>
          <h5>Select Seats</h5>
          <div className="mb-3">
            {seats.map((seat) => (
              <button
                key={seat}
                className={`btn btn-sm m-1 ${
                  selectedSeats.includes(seat)
                    ? "btn-success"
                    : "btn-outline-secondary"
                }`}
                onClick={() =>
                  setSelectedSeats((prev) =>
                    prev.includes(seat)
                      ? prev.filter((s) => s !== seat)
                      : [...prev, seat]
                  )
                }
              >
                {seat}
              </button>
            ))}
          </div>
          <button className="btn btn-primary" onClick={handleBooking}>
            Book Selected Seats
          </button>
        </>
      )}
      <div className="mt-3">{msg}</div>
    </div>
  );
}
