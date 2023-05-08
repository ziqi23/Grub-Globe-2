import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import SignupForm from './components/SessionForms/SignUpForm';
import LoginForm from './components/SessionForms/LoginForm';
import MainPage from './components/MainPage/MainPage';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './store/session';
import RecipeIndexPage from './components/RecipeIndexPage/RecipeIndexPage';

function App() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);


  return loaded && (
    <>
    {/* <NavBar /> */}
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />

      <ProtectedRoute path="/recipes" component={RecipeIndexPage} />
    </Switch>
    </>
  );
}

export default App;