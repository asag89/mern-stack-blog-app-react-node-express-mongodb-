
import avatar from "../../assets/avatar.png"

import { FiLink } from "react-icons/fi"
import { BsBookmarkPlus } from "react-icons/bs"
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"

import "./postDetails.css"

const PostDetails = ({ post }) => {
  return (
    <div className="postDetails">
      <div className="postDetails-top">
        <div className="postDetails-user">
          <img src={post.userPhoto || avatar} className="postDetails-user-image" alt="" />
          <div className="postDetails-info">
            <span className="postDetails-username">{post.username}</span>
            <span className="postDetails-date">{new Date(post.createdAt).toDateString()}</span>
          </div>
        </div>
        <div className="postDetails-top-icons">
          <div className="postDetails-top-social-icons">
            <a href="https://twitter.com">
              <FaTwitter className="postDetails-top-icon" title="Share on Twitter" />
            </a>
            <a href="https://facebook.com">
              <FaFacebook className="postDetails-top-icon" title="Share on Facebook" />
            </a>
            <a href="https://linkedin.com">
              <FaLinkedin className="postDetails-top-icon" title="Share on LinkedIn" />
            </a>
          </div>
          <FiLink className="postDetails-top-icon" onClick={() => { navigator.clipboard.writeText(window.location.href) }} title="Copy link" />
          <BsBookmarkPlus className="postDetails-top-icon" />
        </div>
      </div>
      <h1 className="postDetails-post-title">{post.title}</h1>
      <img src={post.image} alt="" className="postDetails-post-img" />
      <p className="postDetails-post-text">{post.text}</p>
    </div>
  )
}

export default PostDetails