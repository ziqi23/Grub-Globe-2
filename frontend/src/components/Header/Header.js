import './Header.css'
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Header = ({openLoginModal, openSignupModal}) => {
    const history = useHistory();
    
    return(
        <div className="header-container">
            <div className="logo" onClick={() => history.push("/")} ><h1>grubGlobe</h1></div>
            <NavBar openLoginModal={openLoginModal} openSignupModal={openSignupModal}/>
        </div>
    )
};

export default Header;