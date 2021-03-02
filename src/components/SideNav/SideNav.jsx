import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NWHorizontal2Color, NWTripleStacked2Color } from 'assets'
import styled from "styled-components"

import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

import '../../colors.css'
import './SideNav.css'

const Divider = styled.hr`
  width: 85%;
  opacity: 50%;
`

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(() => ({
    root: {
        '&:focus': {
            backgroundColor: 'lightgray',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: 'black',
            },
        },
    },
}))(MenuItem);

export function SideNav({role, handleClick, handleClose, closeSideNav, openSideNav, anchorEl, setAnchorEl, down, setDown, navOpen, setNavOpen}) {

    // const [anchorEl, setAnchorEl] = useState(null);
    // const [down, setDown] = useState(false)
    // const [navOpen, setNavOpen] = useState('0')
    //
    // const handleClick = (e) => {
    //     setDown(!down)
    //     setAnchorEl(e.currentTarget);
    // };
    //
    // const handleClose = () => {
    //     setAnchorEl(null);
    //     setDown(!down)
    // };
    //
    // const closeSideNav = () => {
    //     setNavOpen('-20%')
    // }
    //
    // const openSideNav = () => {
    //     setNavOpen('0')
    // }

    return(
        <div className='container'>
            <div className='sidenav' style={{left: navOpen}}>
                <div className='sidenav__logo'>
                    <img src={NWHorizontal2Color} alt='NW_Horizontal_2Color' />
                </div>
                <Divider />
                {role !== 'Student' &&
                <>
                    <div className='sidenav__link'>
                        <Link to='#'><i className="fas fa-tachometer-alt" /> Dashboard</Link>
                    </div>
                    <Divider />
                </>
                }
                <div className='sidenav__popup'>
                    {role === 'Admin' &&
                    <Link
                        to='#'
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >
                        <i className="fas fa-folder" /> Reports
                        {
                            down ? <i className="fas fa-chevron-down left" />
                                :
                                <i className="fas fa-chevron-right left" />
                        }
                    </Link>
                    }
                    {role === 'Faculty' &&
                    <Link to='#'>
                        <i className="fas fa-folder" /> Applications
                    </Link>
                    }

                    {role === 'Student' &&
                    <>
                        <Link to='#'>
                            <i className="fas fa-plus-square" /> New Application
                        </Link>
                        <Link to='#'>
                            <i className="fas fa-folder-open" /> Check Status
                        </Link>
                    </>
                    }
                </div>
                <div>
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <StyledMenuItem>
                            <ListItemText primary="Summary Report" />
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <ListItemText primary="Location Report" />
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <ListItemText primary="Major Report" />
                        </StyledMenuItem>
                    </StyledMenu>
                </div>

                <div className='sidenav__btn'>
                    <button onClick={closeSideNav}><i className="fas fa-chevron-left" /></button>
                </div>
            </div>
            {navOpen >= '-15%' &&
            <div className='sidenav__collapsed'>
                <div className='sidenav__collapsed__logo'>
                    <img src={NWTripleStacked2Color} alt='NW_Horizontal_2Color' />
                </div>
                {role !== 'Student' &&
                <div className='sidenav__collapsed__icon'>
                    <Link to='#'><i className="fas fa-tachometer-alt" /></Link>
                </div>
                }
                <div className='sidenav__collapsed__icon'>
                    {role === 'Admin' &&
                    <Link
                        to='#'
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >
                        <i className="fas fa-folder" />
                    </Link>
                    }
                    {role === 'Faculty' &&
                    <Link to='#'>
                        <i className="fas fa-folder" />
                    </Link>
                    }

                    {role === 'Student' &&
                    <>
                        <Link to='#'>
                            <i className="fas fa-plus-square" />
                        </Link>
                        <Link to='#'>
                            <i className="fas fa-folder-open" />
                        </Link>
                    </>
                    }
                </div>
                <div className='sidenav__btn'>
                    <button onClick={openSideNav}><i className="fas fa-chevron-right" /></button>
                </div>
            </div>
            }
        </div>
    )}
