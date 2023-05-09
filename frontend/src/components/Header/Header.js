import './Header.css'
import NavBar from '../NavBar/NavBar';

const Header = ({openModal}) => {
    return(
        <div className="header-container">
            <div className="logo"><h1>grubGlobe</h1></div>
            <NavBar openModal={openModal}/>
        </div>
    )
};

export default Header;