import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route location

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Check if the current route includes "/admin"
  const isAdminRoute = location.pathname.includes("/admin");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <Link className="navbar-brand" to="/">
        <img
          src="https://www.swarnandhra.ac.in/img/footer/swarnandhra-logo-C.png"
          alt="Logo"
          width="30"
          height="30"
        />
        Swarnandhra College of Engineering and Technology
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/history">
                  History
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  {user.username} (Reg No: {user.rollNo})
                </span>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            // Only show Register and Login if the route is not an admin route
            !isAdminRoute && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;