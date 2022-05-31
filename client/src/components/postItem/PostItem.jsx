
import avatar from "../../assets/avatar.png"
import { BsBookmarkPlus } from "react-icons/bs"
import { RiEdit2Fill, RiDeleteBin2Line, RiMoreFill } from "react-icons/ri"
import { FaRegComment } from "react-icons/fa"

import { deletePost } from "../../features/post/postSlice"

import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"

import "./postItem.css"

const PostItem = ({ post }) => {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.currentUser)
  const location = useLocation().pathname

  return (
    <div className="post-container">
      <div className="post">
        <div className="post-top">
          <div className="post-top-user">
            <Link to={`/@${post?.username}-${post?.user}`}>
              <img src={post.userPhoto || avatar} alt="" className="post-top-img" />
            </Link>
            <Link to={`/@${post?.username}-${post?.user}`}>
              <span className="post-top-username">{post.username}</span>
            </Link>
          </div>
          <BsBookmarkPlus className="post-top-icon" />
        </div>
        {post.image &&
        <Link to={`/${post.title.replace(" ", "-").toLowerCase()}_${post?._id}`} className="post-link">
          <img src={post.image} className="post-img" alt="" />
        </Link>}
        {location.startsWith("/@") && post.user === user?.id &&
          <div className="post-settings">
            <div className="post-settings-item">
              <RiEdit2Fill className="post-settings-icon" />
            </div>
            <div className="post-settings-item">
              <FaRegComment className="post-settings-icon" />
            </div>
            <div className="post-settings-item" onClick={() => dispatch(deletePost(post._id))} title="Delete this stories" >
              <RiDeleteBin2Line className="post-settings-icon" />
            </div>
            <div className="post-settings-item">
              <RiMoreFill className="post-settings-icon" />
            </div>
          </div>}
        <div className="post-content">
          <h2 className="post-h2">{post.title}</h2>
          <div className="post-text-h">{post.text}</div>
          <span className="post-time">{new Date(post.createdAt).toDateString()}</span>
          <div className="post-cats">
            <span className="post-cat">{post.category}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem