import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Nav = styled.nav`
  background-color: #343a40;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.25rem;
  color: #fff;
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  img {
    margin-right: 0.5rem;
  }
`;

const Toggler = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.25rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Use a transient prop ($isOpen) so it is not passed to the DOM element.
const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    /* Toggle display based on the $isOpen prop */
    display: ${props => (props.$isOpen ? "flex" : "none")};
  }
`;

const NavItem = styled.li`
  list-style: none;
  margin-left: 1rem;

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const NavLinkStyled = styled(Link)`
  color: #fff;
  font-weight: 500;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: color 0.3s ease, background-color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const NavText = styled.span`
  color: #fff;
  font-weight: 500;
  padding: 0.5rem 1rem;
`;

const NavButton = styled.button`
  margin-left: 0.5rem;
  background: none;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.375rem 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 0.5rem;
    width: 100%;
  }
`;

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route location
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Check if the current route includes "/admin"
  const isAdminRoute = location.pathname.includes("/admin");

  // Toggle menu on small devices
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <Nav>
      <Brand to="/">
        <img
          src="https://www.swarnandhra.ac.in/img/footer/swarnandhra-logo-C.png"
          alt="Logo"
          width="30"
          height="30"
        />
        Swarnandhra College of Engineering and Technology
      </Brand>

      {/* Hamburger button for small devices */}
      <Toggler onClick={toggleMenu} aria-label="Toggle navigation">
        &#9776;
      </Toggler>

      <NavMenu $isOpen={menuOpen}>
        {user ? (
          <>
            <NavItem>
              <NavLinkStyled to="/history" onClick={() => setMenuOpen(false)}>
                History
              </NavLinkStyled>
            </NavItem>
            <NavItem>
              <NavText>
                {user.username} (Reg No: {user.rollNo})
              </NavText>
            </NavItem>
            <NavItem>
              <NavButton
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </NavButton>
            </NavItem>
          </>
        ) : (
          // Only show Register and Login if the route is not an admin route
          !isAdminRoute && (
            <>
              <NavItem>
                <NavLinkStyled to="/register" onClick={() => setMenuOpen(false)}>
                  Register
                </NavLinkStyled>
              </NavItem>
              <NavItem>
                <NavLinkStyled to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </NavLinkStyled>
              </NavItem>
            </>
          )
        )}
      </NavMenu>
    </Nav>
  );
};

export default Navbar;
