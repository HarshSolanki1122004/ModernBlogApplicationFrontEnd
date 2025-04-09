import React, { useEffect, useState } from "react";
import APII from "../utils/apii";
import { toast } from "react-toastify";
import "../components/MyBlogs.css";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [editBlogId, setEditBlogId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedAuthor, setEditedAuthor] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const fetchUserBlogs = async () => {
    try {
      const res = await APII.get(`/users/${userId}/blogs`);
      setBlogs(res.data);
    } catch (error) {
      toast.error("Failed to fetch your blogs.");
      console.error(error);
    }
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await APII.delete(`/blogs/${blogId}`);
      toast.success("Blog deleted!");
      fetchUserBlogs(); // refresh
    } catch (error) {
      toast.error("Failed to delete blog.");
      console.error(error);
    }
  };

  const startEdit = (blog) => {
    setEditBlogId(blog.id);
    setEditedTitle(blog.title);
    setEditedContent(blog.content);
    setEditedAuthor(blog.author);
  };

  const cancelEdit = () => {
    setEditBlogId(null);
    setEditedTitle("");
    setEditedContent("");
    setEditedAuthor("");
  };

  const handleUpdate = async (blogId) => {
    try {
      await APII.put(`/blogs/${blogId}`, {
        title: editedTitle,
        content: editedContent,
        author: editedAuthor,
        userId: userId,
      });
      toast.success("Blog updated!");
      cancelEdit();
      fetchUserBlogs();
    } catch (error) {
      toast.error("Failed to update blog.");
      console.error(error);
    }
  };

  return (
    <div className="myblogs-container">
      <h2>My Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs created yet.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="myblog-card">
            {editBlogId === blog.id ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="edit-input"
                  placeholder="Edit Title"
                />
                <input
                  type="text"
                  value={editedAuthor}
                  onChange={(e) => setEditedAuthor(e.target.value)}
                  className="edit-input"
                  placeholder="Edit Author"
                />
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="edit-textarea"
                  placeholder="Edit Content"
                />
                <div className="btn-group">
                  <button
                    onClick={() => handleUpdate(blog.id)}
                    className="btn update"
                  >
                    Save
                  </button>
                  <button onClick={cancelEdit} className="btn cancel">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <p className="author-line">Author: {blog.author}</p>
                <div className="btn-group">
                  <button onClick={() => startEdit(blog)} className="btn edit">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="btn delete"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyBlogs;
