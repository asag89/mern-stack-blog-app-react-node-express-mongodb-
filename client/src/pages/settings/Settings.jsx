
import Navbar from "../../components/navbar/Navbar"
import Account from "../../components/account/Account"

import "./settings.css"

const Settings = () => {
  return (
    <>
      <Navbar />
      <div className="settings-container">
        <Account />
      </div>
    </>
  )
}
export default Settings