const express = require("express");

const {
  upload,
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleLikeBlog,
} = require("../controllers/blog");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", authMiddleware, upload.single("image"), createBlog);
router.get("/:id", getBlogById);
router.put("/:id", authMiddleware, upload.single("image"), updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);
router.patch("/like-blog/:id", authMiddleware, toggleLikeBlog);

module.exports = router;
