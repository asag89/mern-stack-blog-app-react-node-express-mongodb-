
import CircularProgress from '@mui/material/CircularProgress';

import { register } from "../../features/currentUser/currentUserSlice"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import "./register.css"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  const { username, email, password } = registerUser

  const { user, isSuccess, isLoading, isError } = useSelector((state) => state.currentUser)

  useEffect(() => {
    if ((user || isSuccess) && (!isError)) {
      navigate("/")
    }
  }, [user, isSuccess, isError, navigate])

  const handleChange = (e) => {
    setRegisterUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(register(registerUser))
    setTimeout(() => {
      if (user && !isLoading && !isError) {
        navigate("/")
      }
    }, [2000]);
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form" >
        <h2 className="register-title">Register</h2>
        <div className="input-grp">
          <label htmlFor="" className="register-label">Username</label>
          <input type="text" className="register-input" value={username} name="username" onChange={handleChange} autoComplete="off" />
        </div>
        <div className="input-grp">
          <label htmlFor="" className="register-label">Email</label>
          <input type="email" className="register-input" value={email} name="email" onChange={handleChange} autoComplete="off" />
        </div>
        <div className="input-grp">
          <label htmlFor="" className="register-label">Password</label>
          <input type="password" className="register-input" value={password} name="password" onChange={handleChange} autoComplete="off" />
        </div>
        <button type="submit" className="register-btn" disabled={!username || !email || !password}>{isLoading ? <CircularProgress size={16} color="inherit" /> : "Register"}</button>
        <Link to="/" className="return-btn">x</Link>
        <span className="register-f-password">By signing up, you agree to the Terms.</span>
        <span className="register-to-login-page">Do you have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register