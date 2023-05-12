import './Header.css'
import NavBar from '../NavBar/NavBar';
import RecipeSearch from '../SearchBar/Search';
import { useLocation } from 'react-router-dom';

const Header = ({openLoginModal, openSignupModal}) => {
    const location = useLocation();
    const isRecipePage = location.pathname === '/recipes';

    return(
        <div className="header-container">
            <div className="logo"><h1>grubGlobe</h1></div>
            {isRecipePage && <RecipeSearch />}
            <NavBar openLoginModal={openLoginModal} openSignupModal={openSignupModal}/>
        </div>
    )
};

export default Header;