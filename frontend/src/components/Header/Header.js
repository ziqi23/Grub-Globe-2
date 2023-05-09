import './Header.css'
import NavBar from '../NavBar/NavBar';

const Header = (props) => {
    return(
        <div className="header-container">
            <div className="logo"><h1>grubGlobe</h1></div>
            <NavBar />
        </div>
    )
};

export default Header;