

import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa"
import { RiInstagramFill, RiMailAddFill, RiMoreFill } from "react-icons/ri"

import Navbar from "../../components/navbar/Navbar"
import Blogger from "../../components/blogger/Blogger"
import Posts from "../../components/posts/Posts"

import { getUser } from "../../features/user/userSlice"
import { getUserPosts } from "../../features/post/postSlice"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import "./profile.css"

const Profile = () => {

  const dispatch = useDispatch()

  const { username } = useParams()
  const userId = username.split("-")[1]

  useEffect(() => {
    dispatch(getUser(userId))
    dispatch(getUserPosts(userId))
  }, [dispatch, userId])

  const { posts } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.user)
  const currentUser = useSelector((state) => state.currentUser.user)

  return (
    < >
      <Navbar />
      <section className="profile-container">
        <div className="profile">
          <div className="profile-about-container">
            <div className="profile-about">
              <div className="profile-about-top">
                <h1 className="profile-h1">{user._id === currentUser?.id ? currentUser.username : user.username}</h1>
                <span>
                  <RiMoreFill className="profile-about-top-icon" />
                </span>
              </div>
              <div className="profile-bp">About</div>
              <div className="profile-img-wrapper">
                <img src={user._id === currentUser?.id ? currentUser.userPhoto : user.userPhoto} className="profile-img" alt="" />
              </div>
              <div className="profile-info">
                <p className="profile-bio">{user._id === currentUser?.id ? currentUser.bio : user.bio}</p>
              </div>
              <div className="profile-since">
                <span>Ankrom member since {user._id === currentUser?.id ? new Date(currentUser.createdAt).toDateString() : new Date(user.createdAt).toDateString()}</span>
              </div>
              <div className="profile-flw">
                <span>56.4K Followers</span>
                <span>34 Following</span>
              </div>
              <div className="profile-connect">
                <span>Connect with {user.username}</span>
                <div className="profile-connect-icons">
                  <a href="https://twitter.com"><FaTwitter className="profile-connect-icon" /></a>
                  <a href="https://facebook.com"><FaFacebook className="profile-connect-icon" /></a>
                  <a href="https://instagram.com"><RiInstagramFill className="profile-connect-icon" /></a>
                  <a href="https://youtube.com"><FaYoutube className="profile-connect-icon" /></a>
                </div>
              </div>
              {user._id !== currentUser?.id &&
              <div className="profile-mail">
                <h2 className="profile-h2">Get an email whenever {user.username} publishes.</h2>
                <div className="profile-email-subs">
                  <button className="profile-mail-btn"><RiMailAddFill className="profile-mail-icon" /> <span>Subscribe</span></button>
                  <p className="profile-email-send">Emails will be sent to {user.email}</p>
                </div>
              </div>}
            </div>
            <div className="profile-stories">
              <div className="profile-bp">Stories</div>
              <Posts posts={posts} />
            </div>
          </div>
          <Blogger user={user._id === currentUser?.id ? currentUser : user} />
        </div>
      </section>
    </>
  )
}
export default Profile