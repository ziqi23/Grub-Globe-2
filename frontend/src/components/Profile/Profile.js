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
import BadgesIndex from "./BadgesIndex"

// Favorites integration and ability to unfavorite from page

function Profile(props) {
    const dispatch = useDispatch()

    // for uploading profile photo
    const Buffer = require('buffer/').Buffer
    const [uploadPanelOpen, setUploadPanelOpen] = useState(false)
    const [photoFile, setPhotoFile] = useState(null);
    const [updatePhoto, setUpdatePhoto] = useState(false);

    // for toggling profile nav
    const [toggleBadges, setToggleBadges] = useState(true);
    const [toggleFavorites, setToggleFavorites] = useState(false);

    // for users acquired badges; can choose which one to display

    const user = useSelector(state => state.session.user)
    const favorites = useSelector(state => state.favorites)

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(fetchFavorites());
  }, []);

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
    const tabs = ["badges", "favorites"];
    let setFalse = [];
    tabs.forEach((tab) => {
      let setState;
      switch (tab) {
        case 'badges':
          setState = setToggleBadges;
          console.log("hello")
          break;
        case 'favorites':
          setState = setToggleFavorites
          break;
        default: 
          throw Error('Unknown field')
      }
      if (tab !== selectedTab && setState) {
        setFalse.push(setState)
      } else {
        setState(true)
      }
    })
    return setFalse.forEach(setState => setState(false))
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
              onClick={() =>toggleNav("badges")}
              >Badges & Achievements
            </h1>
            <h1 
              onClick={() => toggleNav("favorites")}
              className={toggleFavorites ? "active" : ""}
              >Favorites
            </h1>
            <h1>Reviews</h1>
            <h1>Completed Recipes</h1>

          </div>
          {toggleBadges && <BadgesIndex /> }
          {toggleFavorites && (
            <div id="favorites-container">
            {favorites &&
              Object.values(favorites).map((favorite) => {
                return (
                  <FavoritesTile key={favorite.recipe._id} recipe={favorite.recipe}></FavoritesTile>
                );
              })}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
