const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      require: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters"],
    },
    expert: {
      type: String,
      maxlength: [200, "Expert cannot exceed 200 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    featuredImage: {
      type: String,
      default: "https://placehold.co/800x400",
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    category: {
      type: String,
      enum: ["Technology", "Lifestyle", "Travel", "Food", "Education", "Other"],
      default: "Other",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },

    readTime: {
      type: Number,
      default: function () {
        const wordsPerMinute = 200;
        const wordCount = this.content.split(" ").length;
        return Math.ceil(wordCount / wordsPerMinute);
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
