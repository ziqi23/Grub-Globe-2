import { useSelector } from 'react-redux'
import {store} from '../../index'
import './Profile.css'
import defaultPicture from './default-profile.png'
import { useState } from 'react'
import jwtFetch from '../../store/jwt'
import Header from '../Header/Header'
// Add header
// Chef XXX Large Font
// Badges PH
// Favorites integration and ability to unfavorite from page

function Profile(props) {
    const Buffer = require('buffer/').Buffer
    const [uploadPanelOpen, setUploadPanelOpen] = useState(false)
    const [photoFile, setPhotoFile] = useState(null)
    const [updatePhoto, setUpdatePhoto] = useState(false)
    const user = useSelector(state => state.session.user)
    const arr = new Uint8Array(user.photo.data)
    const image = Buffer.from(arr).toString('base64')

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', photoFile)
        jwtFetch('/api/users/upload', {
            method: "POST",
            body: formData
        })
    }

    return (
        <div className='profile-page-root'>
            <Header />
            <div className='profile-page-header'>
                <h1>Welcome home, chef.</h1>
            </div>
            <div className='profile-page-top'>
                <div className='profile-page-left'>
                    <div className='profile-page-picture'
                    onMouseEnter={() => setUpdatePhoto(true)}
                    onMouseLeave={() => setUpdatePhoto(false)}>
                        <img className='profile-page-picture-file' 
                        src={image ? `data:image/image/png;base64,${image}` : defaultPicture} />
                        {updatePhoto && (
                        <div className='profile-page-upload-panel-toggle' onClick={() => setUploadPanelOpen(!uploadPanelOpen)}>
                            <h1>Update Picture</h1>
                        </div>
                        )}

                        {uploadPanelOpen && (
                            <div className='profile-picture-upload-panel'>
                                <form id="profile-picture-upload-form" onSubmit={handleSubmit}>
                                    <input accept="image/*" type='file' name="uploaded_file" onChange={e => setPhotoFile(e.target.files[0])}></input>
                                    <input type='submit'></input>
                                </form>
                            </div>
                        )}
                    </div>
                    <div className='profile-page-user-details'>
                        <div>Chef {user.firstName} {user.lastName}</div>
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