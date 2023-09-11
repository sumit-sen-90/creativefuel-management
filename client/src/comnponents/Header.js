import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedin") === "true";
  const handleLogout = () => {
    localStorage.removeItem("isLoggedin");
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className={styles.navbar_container}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Navbar.Brand>
              <Link to="/dashboard" className={`nav-link ${styles.nav_item}`}>
                Dashboard
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to={"/user-form"} className={`nav-link ${styles.nav_item}`}>
                Create User
              </Link>
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          {isLoggedIn ? (
            <Nav.Link
              onClick={handleLogout}
              className={`nav-link ${styles.nav_item}`}
            >
              Logout
            </Nav.Link>
          ) : null}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
