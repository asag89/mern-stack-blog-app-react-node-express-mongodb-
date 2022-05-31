
import avatar from "../../assets/avatar.png"
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa"
import { Modal } from '@mui/material';

import { updateUser } from "../../features/currentUser/currentUserSlice"
import { deleteUser } from "../../features/currentUser/currentUserSlice"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

import "./account.css"

const Account = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.currentUser)

  const [currUser, setCurrUser] = useState(user)

  const { username, email, bio, userPhoto } = currUser

  const [usernameFocus, setUsernameFocus] = useState(true)
  const [bioFocus, setBioFocus] = useState(true)
  const [emailFocus, setEmailFocus] = useState(true)
  const [photoFocus, setPhotoFocus] = useState(true)

  const [modal, setModal] = useState(false)
  const [confirmInput, setConfirmInput] = useState("")

  const handleChange = (e) => {
    setCurrUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // upload to firebase storage
  const [photo, setPhoto] = useState(null)
  const handleUpdatePhoto = () => {
    if (photo) {
      const photoName = new Date().getTime() + photo.name
      const storage = getStorage(app)
      const storageRef = ref(storage, photoName)
      const uploadTask = uploadBytesResumable(storageRef, photo);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const userPhoto = { userPhoto: downloadURL }
            dispatch(updateUser(userPhoto));
            setPhotoFocus(!photoFocus);
          });
        }
      );
    }
  }

  const handleDeleteAccount = async () => {
    if (confirmInput === "delete") {
      await setModal(false)
      await dispatch(deleteUser())
      navigate("/")
    }
  }

  return (
    <div className="account-container">
      <div className="account-left-wrapper">
        <div className="account-left">
          <h2 className="account-h2">Settings</h2>
          <ul className="account-list">
            <li className="account-list-item">About you</li>
            <li className="account-list-item">Connection</li>
            <li className="account-list-item">Design</li>
            <li className="account-list-item">Email Settings</li>
            <li className="account-list-item">Security</li>
            <li className="account-list-item"><a href="#account">Account</a></li>
          </ul>
        </div>
      </div>
      <div className="account-rigth">
        <h2 className="account-h2">About you</h2>
        <ul className="account-edit">
          <li className="account-edit-item">
            <h3 className="account-h3">Name</h3>
            <div className="account-edit-user-info">
              <input className="account-edit-input" name="username" disabled={usernameFocus} autoFocus={!usernameFocus} value={username} onChange={handleChange} />
              {usernameFocus ?
                <button className="account-edit-btn" onClick={() => setUsernameFocus(!usernameFocus)} >Edit</button>
                : <div className="account-edit-btn-group">
                  <button className="account-edit-btn" onClick={() => { dispatch(updateUser({ username })); setUsernameFocus(!usernameFocus); }}>Save</button>
                  <button className="account-edit-btn" onClick={() => setUsernameFocus(!usernameFocus)}>Cancel</button>
                </div>}
            </div>
            <p className="account-edit-desc">Your name appears on your Profile page, as your byline, and in your responses. It is a required field.</p>
          </li>
          <li className="account-edit-item">
            <h3 className="account-h3">Short Bio</h3>
            <div className="account-edit-user-info">
              <input className="account-edit-input" name="bio" disabled={bioFocus} autoFocus={!bioFocus} value={bio} onChange={handleChange} />
              {bioFocus ? <button className="account-edit-btn" onClick={() => setBioFocus(!bioFocus)}>Edit</button>
                : <div className="account-edit-btn-group">
                  <button className="account-edit-btn" onClick={() => { dispatch(updateUser(currUser)); setBioFocus(!bioFocus); }}>Save</button>
                  <button className="account-edit-btn" onClick={() => setBioFocus(!bioFocus)}>Cancel</button>
                </div>}
            </div>
            <p className="account-edit-desc">Your short bio appears on your Profile and next to your stories.</p>
          </li>
          <li className="account-edit-item">
            <h3 className="account-h3">Photo</h3>
            <div className="account-edit-user-info">
              <label htmlFor="input-file"><img src={photo ? URL.createObjectURL(photo) : userPhoto || avatar} className="account-edit-user-photo" alt="" /></label>
              <input type="file" id="input-file" onChange={(e) => setPhoto(e.target.files[0])} disabled={photoFocus} />
              {photoFocus ?
                <button className="account-edit-btn" onClick={() => setPhotoFocus(!photoFocus)}>Edit</button>
                : <div className="account-edit-btn-group">
                  <button className="account-edit-btn" onClick={() => handleUpdatePhoto()}>Save</button>
                  <button className="account-edit-btn" onClick={() => setPhotoFocus(!photoFocus)}>Cancel</button>
                </div>
              }
            </div>
          </li>
          <li className="account-edit-item">
            <h3 className="account-h3">Email</h3>
            <div className="account-edit-user-info">
              <input type="text" value={email} name="email" disabled={emailFocus} autoFocus={!emailFocus} className="account-edit-input" onChange={handleChange} />
              {emailFocus ?
                <button className="account-edit-btn" onClick={() => setEmailFocus(!emailFocus)}>Edit</button>
                : <div className="account-edit-btn-group">
                  <button className="account-edit-btn" onClick={() => { dispatch(updateUser(currUser)); setEmailFocus(!emailFocus); }}>Save</button>
                  <button className="account-edit-btn" onClick={() => setEmailFocus(!emailFocus)}>Cancel</button>
                </div>
              }
            </div>
          </li>
        </ul>
        <h2 className="account-h2">Connections</h2>
        <ul className="account-edit">
          <li className="account-edit-item">
            <h3 className="account-h3">Connect to Facebook</h3>
            <div className="account-edit-user-info">
              <p className="account-edit-desc">We will never post to Facebook or message your friends without your permission.</p>
              <button className="account-edit-connect-btn"><FaFacebook className="account-edit-icon" />Connect to Facebook</button>
            </div>
          </li>
          <li className="account-edit-item">
            <h3 className="account-h3">Connect to Twitter</h3>
            <div className="account-edit-user-info">
              <p className="account-edit-desc">We will never post to Twitter or message your friends without your permission.</p>
              <button className="account-edit-connect-btn"><FaTwitter className="account-edit-icon" />Connect to Twitter</button>
            </div>
          </li>
          <li className="account-edit-item">
            <h3 className="account-h3">Connect to Google</h3>
            <div className="account-edit-user-info">
              <p className="account-edit-desc">You can sign in to Ankrom using your Google account.</p>
              <button className="account-edit-connect-btn"><FaGoogle className="account-edit-icon" />Connect to Google</button>
            </div>
          </li>
        </ul>
        <h2 className="account-h2">Account</h2>
        <ul className="account-edit" id="account">
          <li className="account-edit-item">
            <h3 className="account-h3">Sign out of all other sessions</h3>
            <div className="account-edit-user-info">
              <p className="account-edit-desc">This will sign you out of sessions in other browsers or on other computers.</p>
              <button className="account-edit-btn">Sign out other sessions</button>
            </div>
          </li>
          <li className="account-edit-item">
            <h3 className="account-h3">Delete account</h3>
            <p className="account-edit-desc">Permanently delete your account and all of your content.</p>
            <button className="account-delete-btn" onClick={() => setModal(true)} >Delete account</button>
          </li>
        </ul>
      </div>
      <Modal open={modal} onClose={() => setModal(false)}>
        <div className="modal-container">
          <button className="modal-close-btn" onClick={() => setModal(false)}>x</button>
          <section className="modal">
            <h1 className="modal-h1">Confirm account deletion</h1>
            <p className="modal-p">We’re sorry to see you go. Once your account is deleted, all of your content will be permanently gone, including your profile, stories, publications, notes, and responses.</p>
            <p className="modal-confirm-p">To confirm deletion, type “delete” below:</p>
            <input type="text" className="modal-confirm-input" value={confirmInput} onChange={(e) => { setConfirmInput(e.target.value) }} />
            <div className="modal-confirm-btn-group">
              <button className="modal-confirm-btn" onClick={handleDeleteAccount}>Confirm Deletion</button>
              <button className="modal-cancel-btn" onClick={() => setModal(false)}>Cancel</button>
            </div>
          </section>
        </div>
      </Modal>
    </div>
  )
}

export default Account