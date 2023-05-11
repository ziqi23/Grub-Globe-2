import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './NavBar.css'
import logoutIcon from '../../assets/icons/general-icons/icons8-log-out-24.png'
import Header from "../Header/Header";
import LoginForm from "../SessionForms/LoginForm";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "../SessionForms/SignUpForm";

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  

  if (loggedIn) {
    return (
      <div className="nav-bar">
        <Link to="#"><div>link 1</div></Link>
        <Link to="#"><div>link 2</div></Link>
        <Link to="#"><div>Profile</div></Link>
        <Link to="/"><div onClick={logoutUser}><img src={logoutIcon} alt="logout icon" />Logout</div></Link>

      </div>
    );
  } 
  else {
    return (
      <>
        <div className="nav-bar">
            <div onClick={() => setShowSignupModal(true)}>Signup</div>
            <div onClick={() => setShowLoginModal(true)}>Login</div>
        </div>
        {showLoginModal && (
          <Modal onClose={() => setShowLoginModal(false)}>
            <LoginForm openSignupModal={() => setShowSignupModal(true)}
              closeLoginModal={() => setShowLoginModal(false)} />
          </Modal>
        )}
        {showSignupModal && (
          <Modal onClose={() => setShowSignupModal(false)}>
            <SignupForm openLoginModal={() => setShowLoginModal(true)}
              closeSignUpModal={() => setShowSignupModal(false)} />
          </Modal>
        )}
      </>
    );
  }
}

export default NavBar;