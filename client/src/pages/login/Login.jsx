
import CircularProgress from '@mui/material/CircularProgress';

import { login } from "../../features/currentUser/currentUserSlice"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import "./login.css"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: ""
  })
  const { email, password } = loginUser

  const { user, isSuccess, isLoading, isError } = useSelector((state) => state.currentUser)

  useEffect(() => {
    if ((user || isSuccess) && (!isError)) {
      navigate("/")
    }
  }, [user, isSuccess, isError, navigate])

  const handleChange = (e) => {
    setLoginUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(loginUser))
    setTimeout(() => {
      if (user && !isLoading && !isError) {
        navigate("/")
      }
    }, [2000]);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form" >
        <h2 className="login-title">Login</h2>
        <div className="input-grp">
          <label htmlFor="" className="login-label">Email</label>
          <input type="email" className="login-input" value={email} name="email" onChange={handleChange} />
        </div>
        <div className="input-grp">
          <label htmlFor="" className="login-label">Password</label>
          <input type="password" className="login-input" value={password} name="password" onChange={handleChange} />
        </div>
        <button type="submit" className="login-btn" disabled={!email || !password}>{isLoading ? <CircularProgress size={16} color="inherit" /> : "Login"}</button>
        <Link to="/" className="return-btn">x</Link>
        <span className="login-f-password">Did you forget your password?</span>
        <span className="login-to-register-page">Don't have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}
export default Login