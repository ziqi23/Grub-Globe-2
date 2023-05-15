import { useSelector } from "react-redux";
import "./Profile.css";
import defaultPicture from "./default-profile.png";
import { useState, useEffect } from "react";
import jwtFetch from "../../store/jwt";
import Header from "../Header/Header";
import { fetchFavorites } from "../../store/favorites";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { fetchRecipe } from "../../store/recipes";
import FavoritesTile from "./FavoritesTile";
import BadgesIndex from "./BadgesIndex";
import { fetchUserReviews } from "../../store/reviews";
import ReviewsTiles from "./ReviewsTile";
import CompletedRecipes from "./CompletedRecipes";

// Favorites integration and ability to unfavorite from page

function Profile(props) {
  const dispatch = useDispatch();

  // for user's reviews
  const userReviews = useSelector((state) => Object.values(state.reviews.user));
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    dispatch(fetchUserReviews(sessionUser._id));
    console.log(userReviews)
  }, [dispatch, sessionUser]);

  //you can pull number of users's reviews using userReviews.length, or look at reviews themselves using userReviews

    // for storing completed recipes
    const [completedRecipes, setCompletedRecipes] = useState([]);

  // for uploading profile photo
  const Buffer = require("buffer/").Buffer;
  const [uploadPanelOpen, setUploadPanelOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [updatePhoto, setUpdatePhoto] = useState(false);

  // for toggling profile nav
  const [toggleBadges, setToggleBadges] = useState(true);
  const [toggleFavorites, setToggleFavorites] = useState(false);
  const [toggleReviews, setToggleReviews] = useState(false);
  const [toggleCompleted, setToggleCompleted] = useState(false);

  // for users acquired badges; can choose which one to display

  const user = useSelector((state) => state.session.user);
  const favorites = useSelector((state) => Object.values(state.favorites));

  // for badges
  const [numReviews, setNumReviews] = useState(0);
  const [numHealthyRecipes, setNumHealthyRecipes] = useState(0);
  const [numCompleted, setNumCompleted] = useState(0);
  const [uniqueCountries, setUniqueCountries] = useState(0);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(fetchFavorites());
  }, []);

  useEffect(() => {
    if (user && user.completedRecipe) {

      const fetchPromises = user.completedRecipe.map(({ recipeId }) =>
        dispatch(fetchRecipe(recipeId)));

      Promise.all(fetchPromises)
        .then(fetchedRecipes => {
          setCompletedRecipes(fetchedRecipes);
          console.log("fetchedRecipes", fetchedRecipes);
          const numComplete = fetchedRecipes.length;
          const uniqueCountry = new Set(fetchedRecipes.map(recipe => {
            return recipe.recipe.country;
        }));

        const numHealthy = fetchedRecipes.filter(recipe => recipe.recipe.tags.includes('vegetarian') || recipe.recipe.tags.includes('vegan') || recipe.recipe.tags.includes('glutenFree')).length;
        const reviewsCount = userReviews.length;
        console.log("numHealthy", numHealthy);

        setNumCompleted(numComplete);
        setUniqueCountries(uniqueCountry.size);
        setNumReviews(reviewsCount);
        setNumHealthyRecipes(numHealthy);
        })
        .catch(error => {
        console.error("Error fetching recipes: ", error);
        });
    }
  }, [user, dispatch]);

  let bufferArr;
  let image;
  if (user.photo) {
    bufferArr = new Uint8Array(user.photo.data);
    image = Buffer.from(bufferArr).toString("base64");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", photoFile);
    jwtFetch("/api/users/upload", {
      method: "POST",
      body: formData,
    });
  }

  function handlePanelClick(e) {
    e.preventDefault();
    setUploadPanelOpen(!uploadPanelOpen);
  }

  const toggleNav = (selectedTab) => {
    const tabs = ["badges", "favorites", "reviews", "completed"];
    let setFalse = [];
    tabs.forEach((tab) => {
      let setState;
      switch (tab) {
        case "badges":
          setState = setToggleBadges;
          console.log("hello");
          break;
        case "favorites":
          setState = setToggleFavorites;
          break;
        case "reviews":
          setState = setToggleReviews;
          break;
        case 'completed':
          setState = setToggleCompleted;
          break;
        default:
          throw Error('Unknown field')
      }
      if (tab !== selectedTab && setState) {
        setFalse.push(setState);
      } else {
        setState(true);
      }
    });
    return setFalse.forEach((setState) => setState(false));
  };

  return (
    <div className="profile-page-root">
      <Header />
      <div className="profile-page-top">
        <div className="profile-page-left">
          <div
            className="profile-page-picture"
            onMouseEnter={() => setUpdatePhoto(true)}
            onMouseLeave={() => setUpdatePhoto(false)}
          >
            <img
              className="profile-page-picture-file"
              src={
                image ? `data:image/image/png;base64,${image}` : defaultPicture
              }
            />
            {updatePhoto && (
              <div
                className="profile-page-upload-panel-toggle"
                onClick={handlePanelClick}
              >
                <h1>Update Picture</h1>
              </div>
            )}

            {uploadPanelOpen && (
              <div className="profile-picture-upload-panel">
                <form id="profile-picture-upload-form" onSubmit={handleSubmit}>
                  <input
                    accept="image/*"
                    type="file"
                    name="uploaded_file"
                    onChange={(e) => setPhotoFile(e.target.files[0])}
                  ></input>
                  <input type="submit"></input>
                </form>
              </div>
            )}
          </div>
          <div className="profile-page-user-details">
            <div>
              <h1>
                Chef {user.firstName} {user.lastName}
              </h1>
            </div>
          </div>
        </div>
        <div className="profile-page-right">
          <div className="profile-nav-bar">
            <h1
              className={toggleBadges ? "active" : ""}
              onClick={() => toggleNav("badges")}
            >
              Badges & Achievements
            </h1>
            <h1
              onClick={() => toggleNav("favorites")}
              className={toggleFavorites ? "active" : ""}
            >
              Favorites
            </h1>
            <h1
              onClick={() => toggleNav("reviews")}
              className={toggleReviews ? "active" : ""}
            >
              Reviews
            </h1>
            <h1
              onClick={() => {
                toggleNav("completed")
                console.log(toggleCompleted);
              }}
              className={toggleCompleted ? "active": ""}
              >Completed Recipes
            </h1>
          </div>
          {toggleBadges && <BadgesIndex numCompleted={numCompleted} uniqueCountries={uniqueCountries} numReviews={numReviews
          } numHealthyRecipes={numHealthyRecipes} /> }
          {toggleFavorites && (
            <>
            <h1 className="tab-title">{favorites.length} {favorites.length === 1 ? "FAVORITE" : "FAVORITES"}</h1>
            <div id="favorites-container">
              {favorites.map((favorite) => {
                  return (
                    <FavoritesTile
                      key={favorite.recipe._id}
                      recipe={favorite.recipe}
                    ></FavoritesTile>
                  );
                })}
            </div>
            </>
          )}
          {toggleReviews && (
            <>
            <h1 className="tab-title">{userReviews.length} {userReviews.length === 1 ? "REVIEW" : "REVIEWS"}</h1>
            <div id="profile-reviews-container">
              {userReviews.map((review, i) => (
                <ReviewsTiles
                  key={i}
                  review={review}
                />
              ))}
            </div>
            
            </>
          )}
          {toggleCompleted && (
            <>
            <h1 className="tab-title">{completedRecipes.length} {completedRecipes.length === 1 ? "COMPLETED RECIPE" : "COMPLETED RECIPES"}</h1>
            <div id="completed-container">
              <CompletedRecipes recipes={completedRecipes} />
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
