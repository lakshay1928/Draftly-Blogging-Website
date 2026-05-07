import { useEffect, useState } from "react";
import { Bookmark, Heart, Edit, LogOut, User, Calendar, Mail } from "lucide-react";
import BlogCard from "../components/blogCard";
import { useNavigate } from "react-router";
import blogs from "../data/blogs";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("myBlogs");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData && token) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Use existing blogs data for demonstration - replace with actual API calls
      setTimeout(() => {
        // Filter blogs that would belong to the current user (mock implementation)
        const myBlogs = blogs.filter((blog, index) => index < 2).map(blog => ({
          ...blog,
          author: parsedUser.username || blog.author,
          profilePicture: parsedUser.profilePicture || blog.profilePicture
        }));
        
        // Filter blogs that would be saved by the current user (mock implementation)
        const savedBlogList = blogs.filter((blog, index) => index >= 2);
        
        setUserBlogs(myBlogs);
        setSavedBlogs(savedBlogList);
        setIsLoading(false);
      }, 1000);
    } else {
      // Redirect to login if not authenticated
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return (
      <main>
        <section className="min-h-screen">
          <div className="container mx-auto px-2 py-10">
            <div className="text-center">
              <p>Loading profile...</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-2 py-10">
          {/* Profile Header */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                  <img
                    src={user.profilePicture || "https://placehold.co/150"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-gray-200"
                  />
                </div>

                {/* User Info */}
                <div className="flex-grow text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                  <p className="text-gray-600 mb-4 flex items-center justify-center md:justify-start gap-2">
                    <Mail size={16} />
                    {user.email}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {user.bio || "Passionate writer and technology enthusiast. Love sharing knowledge and learning from others."}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-2">
                    <Calendar size={14} />
                    Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Edit size={16} />
                    Edit Profile
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{userBlogs.length}</div>
                <div className="text-gray-600">My Blogs</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{savedBlogs.length}</div>
                <div className="text-gray-600">Saved Blogs</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {userBlogs.reduce((acc, blog) => acc + blog.likesCount, 0)}
                </div>
                <div className="text-gray-600">Total Likes</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md">
              {/* Tab Headers */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("myBlogs")}
                    className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                      activeTab === "myBlogs"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <User size={18} />
                      My Blogs
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("savedBlogs")}
                    className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                      activeTab === "savedBlogs"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Bookmark size={18} />
                      Saved Blogs
                    </div>
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {isLoading ? (
                  <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                  </div>
                ) : (
                  <>
                    {activeTab === "myBlogs" && (
                      <div>
                        {userBlogs.length > 0 ? (
                          <div className="space-y-4">
                            {userBlogs.map((blog) => (
                              <BlogCard key={blog._id} blogDetails={blog} />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-10">
                            <div className="text-gray-400 mb-4">
                              <User size={48} className="mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
                            <p className="text-gray-600 mb-4">
                              Start sharing your thoughts with the world!
                            </p>
                            <button
                              onClick={() => navigate("/blogs/create")}
                              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Write Your First Blog
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "savedBlogs" && (
                      <div>
                        {savedBlogs.length > 0 ? (
                          <div className="space-y-4">
                            {savedBlogs.map((blog) => (
                              <BlogCard key={blog._id} blogDetails={blog} />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-10">
                            <div className="text-gray-400 mb-4">
                              <Bookmark size={48} className="mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No saved blogs</h3>
                            <p className="text-gray-600">
                              Save blogs you love to read them later!
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
