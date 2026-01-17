const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");

// CREATE
router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch {
    res.status(404).json({ error: "Blog not found" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: "Invalid update request" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(400).json({ error: "Delete failed" });
  }
});

module.exports = router;
