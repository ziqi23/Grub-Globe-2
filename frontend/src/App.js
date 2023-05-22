import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/session";
import RecipeIndexPage from "./components/RecipeIndexPage/RecipeIndexPage";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import RecipeShowPage from "./components/RecipeShow/RecipeShowPage";
import Globe from "./components/Globe/Globe";
import Profile from "./components/Profile/Profile";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <Switch>
          <AuthRoute exact path="/login" component={Globe} />
          <AuthRoute exact path="/signup" component={Globe} />
          <Route path="/recipes/:recipeId" component={RecipeShowPage} />
          <Route exact path="/" component={Globe} />
          <Route path="/recipes" component={RecipeIndexPage} />
          <Route exact path="/explore" component={Globe} />
          <ProtectedRoute path="/profile" component={Profile} />
        </Switch>
      </>
    )
  );
}

export default App;
