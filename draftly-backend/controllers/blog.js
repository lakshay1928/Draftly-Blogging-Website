const Blog = require("../models/Blog");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Draftly-images",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [
      { width: 1200, height: 600, crop: "limit" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  },
});

const fileFilter = (req, file, cb) => {
  // check if the file is an image
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

const getPublicIdFromUrl = (url) => {
  if (!url || url.includes("placehold.co")) return null;

  try {
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    const publicId = filename.split(".")[0];
    return `blog-image/${publicId}`;
  } catch (error) {
    console.error("Error extracting public_id", error);
    return null;
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({ isPublished: true })
      .populate("author", "username profilePicture")
      .select("-content")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments({ isPublished: true });

    res.status(200).json({
      success: true,
      msg: "Successfully fetching all blogs",
      blogs: blogs,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(totalBlogs / limit),
        totalBlogs: totalBlogs,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, content, expert, tags, category } = req.body;

    let featuredImageUrl = "https://placehold.co/800x400";

    console.log(req.file);

    if (req.file) {
      featuredImageUrl = req.file.path;
    }

    const blog = new Blog({
      title,
      content,
      expert,
      author: req.user._id,
      featuredImage: featuredImageUrl,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : ["general"],
      category,
    });

    await blog.save();
    await blog.populate("author", "username profilePicture");

    res.status(201).json({ success: true, msg: "New blog created", blog });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const blog = await Blog.findById(blogId).populate(
      "author",
      "username profilePicture"
    );

    if (!blog) {
      return res.status(404).json({ success: true, msg: "Blog not found" });
    }

    res.status(200).json({
      success: true,
      msg: "Single blog fetched",
      blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateBlog = async (req, res) => {};

const deleteBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ success: true, msg: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, msg: "Not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(blogId);

    res.status(200).json({ success: true, msg: "Blog Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const toggleLikeBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;

    const blog = await Blog.findById(blogId);
    const user = await User.findById(req.user._id);

    if (!blog) {
      return res.status(404).json({ success: true, msg: "Blog not found" });
    }

    const isLiked = blog.likes.includes(req.user._id);

    if (isLiked) {
      // unlike the blog
      blog.likes.pull(req.user._id);
      user.likedBlogs.pull(blog._id);
      blog.likesCount = Math.max(0, blog.likesCount - 1);
    } else {
      // like the blog
      blog.likes.push(req.user._id);
      user.likedBlogs.push(blog._id);
      blog.likesCount += 1;
    }

    await blog.save();
    await user.save();
    res.status(200).json({
      success: true,
      msg: isLiked ? "Blog UnLiked" : "Blog liked",
      isLiked: !isLiked,
      likesCount: blog.likesCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  upload,
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,

  toggleLikeBlog,
};
