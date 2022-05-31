
import { GrSearch } from "react-icons/gr"
import "./search.css"

const Search = () => {
  return (
    <div className="search-container">
      <button className="search-upgrade-btn">Get unlimited access</button>
      <span className="search-input-wrapper">
        <GrSearch className="search-icon" />
        <input type="text" className="search-input" placeholder="Search" />
      </span>
    </div>
  )
}
export default Search