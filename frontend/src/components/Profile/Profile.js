import { useSelector } from 'react-redux'
import {store} from '../../index'
import './Profile.css'
import defaultPicture from './default-profile.png'
import { useState } from 'react'

function Profile(props) {
    const [uploadPanelOpen, setUploadPanelOpen] = useState(false)
    const user = useSelector(state => state.session.user)
    return (
        <div className='profile-page-root'>
            <div className='profile-page-top'>
                <div className='profile-page-left'>
                    <div className='profile-page-picture'>
                        <img className='profile-page-picture-file' src={defaultPicture}></img>
                        <div className='profile-page-upload-panel-toggle' onClick={() => setUploadPanelOpen(!uploadPanelOpen)}>
                            <h1>Update Profile Picture</h1>
                        </div>
                        {uploadPanelOpen && (
                            <div className='profile-picture-upload-panel'>
                                <form action='/users/upload' enctype="multipart/form-data">
                                    <input type='file' name="uploaded_file"></input>
                                    <input type='submit'></input>
                                </form>
                            </div>
                        )}
                    </div>
                    <div className='profile-page-user-details'>
                        <div>Chef First Name Last Name</div>
                        <div>
                            <h1>Username</h1>
                            <h2>{user.username}</h2>
                        </div>
                        <div>
                            <h1>Email</h1>
                            <h2>{user.email}</h2>
                        </div>
                    </div>
                </div>
                <div className='profile-page-right'>
                    <h1>Badges</h1>
                </div>
            </div>
            <div className='profile-page-bottom'>
                <h1>Favorites</h1>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Profile


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

{/* <div>
<img src="data:image/image/png;base64,
  <%=user.avatar.toString('base64')%>" width='1080px'>
<div> */}



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