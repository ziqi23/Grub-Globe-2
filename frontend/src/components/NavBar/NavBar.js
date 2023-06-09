import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./NavBar.css";
import LoginForm from "../SessionForms/LoginForm";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "../SessionForms/SignUpForm";
import { MdExitToApp } from "react-icons/md";
import { login } from "../../store/session";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  if (loggedIn) {
    return (
      <div className="nav-bar">
        <Link to="/discover">
          <div>Discover</div>
        </Link>
        <Link to="/profile">
          <div>Profile</div>
        </Link>
        <Link to="/">
          <div onClick={logoutUser}>
            <MdExitToApp id="logout-icon" />
            Logout
          </div>
        </Link>
      </div>
    );
  } else {
    return (
      <>
        <div className="nav-bar">
          <div onClick={() => setShowSignupModal(true)}>Signup</div>
          <div onClick={() => setShowLoginModal(true)}>Login</div>

        </div>
        {showLoginModal && (
          <Modal onClose={() => setShowLoginModal(false)}>
            <LoginForm
              openSignupModal={() => setShowSignupModal(true)}
              closeLoginModal={() => setShowLoginModal(false)}
            />
          </Modal>
        )}
        {showSignupModal && (
          <Modal onClose={() => setShowSignupModal(false)}>
            <SignupForm
              openLoginModal={() => setShowLoginModal(true)}
              closeSignUpModal={() => setShowSignupModal(false)}
            />
          </Modal>
        )}
      </>
    );
  }
}

export default NavBar;
