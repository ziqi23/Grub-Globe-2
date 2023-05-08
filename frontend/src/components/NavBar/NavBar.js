import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './NavBar.css'

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  if (loggedIn) {
    return (
      <div className="nav-bar">
        <Link to="#">link 1</Link>
        <Link to="#">Profile</Link>
        <button onClick={logoutUser}>Logout</button>

      </div>
    );
  } 
  else {
    return (
      <div className="nav-bar">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
      </div>
    );
  }
}

export default NavBar;