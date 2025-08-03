import React, { useEffect, useState } from "react";
import API from "../../utils/api";

export default function FAQ() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    API.get("/feedback").then((res) => setFeedbacks(res.data));
  }, []);

  return (
    <div className="container py-4">
      <h3>Frequently Asked Questions</h3>
      <ul className="list-group mt-3">
        {feedbacks.length === 0 && (
          <li className="list-group-item text-muted">No FAQs yet.</li>
        )}
        {feedbacks.map((fb) => (
          <li key={fb._id} className="list-group-item">
            <strong>{fb.user?.username || "Anonymous"}:</strong> {fb.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
