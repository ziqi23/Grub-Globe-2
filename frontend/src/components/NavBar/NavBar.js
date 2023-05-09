import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './NavBar.css'
import logoutIcon from '../../assets/icons/general-icons/icons8-log-out-24.png'

function NavBar ({openModal}) {
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
        <Link to="#"><div>Profile</div></Link>
        <div onClick={logoutUser}><img src={logoutIcon} alt="logout icon" />Logout</div>

      </div>
    );
  } 
  else {
    return (
      <div className="nav-bar">
          <Link to={'/signup'}>Signup</Link>
          <div onClick={openModal}>Login</div>
      </div>
    );
  }
}

export default NavBar;