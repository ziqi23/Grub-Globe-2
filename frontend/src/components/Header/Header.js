import "./Header.css";
import NavBar from "../NavBar/NavBar";
import RecipeSearch from "../SearchBar/Search";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = ({ openLoginModal, openSignupModal }) => {
  const location = useLocation();
  const history = useHistory();
  const isRecipePage = location.pathname === "/recipes";

  return (
    <div className="header-container">
      <div onClick={() => history.push("/")} className="logo">
        <h1>grubGlobe</h1>
      </div>
      {isRecipePage && <RecipeSearch />}
      <NavBar
        openLoginModal={openLoginModal}
        openSignupModal={openSignupModal}
      />
    </div>
  );
};

export default Header;
