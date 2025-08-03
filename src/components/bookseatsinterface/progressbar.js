import React from "react";
import { useParams } from "react-router-dom";
import BookTickets from "./bookingcomponents/booktickets";

export default function ProgressBarComponent() {
  const { id } = useParams();
  return (
    <div className="container py-4">
      <div className="mb-4">
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: "100%" }}
          >
            Booking Step
          </div>
        </div>
      </div>
      <BookTickets movieId={id} />
    </div>
  );
}
