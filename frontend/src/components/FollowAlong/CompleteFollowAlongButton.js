import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "../SessionForms/LoginForm";
import SignupForm from "../SessionForms/SignUpForm";
import { addCompletedRecipe } from "../../store/session";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

const CompleteFollowAlongButton = ({
    closeFollowAlong,
    setCurrentRecipeStep,
    recipeId
}) => {
    const dispatch = useDispatch();


    const sessionUser = useSelector((state) => state.session.user);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);

    // for logged in user
    const handleFinishedFollowAlong = () => {
        closeFollowAlong();
        setCurrentRecipeStep("");

        // add request to update user's completed recipes
        const completedRecipeObj = {
            userId: sessionUser._id,
            recipeId: recipeId
        }

        dispatch(addCompletedRecipe(completedRecipeObj));
        window.location.reload();

    }

    const handleLoggedOutUser = () => {
        closeFollowAlong();
        setCurrentRecipeStep("");
        setTimeout(() => {
            setShowLoginModal(true);
        }, 1000)
    }

    if (!sessionUser) {
        return (
            <>
                <div
                    onClick={handleLoggedOutUser}
                    className="last-step-exit-button">
                        Log in to add to completed collection
                </div>
                {
                showLoginModal && (
                    <Modal onClose={() => setShowLoginModal(false)}>
                        <LoginForm
                            openSignupModal={() => setShowSignupModal(true)}
                            closeLoginModal={() => setShowLoginModal(false)}
                        />
                    </Modal>
                )
            }
            {
                showSignupModal && (
                    <Modal onClose={() => setShowSignupModal(false)}>
                        <SignupForm
                            openLoginModal={() => setShowLoginModal(true)}
                            closeSignUpModal={() => setShowSignupModal(false)}
                        />
                    </Modal>
                )
                }
            </>
        )
    }


    return (
        <>
            <div
                onClick={handleFinishedFollowAlong}
                className="last-step-exit-button">
                    Finished!
            </div>

        </>
    )
};

export default CompleteFollowAlongButton;
