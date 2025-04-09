import React from "react";
import "../components/BlogCard.css";

const SummaryModal = ({ summary, onClose }) => {
  if (!summary) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Blog Summary</h2>
        <p>{summary}</p>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SummaryModal;
