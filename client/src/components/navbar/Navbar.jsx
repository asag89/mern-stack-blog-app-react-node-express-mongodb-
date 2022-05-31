
import avatar from "../../assets/avatar.png"

import { FaRegBookmark, FaRegUserCircle } from "react-icons/fa"
import { RiSettings4Line } from "react-icons/ri"
import { MdLogout } from "react-icons/md"
import { BsPencilSquare } from "react-icons/bs"

import { logout, resetAuth } from "../../features/currentUser/currentUserSlice"

import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom";

import "./navbar.css"

const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.currentUser)

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogout = async () => {
    await dispatch(logout())
    await dispatch(resetAuth())
    navigate('/')
  }

  return (
    <nav className="nav-wrapper">
      <div className="nav">
        <Link to="/">
          <div className="nav-ank">Ankrom</div>
        </Link>
        <div className="nav-links">
          {/* burayı düzenle */}
          {!user && <Link to="/about" className="nav-link">About</Link>}

          {user ? <Link to="/creators" className="nav-link">
            <BsPencilSquare className="nav-icon" />
          </Link>
            :
            <Link to="/login" className="nav-link">Write</Link>
          }

          {user ?
            <Stack direction="row" spacing={2}>
              <div>
                <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  className="nav-btn"
                >
                  <img src={user?.userPhoto || avatar} alt="" className="nav-user-image" />
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom-start' ? 'left top' : 'left bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={handleClose} className="menu-item">
                              {/* burada linke tıklandığında bir onClick işlem ile bir state de user ın bilgileri oluşsun oradan veri alınsın */}
                              <Link to={`/@${user.username}-${user.id}`} className="menu-item-link">
                                <FaRegUserCircle className="menu-item-icon" />
                                <span>Profile</span>
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose} className="menu-item">
                              <FaRegBookmark className="menu-item-icon" />
                              <span>Lists</span>
                            </MenuItem>
                            <MenuItem onClick={handleClose} className="menu-item">
                              <Link to="/settings" className="menu-item-link">
                                <RiSettings4Line className="menu-item-icon" />
                                <span>Settings</span>
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={handleLogout} className="menu-item">
                              <MdLogout className="menu-item-icon" />
                              <span>Sign out</span>
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </Stack>
            : <Link to="/login" className="nav-link">Login</Link>
          }
          {!user && <Link to="/register" className="nav-link brd">
            Get Started
          </Link>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
