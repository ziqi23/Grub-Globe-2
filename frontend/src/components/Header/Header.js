import './Header.css'
import NavBar from '../NavBar/NavBar';
import RecipeSearch from '../SearchBar/Search';
import { useLocation } from 'react-router-dom';

const Header = ({openLoginModal, openSignupModal}) => {
    const location = useLocation();
    const show = location.pathname !== '/explore' && location.pathname !== '/';
    console.log(show)

    return(
        <div className="header-container">
            <div className="logo"><h1>grubGlobe</h1></div>
            {show && <RecipeSearch />}
            <NavBar openLoginModal={openLoginModal} openSignupModal={openSignupModal}/>
        </div>
    )
};

export default Header;