import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../store/session';
import signupImage from '../../assets/images/bloom-girl-using-the-internet-on-her-laptop.png'

function SignupForm ({openLoginModal, closeSignUpModal}) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      case 'firstName':
        setState = setFirstName;
        break;
      case 'lastName':
        setState = setLastName;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      firstName,
      lastName
    };

    dispatch(signup(user)); 
  }

  const handleSwitchModal = () => {
    closeSignUpModal();
    openLoginModal();
  }

  return (
    <div className="login-modal-container">
        <div className="side-image-and-logo">
            <div className="logo"><h1>grubGlobe</h1></div>
            <img src={signupImage} alt="chef-serving-pizza" />
        </div>
      <form className="session-form" onSubmit={handleSubmit}>
          <p>Explore new recipes around the world</p>
          <h2>signup</h2>
          <div className="session-form-names-input">
            <label>
              <span>First Name</span>
              <input type="text"
                value={firstName}
                onChange={update('firstName')}
              />
            </label>
            <label>
              <span>Last Name</span>
              <input type="text"
                value={lastName}
                onChange={update('lastName')}

              />
            </label>

          </div>

          <div className="errors">{errors?.email}</div>
          <label>
            <span>Email</span>
            <input type="text"
              value={email}
              onChange={update('email')}
            />
          </label>
          <div className="errors">{errors?.username}</div>
          <label>
            <span>Username</span>
            <input type="text"
              value={username}
              onChange={update('username')}
            />
          </label>
          <div className="errors">{errors?.password}</div>
          <label>
            <span>Password</span>
            <input type="password"
              value={password}
              onChange={update('password')}
            />
          </label>
          <div className="errors">
            {password !== password2 && 'Confirm Password field must match'}
          </div>
          <label>
          <span>Confirm Password</span>
          <input type="password"
            value={password2}
            onChange={update('password2')}
          />
          </label>

          <div className="switch-login-modal">
              <p>Already have an account?</p>
              <p onClick={handleSwitchModal}>Log In</p>
              {/* {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                  <LoginForm />
              </Modal>
               )} */}
          </div>

            <input
              type="submit"
              value="Sign Up"
              disabled={!email || !username || !password || password !== password2}
            />
          </form>
          
      </div>
  );
}

export default SignupForm;