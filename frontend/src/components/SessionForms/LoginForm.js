import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { login, clearSessionErrors } from "../../store/session";
import loginImage from "../../assets/images/bloom-chef-serving-a-pizza.png";

function LoginForm({ openSignupModal, closeLoginModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {}, [email]);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(login({ email, password }));
  };

  const handleSwitchModal = () => {
    closeLoginModal();
    openSignupModal();
  };

  const continueAsDemoUser = async (e) => {
    e.preventDefault();

    const demoUser = { email: "guy.fieri@hotmail.com", password: "flavortown" };
    const res = await dispatch(login(demoUser));
  };

  return (
    <>
      <div className="login-modal-container">
        <div className="side-image-and-logo">
          <div className="logo">
            <h1>grubGlobe</h1>
          </div>
          <img src={loginImage} alt="chef-serving-pizza" />
        </div>
        <form className="session-form" onSubmit={handleSubmit}>
          <p>I'm ready to get cookin'!</p>
          <h2>login</h2>

          <div className="errors">{errors?.email}</div>
          <label>
            <span>Email</span>
            <input
              type="text"
              value={email}
              onChange={update("email")}
              placeholder="Email"
            />
          </label>

          <div className="errors">{errors?.password}</div>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={update("password")}
              placeholder="Password"
            />
          </label>
          <div className="switch-login-modal">
            <p>Don't have an account yet?</p>
            <p onClick={handleSwitchModal}>Sign Up</p>
          </div>

          <input type="submit" value="Login" disabled={!email || !password} />
          <p>or</p>
          <div
            onClick={continueAsDemoUser}
            className="demo-login-button"
          >
            Continue as Demo User
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
