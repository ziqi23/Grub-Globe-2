import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './NavBar.css'
import logoutIcon from '../../assets/icons/general-icons/icons8-log-out-24.png'

function NavBar ({openLoginModal, openSignupModal}) {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  if (loggedIn) {
    return (
      <div className="nav-bar">
        <Link to="#"><div>link 1</div></Link>
        <Link to="#"><div>link 2</div></Link>
        <Link to="/profile"><div>Profile</div></Link>
        <Link to="/"><div onClick={logoutUser}><img src={logoutIcon} alt="logout icon" />Logout</div></Link>

      </div>
    );
  } 
  else {
    return (
      <div className="nav-bar">
          <div onClick={openSignupModal}>Signup</div>
          <div onClick={openLoginModal}>Login</div>
      </div>
    );
  }
}

export default NavBar;