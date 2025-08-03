import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-3 mt-auto">
      <hr />
      <span>
        &copy; {new Date().getFullYear()} MovieBooker &mdash; All Rights Reserved.
      </span>
    </footer>
  );
}
