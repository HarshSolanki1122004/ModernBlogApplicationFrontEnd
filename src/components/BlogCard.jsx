import React from "react";
import "../components/BlogCard.css";
import { FaEdit, FaTrashAlt, FaBookOpen, FaEye } from "react-icons/fa";

const BlogCard = ({ blog, onEdit, onDelete, onSummary, onView, isMyBlog }) => {
  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <p>
        <strong>Author:</strong> {blog.author}
      </p>
      <p className="blog-content">{blog.content.slice(0, 150)}...</p>

      <div className="card-actions">
        <button className="summary-btn" onClick={() => onSummary(blog.id)}>
          <FaBookOpen /> Summary
        </button>

        <button className="view-btn" onClick={() => onView(blog.id)}>
          <FaEye /> View
        </button>

        {isMyBlog && (
          <>
            <button className="edit-btn" onClick={() => onEdit(blog)}>
              <FaEdit /> Edit
            </button>
            <button className="delete-btn" onClick={() => onDelete(blog.id)}>
              <FaTrashAlt /> Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
