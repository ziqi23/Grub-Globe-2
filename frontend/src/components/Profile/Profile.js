import { useSelector } from "react-redux";
import "./Profile.css";
import defaultPicture from "./default-profile.png";
import { useState, useEffect } from "react";
import jwtFetch from "../../store/jwt";
import Header from "../Header/Header";
import aroundTheWorldIcon from "../../assets/icons/badge-icons/icons8-around-the-globe-100.png";
import broccoliIcon from "../../assets/icons/badge-icons/icons8-broccoli-100.png";
import composeIcon from "../../assets/icons/badge-icons/icons8-compose-100.png";
import kawaiiIceCreamIcon from "../../assets/icons/badge-icons/icons8-kawaii-ice-cream-100.png";
import restaurantIcon from "../../assets/icons/badge-icons/icons8-restaurant-100.png";
import roadmapIcon from "../../assets/icons/badge-icons/icons8-roadmap-100.png";
import spachelorIcon from "../../assets/icons/badge-icons/icons8-spachelor-100.png";
import { fetchFavorites } from "../../store/favorites";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { fetchRecipe } from "../../store/recipes";
import RecipeCard from "../RecipeIndexPage/RecipeCard";
import FavoritesTile from "./FavoritesTile";
// Add header
// Chef XXX Large Font
// Badges PH
// Favorites integration and ability to unfavorite from page

function Profile(props) {
    const dispatch = useDispatch()
    const Buffer = require('buffer/').Buffer
    const [uploadPanelOpen, setUploadPanelOpen] = useState(false)
    const [photoFile, setPhotoFile] = useState(null)
    const [updatePhoto, setUpdatePhoto] = useState(false)
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
            <div>
              <h3>Username</h3>
              <h2>{user.username}</h2>
            </div>
            <div>
              <h3>Email</h3>
              <h2>{user.email}</h2>
            </div>
          </div>
        </div>
        <div className="profile-page-right">
          <h1>Badges & Achievements</h1>

          <div>
            <img className="badge-icon" src={broccoliIcon}></img>
            <h2>Cooked 3 recipes with the "healthy" tag.</h2>
          </div>
          <div>
            <img src={kawaiiIceCreamIcon}></img>
            <h2>Cooked 3 recipes with the "dessert" tag.</h2>
          </div>
          <div>
            <img src={roadmapIcon}></img>
            <h2>Tried recipes from 5 different countries.</h2>
          </div>
          <div>
            <img src={aroundTheWorldIcon}></img>
            <h2>Tried recipes from 10 different countries.</h2>
          </div>
          <div>
            <img src={composeIcon}></img>
            <h2>Written 5 recipe reviews.</h2>
          </div>
          <div>
            <img src={restaurantIcon}></img>
            <h2>Added 5 recipes as favorites.</h2>
          </div>
          <div>
            <img src={spachelorIcon}></img>
            <h2>Added 10 recipes as favorites.</h2>
          </div>
        </div>
      </div>
      <div className="profile-page-bottom">
        <h1>Favorites</h1>
        <div id="favorites-container">
          {favorites &&
            Object.values(favorites).map((favorite) => {
              return (
                <FavoritesTile key={favorite.recipe._id} recipe={favorite.recipe}></FavoritesTile>
              );
              //   return <RecipeCard key={recipe._id} recipe={recipe}></RecipeCard>;
            })}
        </div>
      </div>
    </div>
  );
}

export default Profile;

//leahseyoum@gmail.com

//Password: Leahmela99!
// const [errors, onSubmit] = useSubmit({
//     createAction: () => {
//         const formData = new FormData();
//         formData.append('pin[title]', title);
//         formData.append('pin[caption]', caption);
//         formData.append('pin[link]', link);

//         if (imageFile) {
//             formData.append('pin[image]', imageFile);
//         }
//         return createPin(formData);
//     },

//     onSuccess:(pin) => {
//         dispatch(createSave(selectedBoard, pin.payload.id))
//         history.push('/created')},

// });

// const handleFileChange = e => {
//     const file = e.target.files[0];
//     if (file) {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => {
//         setImageFile(file);
//         setImageUrl(fileReader.result);
//         setPreview(fileReader.result);
//       };
//     }
//   }
