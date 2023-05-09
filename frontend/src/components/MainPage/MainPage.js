import Header from "../Header/Header";
import LoginForm from "../SessionForms/LoginForm";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "../SessionForms/SignUpForm";
import { useSelector } from "react-redux";

function MainPage() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const loggedIn = useSelector(state => !!state.session.user);


    if (!loggedIn) {
      return (
        <>
        <Header openLoginModal={() => setShowLoginModal(true)} 
          openSignupModal={() => setShowSignupModal(true)}/>
        {showLoginModal && (
            <Modal onClose={() => setShowLoginModal(false)}>
                <LoginForm openSignupModal={() => setShowSignupModal(true)}
                closeLoginModal={() => setShowLoginModal(false)}/>
            </Modal>
        )}
        {showSignupModal && (
            <Modal onClose={() => setShowSignupModal(false)}>
                <SignupForm openLoginModal={() => setShowLoginModal(true)}
                closeSignUpModal={() => setShowSignupModal(false)} />
            </Modal>
        )}

        </>
      )
    }
    else {
      return (
        <Header />
      );
    }
    
}

export default MainPage;