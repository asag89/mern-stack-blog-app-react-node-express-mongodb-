
import initialImg from "../../assets/postForm.jpg"

import CircularProgress from '@mui/material/CircularProgress';
import { BsPlusCircle } from "react-icons/bs"

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

import { createPost } from "../../features/post/postSlice"

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import "./postForm.css"

const PostForm = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading } = useSelector((state) => state.post)

  const [newPost, setNewPost] = useState({
    title: "",
    text: "",
    category: ""
  })

  const [image, setImage] = useState(null)
  const [message, setMessage] = useState("")
  const { title, text, category } = newPost

  const handleChange = (e) => {
    setNewPost((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (image && title && text && category) {
      const imageName = new Date().getTime() + image.name
      const storage = getStorage(app)
      const storageRef = ref(storage, imageName)
      const uploadTask = uploadBytesResumable(storageRef, image);

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
            const post = { title, text, category, image: downloadURL }
            dispatch(createPost(post))
            navigate("/")
          });
        }
      );
    }
    if (!image && title && text && category) {
      const post = { title, text, category }
      dispatch(createPost(post))
      navigate("/")
    }

    if (!title && !text && !category) {
      setMessage("Please add all fields")
    }
  }

  return (
    <section className="postForm-container">
      <div className="postForm">
        <div className="postForm-img-wrapper">
          <img src={image ? URL.createObjectURL(image) : initialImg} alt="" className="postForm-img" />
        </div>
        <form onSubmit={handleSubmit} className="postForm-form" >
          <div className="postForm-input-grp">
            <label htmlFor="input-file"><BsPlusCircle className="postForm-icon" /></label>
            <input type="file" id="input-file" onChange={(e) => setImage(e.target.files[0])} />
            <input type="text" className="input-title" name="title" value={title} onChange={handleChange} placeholder="Title" autoFocus={true} />
          </div>
          <div className="postForm-input-grp">
            <textarea className="postForm-textarea" name="text" value={text} onChange={handleChange} placeholder="What do you think?"></textarea>
          </div>
          <div className="postForm-input-grp">
            <div className="postForm-message" >{message}</div>
            <select name="category" className="postForm-select" value={category} onChange={handleChange}>
              <option className="postForm-option" value="Software">Software</option>
              <option className="postForm-option" value="Nature">Nature</option>
              <option className="postForm-option" value="Music">Music</option>
              <option className="postForm-option" value="Sport">Sport</option>
              <option className="postForm-option" value="Astronomy">Astronomy</option>
              <option className="postForm-option" value="Art">Art</option>
            </select>
            <button type="submit" className="postForm-btn">{isLoading ? <CircularProgress size={16} color="inherit" /> : "Publish"}</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default PostForm