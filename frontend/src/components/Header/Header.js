import './Header.css'
import NavBar from '../NavBar/NavBar';
import RecipeSearch from '../SearchBar/Search';
import { useSelector } from 'react-redux';

const Header = ({openLoginModal, openSignupModal}) => {
    const loggedIn = useSelector(state => !!state.session.user);
    return(
        <div className="header-container">
            <div className="logo"><h1>grubGlobe</h1></div>
            {loggedIn ? <RecipeSearch /> : null}
            <NavBar openLoginModal={openLoginModal} openSignupModal={openSignupModal}/>
        </div>
    )
};

export default Header;