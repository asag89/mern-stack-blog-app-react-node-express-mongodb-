
import { FiTrendingUp } from "react-icons/fi"

import Banner from "../../components/banner/Banner"
import Posts from "../../components/posts/Posts"
import RightSide from "../../components/rightSide/RightSide"
import Navbar from "../../components/navbar/Navbar"

import { getAllPosts } from "../../features/post/postSlice"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import "./home.css"

const Home = () => {
  const dispatch = useDispatch()
  const { posts, isLoading } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.currentUser)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  return (
    <div className="container">
      <Navbar />
      <Banner />
      <div className="home-container">
        <div className="home">
          <div>
            <div className="trending">
              <FiTrendingUp />
              <h4>TRENDING ON ANKROM</h4>
            </div>
            <Posts posts={posts} isLoading={isLoading} />
          </div>
          <RightSide user={user} />
        </div>
      </div>
    </div>
  )
}

export default Home