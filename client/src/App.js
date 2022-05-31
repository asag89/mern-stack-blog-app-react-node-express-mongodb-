
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Post from "./pages/singlePost/SinglePost";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/@:username" element={<Profile />} />
        <Route path="/:postId" element={<Post />} />
        <Route path="/creators" element={<Write />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
export default App;
