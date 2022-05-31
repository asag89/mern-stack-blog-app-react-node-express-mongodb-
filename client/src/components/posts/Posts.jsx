
import CircularProgress from '@mui/material/CircularProgress';
import PostItem from "../postItem/PostItem";
import "./posts.css"

const Posts = ({ posts, isLoading }) => {
  return (
    <section className="posts-container">
      {!isLoading ? <div className="posts">
        {posts.map((post, i) => (
          <PostItem post={post}  key={i}/>
        ))}
      </div> : <CircularProgress size={16} color="inherit" />}
    </section>
  )
}
export default Posts