
import Blogger from "../blogger/Blogger"
import Topics from "../topics/Topics"
import Search from "../search/Search"
import Footer from "../footer/Footer"

import { useLocation } from "react-router-dom"

import "./rightSide.css"

const RightSide = ({ user }) => {

  const location = useLocation().pathname
  
  return (
    <section className="rightSide-container">
      {location === "/" ?
        <Search /> :
        <Blogger user={user} />
      }
      <Topics />
      <Footer />
    </section>
  )
}
export default RightSide