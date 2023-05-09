import Header from "../Header/Header";
import LoginForm from "../SessionForms/LoginForm";
import { useState } from "react";
import { Modal } from "../../context/Modal";

function MainPage() {
    const [showModal, setShowModal] = useState(false);
    return (
      <>
        <Header openModal={() => setShowModal(true)}/>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <LoginForm />
            </Modal>
        )}
      </>
    );
}

export default MainPage;