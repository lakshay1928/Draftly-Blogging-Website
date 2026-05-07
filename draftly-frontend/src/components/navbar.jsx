import { Link, NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { User, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (userData && token) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="py-4">
      <div className="container mx-auto px-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold italic">
            <Link to="/">Draftly</Link>
          </h1>

          <nav>
            <ul className="flex gap-4">
              <li>
                <NavLink to="/" className="text-lg">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/blogs" className="text-lg">
                  Blogs
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/profile" className="text-lg">
                    Profile
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>

          <div className="flex gap-2 items-center">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="text-sm font-medium">{user.username}</span>
                </div>
                <button
                  className="text-base bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-1 rounded-full flex items-center gap-1"
                  onClick={handleLogout}
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  className="text-base bg-neutral-800 hover:bg-neutral-700 transition-colors text-white px-4 py-1 rounded-full"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="text-base bg-neutral-200 hover:bg-neutral-300 transition-colors text-black px-4 py-1 rounded-full"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
