const Blog = require("../models/Blog");

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  if (!blogs) return res.status(204).json({ message: "No Blogs found" });
  res.json(blogs);
  console.log(blogs);
};
const getBlog = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Blog ID required" });
  const blog = await Blog.findOne({ _id: req.params.id }).exec();
  if (!blog) {
    return res
      .status(204)
      .json({ message: `Blog ID ${req.params.id} not found` });
  }
  res.json(blog);
  console.log(blog);
};
const createNewBlog = async (req, res) => {
  if (!req?.body?.title || !req?.body?.category || !req?.body?.body) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const result = await Blog.create({
      title: req.body.title,
      category: req.body.category,
      body: req.body.body,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};
const deleteBlog = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Blog ID required" });
  const blog = await Blog.findOne({ _id: req.params.id }).exec();
  if (!blog) {
    return res
      .status(204)
      .json({ message: `Blog ID ${req.params.id} not found` });
  }
  const result = await blog.deleteOne({ _id: req.params.id });
  res.json(result);
  console.log(result);
};

module.exports = {
  getAllBlogs,
  getBlog,
  createNewBlog,
  deleteBlog,
};
