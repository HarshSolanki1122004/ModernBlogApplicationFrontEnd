import React, { useState } from "react";
import APII from "../utils/apii";
import { toast } from "react-toastify";
import "../components/CreateBlog.css";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(localStorage.getItem("author") || "");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author) {
      toast.error("Title, Content, and Author cannot be empty");
      return;
    }

    try {
      await APII.post("/blogs", {
        title,
        content,
        author,
        userId,
      });

      toast.success("Blog Published!");
      setTitle("");
      setContent("");
      navigate("/home");
    } catch (error) {
      toast.error("Failed to publish blog");
      console.error("Create blog error", error);
    }
  };

  return (
    <div className="create-blog-container">
      <form className="create-blog-card" onSubmit={handleSubmit}>
        <h2>Create New Blog</h2>

        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="blog-input"
        />

        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="blog-textarea"
        />

        <input
          type="text"
          placeholder="Enter author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="blog-input"
        />

        <button type="submit" className="publish-btn">
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
