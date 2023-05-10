import './Header.css'
import NavBar from '../NavBar/NavBar';

const Header = ({openLoginModal, openSignupModal}) => {
    return(
        <div className="header-container">
            <div className="logo"><h1>grubGlobe</h1></div>
            <NavBar openLoginModal={openLoginModal} openSignupModal={openSignupModal}/>
        </div>
    )
};

export default Header;