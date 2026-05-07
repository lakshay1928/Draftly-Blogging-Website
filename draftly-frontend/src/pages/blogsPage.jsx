import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import BlogCard from "../components/blogCard";

import blogs from "../data/blogs";

const BlogsPage = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    const fetchBlogs = () => {
      setIsLoading(true);
      setTimeout(() => {
        setLatestBlogs(blogs);
        setIsLoading(false);
      }, 1000);
    };
    fetchBlogs();
  }, []);

  return (
    <main>
      <section className="min-h-screen">
        {/* Search bar */}
        <div className="py-18 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="container mx-auto px-2">
            <form>
              <div className="relative max-w-lg mx-auto">
                <input
                  type="text"
                  placeholder="search blogs..."
                  className="border border-neutral-300 py-2 px-4 w-full bg-white text-black"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Search />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="container mx-auto px-2">
          {/* filter form */}
          {/* list of blogs */}

          {isLoading ? (
            <div className="py-10 grid gap-4">
              <LoadingComponent />
            </div>
          ) : (
            <>
              <div className="py-10 grid gap-4">
                {latestBlogs.map((el) => {
                  return <BlogCard key={el._id} blogDetails={el} />;
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogsPage;

const LoadingComponent = () => {
  return (
    <article
      role="status"
      class="p-4 border border-neutral-200 rounded animate-pulse"
    >
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      <span class="sr-only">Loading...</span>
    </article>
  );
};
