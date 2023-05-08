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
      <button onClick={logoutUser}>Logout</button>
    );
  } 
  else {
    return (
      <div className="nav-bar">
        {/* <div> */}
          <Link to="#">link 1</Link>
          <Link to="#">link 2</Link>
        {/* </div>
        <div> */}
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        {/* </div> */}
      </div>
    );
  }
}

export default NavBar;