
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa"
import { RiInstagramFill, RiMailAddFill } from "react-icons/ri"

import avatar from "../../assets/avatar.png"

import { Link, useLocation } from "react-router-dom"

import "./blogger.css"

const Blogger = ({ user }) => {

  const location = useLocation()
  return (
    <div className="blogger">
      <div className="blogger-top">
        {location.pathname.startsWith("/@") ?
          <h2 className="blogger-username">{user?.username}</h2> :
          <Link to={`/@${user?.username}-${user?.id}`}  ><h2 className="blogger-username">{user?.username}</h2></Link>}
        {location.pathname.startsWith("/@") ? <div className="blogger-user-img-wrapper">
          <img src={user?.userPhoto || avatar} className="blogger-user-img" alt="" />
        </div> : <Link to={`/@${user?.username}-${user?.id}`}>
          <div className="blogger-user-img-wrapper">
            <img src={user?.userPhoto || avatar} className="blogger-user-img" alt="" />
          </div>
        </Link>}
      </div>
      <div className="blogger-info">
        <div className="blogger-user-bio">{user?.bio}</div>
        <div className="blogger-user-follow">
          <span>56.4K Followers</span>
        </div>
      </div>
      <div className="blogger-social-icons">
        <RiMailAddFill className="blogger-social-icon" />
        <a href="https://instagram.com">
          <RiInstagramFill className="blogger-social-icon" />
        </a>
        <a href="https://facebook.com">
          <FaFacebook className="blogger-social-icon" />
        </a>
        <a href="https://twitter.com">
          <FaTwitter className="blogger-social-icon" />
        </a>
        <a href="https://youtube.com">
          <FaYoutube className="blogger-social-icon" />
        </a>
      </div>
    </div>
  )
}
export default Blogger