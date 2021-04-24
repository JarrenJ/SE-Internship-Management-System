import React from "react";
import { Link } from "react-router-dom";
import { NWHorizontal2Color, NWTripleStacked2Color } from 'assets'
import styled from "styled-components"

import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

import { ROLES } from 'utils'
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

export function SideNav({ role, closeSideNav, openSideNav, anchorEl,
    down, navOpen, showAppForm, showApplicationTable }) {
    /* 
    DEPRECATED functions and state for handling click for styled drop down 
    */
    /* const [anchorEl, setAnchorEl] = useState(null);
    const [down, setDown] = useState(false)
    const handleClick = (e) => {
        setDown(!down)
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setDown(!down)
    }; */

    return (
        <div className='container'>
            <div className='sidenav' style={{ left: navOpen }}>
                <div className='sidenav__logo'>
                    <img src={NWHorizontal2Color} alt='NW_Horizontal_2Color' />
                </div>
                <Divider />
                <div className='sidenav__popup'>

                    {role !== ROLES.STUDENT &&
                        <>
                            <p className='sidenav__p__click' onClick={showApplicationTable}>
                                <i className="fas fa-tachometer-alt" /> Show Dashboard
                            </p>
                            <p className='sidenav__p__click' onClick={showAppForm}>
                                <i className="fas fa-plus-square" /> New Application
                            </p>
                            <Divider />
                        </>
                    }
                    {role === ROLES.STUDENT &&
                        <>
                            <p className='sidenav__p__click' onClick={showAppForm}>
                                <i className="fas fa-plus-square" /> New Application
                            </p>
                            <p className='sidenav__p__click' onClick={showApplicationTable}>
                                <i className="fas fa-folder-open" /> Check Status
                            </p>
                        </>
                    }
                </div>
                {/*
                DEPRECATED dropdown as show in the system-doc for reports 
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
                </div> */}

                <div className='sidenav__btn'>
                    <button onClick={closeSideNav}><i className="fas fa-chevron-left" /></button>
                </div>
            </div>
            {navOpen >= '-15%' &&
                <div className='sidenav__collapsed'>
                    <div className='sidenav__collapsed__logo'>
                        <img src={NWTripleStacked2Color} alt='NW_Horizontal_2Color' />
                    </div>
                    <div className='sidenav__collapsed__icon'>
                        {role !== ROLES.STUDENT &&
                            <>
                                <p className='sidenav__p__click' onClick={showApplicationTable}>
                                    <i className="fas fa-tachometer-alt" /> 
                                </p>
                                <p className='sidenav__p__click' onClick={showAppForm}>
                                    <i className="fas fa-plus-square" />
                                </p>
                                <Divider />
                            </>
                        }
                        {role === ROLES.STUDENT &&
                            <>
                                <p className='sidenav__p__click' onClick={showAppForm}>
                                    <i className="fas fa-plus-square" />
                                </p>
                                <p className='sidenav__p__click' onClick={showApplicationTable}>
                                    <i className="fas fa-folder-open" />
                                </p>
                            </>
                        }
                    </div>
                    <div className='sidenav__btn'>
                        <button onClick={openSideNav}><i className="fas fa-chevron-right" /></button>
                    </div>
                </div>
            }
        </div>
    )
}
