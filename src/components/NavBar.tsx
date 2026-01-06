import { Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AuthButton from "./NavBarButton";
import Dropdown from "./Dropdown";
import { useAuth } from "../auth/useAuth";

interface NavBarProps {
  selectedCategory?: string;
  onCategorySelect?: (value: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isHome = location.pathname === "/";
  const { user } = useAuth();

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm py-3">
      <div className="container">
        <Navbar.Brand href="/" className="fw-bold">
          {" "}
          MyStore{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link href="/" className="fw-semibold">
              {" "}
              Home{" "}
            </Nav.Link>
            {!isLogin && !isRegister && (
              <Nav.Link href="/cart" className="fw-semibold">
                {" "}
                Cart{" "}
              </Nav.Link>
            )}
            {user ? (
              <Nav.Link href="/profile" className="fw-semibold">
                {" "}
                Profile{" "}
              </Nav.Link>
            ) : (
              <Nav.Link href="/login" className="fw-semibold">
                {" "}
                Profile{" "}
              </Nav.Link>
            )}
            {user && (
              <Nav.Link href="/product-editor" className="fw-semibold">
                {" "}
                Edit Products{" "}
              </Nav.Link>
            )}
            {isHome && (
              <div className="ms-3">
                <Dropdown
                  selected={selectedCategory}
                  onChange={(value) => onCategorySelect?.(value)}
                />
              </div>
            )}
            <div className="ms-3">
              {" "}
              <AuthButton />{" "}
            </div>{" "}
          </Nav>{" "}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
