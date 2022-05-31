
import Navbar from "../../components/navbar/Navbar"
import Blogger from "../../components/blogger/Blogger"
import PostDetails from "../../components/postDetails/PostDetails"

import { getPost } from "../../features/post/postSlice"
import { getUser } from "../../features/user/userSlice"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

import "./singlePost.css"

const Post = () => {

  const dispatch = useDispatch()
  const location = useLocation()

  const path = location.pathname.split("_")[1]

  const { post } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getPost(path))
    setTimeout(() => {
      dispatch(getUser(post.user))
    }, [1000])

  }, [dispatch, path, post.user])

  return (
    <div>
      <Navbar />
      <div className="singlePost-container">
        <div className="singlePost">
          <PostDetails post={post} />
          <Blogger user={user} />
        </div>
      </div>
    </div>
  )
}
export default Post