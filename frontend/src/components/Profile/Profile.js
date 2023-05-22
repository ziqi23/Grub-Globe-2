import { useSelector } from "react-redux";
import "./Profile.css";
import defaultPicture from "./default-profile.png";
import { useState, useEffect } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import Header from "../Header/Header";
import { fetchFavorites } from "../../store/favorites";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { fetchRecipe } from "../../store/recipes";
import FavoritesTile from "./FavoritesTile";
import BadgesIndex from "./BadgesIndex";
import { fetchUserReviews } from "../../store/reviews";
import ReviewsTiles from "./ReviewsTile";
import { uploadImage } from "../../store/session";
import LoaderDots from "../LoaderDots";

function Profile(props) {
  const dispatch = useDispatch();

  const userReviews = useSelector((state) => Object.values(state.reviews.user));
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchUserReviews(sessionUser._id));
  }, [dispatch, sessionUser]);

  const [completedRecipes, setCompletedRecipes] = useState([]);

  // for uploading profile photo
  const Buffer = require("buffer/").Buffer;
  const [image, setImage] = useState();
  const [uploadPanelOpen, setUploadPanelOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [updatePhoto, setUpdatePhoto] = useState(false);

  // for toggling profile nav
  const [toggleBadges, setToggleBadges] = useState(true);
  const [toggleFavorites, setToggleFavorites] = useState(false);
  const [toggleReviews, setToggleReviews] = useState(false);
  const [toggleCompleted, setToggleCompleted] = useState(false);

  // for users acquired badges; can choose which one to display

  // const user = useSelector((state) => state.session.user);
  const favorites = useSelector((state) => Object.values(state.favorites));

  // for badges
  const [numReviews, setNumReviews] = useState(0);
  const [numHealthyRecipes, setNumHealthyRecipes] = useState(0);
  const [numCompleted, setNumCompleted] = useState(0);
  const [uniqueCountries, setUniqueCountries] = useState(0);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(fetchFavorites());
  }, [dispatch]);

  useEffect(() => {
    if (sessionUser && sessionUser.completedRecipe) {
      const fetchPromises = sessionUser.completedRecipe.map(({ recipeId }) =>
        dispatch(fetchRecipe(recipeId))
      );

      Promise.all(fetchPromises)
        .then((fetchedRecipes) => {
          setCompletedRecipes(fetchedRecipes);
          const numComplete = fetchedRecipes.length;
          const uniqueCountry = new Set(
            fetchedRecipes.map((recipe) => {
              return recipe.recipe.country;
            })
          );

          const numHealthy = fetchedRecipes.filter(
            (recipe) =>
              recipe.recipe.tags.includes("vegetarian") ||
              recipe.recipe.tags.includes("vegan") ||
              recipe.recipe.tags.includes("glutenFree")
          ).length;
          const reviewsCount = userReviews?.length;

          setNumCompleted(numComplete);
          setUniqueCountries(uniqueCountry.size);
          setNumReviews(reviewsCount);
          setNumHealthyRecipes(numHealthy);
        })
        .catch((error) => {
          console.error("Error fetching recipes: ", error);
        });
    }
  }, [sessionUser, dispatch, userReviews?.length]);

  useEffect(() => {
    if (sessionUser.photo) {
      const bufferArr = new Uint8Array(sessionUser.photo.data);
      setImage((image) => Buffer.from(bufferArr).toString("base64"));
    }
  }, [sessionUser.photo, photoFile, Buffer]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", photoFile);
    dispatch(uploadImage(formData));
  }

  function handlePanelClick(e) {
    e.preventDefault();
    setUploadPanelOpen(!uploadPanelOpen);
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    const box = document.getElementsByClassName(
      "profile-picture-upload-panel"
    )[0];
    switch (e.type) {
      case "dragover":
        box.classList.add("drag-highlight");
        break;
      case "dragenter":
        box.classList.add("drag-highlight");
        break;
      case "drop":
        box.classList.remove("drag-highlight");
        setPhotoFile(e.dataTransfer.files[0]);
        const formData = new FormData();
        formData.append("image", e.dataTransfer.files[0]);
        dispatch(uploadImage(formData));
        break;
      case "dragleave":
        box.classList.remove("drag-highlight");
        break;
      default:
        break;
    }
  }

  const toggleNav = (selectedTab) => {
    const tabs = ["badges", "favorites", "reviews", "completed"];
    let setFalse = [];
    tabs.forEach((tab) => {
      let setState;
      switch (tab) {
        case "badges":
          setState = setToggleBadges;
          break;
        case "favorites":
          setState = setToggleFavorites;
          break;
        case "reviews":
          setState = setToggleReviews;
          break;
        case "completed":
          setState = setToggleCompleted;
          break;
        default:
          throw Error("Unknown field");
      }
      if (tab !== selectedTab && setState) {
        setFalse.push(setState);
      } else {
        setState(true);
      }
    });
    return setFalse.forEach((setState) => setState(false));
  };

  if (!sessionUser) {
    return <LoaderDots />;
  }

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
              alt="profile-avatar"
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
              <div
                className="profile-picture-upload-panel"
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrag}
                onDragLeave={handleDrag}
              >
                <AiOutlineDownload className="profile-picture-dropbox-icon" />
                <h1>Upload a new profile photo, or simply drag and drop.</h1>
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
                Chef {sessionUser.firstName} {sessionUser.lastName}
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
                toggleNav("completed");
              }}
              className={toggleCompleted ? "active" : ""}
            >
              Completed Recipes
            </h1>
          </div>
          {toggleBadges && (
            <BadgesIndex
              numCompleted={numCompleted}
              uniqueCountries={uniqueCountries}
              numReviews={numReviews}
              numHealthyRecipes={numHealthyRecipes}
            />
          )}
          {toggleFavorites && (
            <>
              <h1 className="tab-title">
                {favorites.length}{" "}
                {favorites.length === 1 ? "FAVORITE" : "FAVORITES"}
              </h1>
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
              <h1 className="tab-title">
                {userReviews.length}{" "}
                {userReviews.length === 1 ? "REVIEW" : "REVIEWS"}
              </h1>
              <div id="profile-reviews-container">
                {userReviews.map((review, i) => (
                  <ReviewsTiles key={i} review={review} />
                ))}
              </div>
            </>
          )}
          {toggleCompleted && (
            <>
              <h1 className="tab-title">
                {completedRecipes.length}{" "}
                {completedRecipes.length === 1
                  ? "COMPLETED RECIPE"
                  : "COMPLETED RECIPES"}
              </h1>
              <div id="completed-container">
                {completedRecipes.map((recipe) => {
                  return (
                    <FavoritesTile
                      key={recipe._id}
                      recipe={recipe.recipe}
                    ></FavoritesTile>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
