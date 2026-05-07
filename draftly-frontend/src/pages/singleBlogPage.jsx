import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import blogs from "../data/blogs";
import { Bookmark, Heart } from "lucide-react";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [singleBlog, setSingleBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBlogs = () => {
      setIsLoading(true);
      setTimeout(() => {
        const blogFound = blogs.find((el) => el._id == blogId);
        setSingleBlog(blogFound);
        setIsLoading(false);
      }, 1000);
    };
    fetchBlogs();
  }, []);

  if (isLoading)
    return (
      <main>
        <section className="min-h-screen">
          <div className="container mx-auto px-2">
            <LoadingComponent />
          </div>
        </section>
      </main>
    );

  if (!singleBlog) {
    return (
      <main>
        <section className="min-h-screen">
          <div className="container mx-auto px-2 py-10">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
              <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist.</p>
              <button
                onClick={() => navigate("/blogs")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Blogs
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const {
    author,
    category,
    content,
    excerpt,
    featuredImage,
    isPublished,
    likes,
    likesCount,
    profilePicture,
    readTime,
    tags,
    title,
  } = singleBlog;

  return (
    <main>
      <section className="min-h-screen">
        <div className="container mx-auto px-2">
          <div className="py-12">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-6">
              {title}
            </h1>
            <div className="p-4 rounded bg-blue-50 border border-blue-200 text-blue-800 mb-4">
              <p>{excerpt}</p>
            </div>

            {/* controls */}
            <div className="flex items-center justify-between gap-3 mb-4">
              {/* like functionality */}
              <div className="flex items-center gap-1">
                <button>
                  <Bookmark />
                </button>

                <button>
                  <Heart />
                </button>
                <p>{likesCount}</p>
              </div>

              {/* author details */}
              <div className="flex items-center gap-2">
                <img src={profilePicture} className="size-10 rounded-full" />
                <h4 className="text-lg font-semibold">{author}</h4>
              </div>
            </div>

            <div
              className="blog-content-container"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleBlogPage;

const LoadingComponent = () => {
  return (
    <article role="status" className="p-4 animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      <span className="sr-only">Loading...</span>
    </article>
  );
};
