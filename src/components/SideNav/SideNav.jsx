import React, { useState } from "react";
import {Link} from "react-router-dom";
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


export function SideNav({isAdmin, isFaculty, isStudent}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [down, setDown] = useState(false)
    const [navWidth, setNavWidth] = useState('300px')
    const [navWidthLeft, setNavWidthLeft] = useState('0')

    const handleClick = (e) => {
        setDown(!down)
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setDown(!down)
    };

    const closeSideNav = () => {
        setNavWidth('0px')
    }

    const openSideNav = () => {
        setNavWidth('300px')
    }

    const closeSideNavLeft = () => {
        setNavWidthLeft('-300px')
    }

    const openSideNavLeft = () => {
        setNavWidthLeft('0')
    }

    return(
        <div className='container'>
            <div className='sidenav' style={{width: navWidth, left: navWidthLeft}}>
                <div className='sidenav__logo'>
                    <img src={NWHorizontal2Color} alt='NW_Horizontal_2Color' />
                </div>
                <Divider />
                {!isStudent &&
                    <>
                        <div className='sidenav__link'>
                            <Link to='#'><i className="fas fa-tachometer-alt" /> Dashboard</Link>
                        </div>
                        <Divider />
                    </>
                }
                <div className='sidenav__popup'>
                    {isAdmin &&
                        <Link
                            to='#'
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                        >
                            <i className="fas fa-folder" /> Reports {down ? <i className="fas fa-chevron-down left" /> : <i className="fas fa-chevron-right left" /> }
                        </Link>
                    }
                    {isFaculty &&
                        <Link to='#'>
                            <i className="fas fa-folder" /> Applications
                        </Link>
                    }

                    {isStudent &&
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

                <div className='sidenav__btn__close'>
                    <button onClick={closeSideNavLeft}><i className="fas fa-chevron-left" /></button>
                </div>
            </div>
            <div
                className='sidenav__collapsed'
                onClick={openSideNavLeft}
            >
                <div className='sidenav__collapsed__logo'>
                    <img src={NWTripleStacked2Color} alt='NW_Horizontal_2Color' />
                </div>
                {!isStudent &&
                <>
                    <div className='sidenav__collapsed__icon'>
                        <Link to='#'><i className="fas fa-tachometer-alt" /></Link>
                    </div>
                    {/*<Divider />*/}
                </>
                }
                <div className='sidenav__collapsed__icon'>
                    {isAdmin &&
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
                    {isFaculty &&
                    <Link to='#'>
                        <i className="fas fa-folder" />
                    </Link>
                    }

                    {isStudent &&
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
                <div className='sidenav__btn__close'>
                    <button onClick={openSideNav}><i className="fas fa-chevron-right" /></button>
                </div>
            </div>
            {/*{navWidth === '0px' &&*/}
            {/*    <div className='sidenav__btn__open'>*/}
            {/*        <button onClick={openSideNav}><i className="fas fa-chevron-right" /></button>*/}
            {/*    </div>*/}
            {/*}*/}
        </div>
    )
}
