import React, { useContext, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { NavLink, Redirect } from 'react-router-dom';
import UserLogo from "../../style/svg/usericon.svg"
import HomeLogo from "../../style/svg/home.svg"
import AuthContext from '../../auth.js'
import hotdog from '../../style/images/hotdoguploadblack.png'


function RightNav(){
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const { fetchWithCSRF, setCurrentUserId, currentUserId } = useContext(AuthContext);
    const [user, setUser] = useState({});

    useEffect(() =>{
      async function fetchUser() {
          const response = await fetch(`/api/users/${currentUserId}`);
          const responseData = await response.json();
          setUser(responseData.user);
      }
      fetchUser();
    }, [currentUserId])


    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    const logoutUser = async ()=> {
      const response = await fetchWithCSRF('/logout', {
          method: 'POST',
          credentials: 'include'
      });
      if(response.ok){
          setCurrentUserId(null)
          // return (<Redirect to='/login' />)
      }
  }

    // const handleLogOut = (event) => {
    //     if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //         return
    //     }
    //     setOpen(false);

    //     return (<Redirect to='/login' />)
    // };

    const handleProfile = (event) => {
        setOpen(false);

        return <Redirect to={`/${user.username}`} />
    };


    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);



    return(
        <div className="rightnav">
            <div >
              <NavLink to='/feed' >
                <Button
                  onClick={() => <Redirect to='/feed' />}
                >
                  <img src={HomeLogo} alt=''/>
                </Button>
              </NavLink>
            </div>
            <div >
              <NavLink to="/posts/new" activeclass="active" >
                <Button
                  onClick={() => <Redirect to="/posts/new" />}
                >
                  <img id="hotdogupload" src={hotdog} alt=''/>
                </Button>
              </NavLink>
            </div>
            <div>
                <Button
                    id="settings"
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                  <img src={UserLogo} alt='' />
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleProfile}><NavLink to={`/users/${user.username}`} id='navlink-profile'>Profile</NavLink></MenuItem>
                                    <MenuItem onClick={logoutUser}><NavLink to='/login' id='navlink-logout'>Logout</NavLink></MenuItem>
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    )
}

export default RightNav;
