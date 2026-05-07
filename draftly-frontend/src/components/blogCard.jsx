import { Bookmark, Heart } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

const BlogCard = ({ blogDetails }) => {
  const {
    _id,
    title,
    excerpt,
    author,
    tags,
    category,
    likesCount,
    readTime,
    profilePicture,
  } = blogDetails;

  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentLikesCount, setCurrentLikesCount] = useState(likesCount);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setCurrentLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleCardClick = () => {
    navigate(`/blogs/${_id}`);
  };

  return (
    <article
      className="p-4 border border-neutral-200 rounded relative hover:shadow-xl transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <span className="absolute top-2 right-2 bg-purple-50 border border-purple-500 text-purple-500 px-2 py-0.5 rounded">
        {category}
      </span>

      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-lg text-neutral-700 mb-4">{excerpt}</p>

      <div className="flex items-center justify-between">
        {/* author details */}
        <div className="flex items-center gap-2">
          <img src={profilePicture} className="size-10 rounded-full" />
          <h4 className="text-lg font-semibold">{author}</h4>
        </div>

        {/* like and save functionality */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            className={`p-1 rounded transition-colors ${
              isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          </button>

          <span className="text-sm text-gray-600 min-w-[20px]">
            {currentLikesCount}
          </span>

          <button
            onClick={handleSave}
            className={`p-1 rounded transition-colors ${
              isSaved ? 'text-blue-500 hover:text-blue-600' : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
