import React, { useState } from "react";
import {Link} from "react-router-dom";
import { NWHorizontal2Color } from 'assets'
import styled from "styled-components"

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import '../../colors.css'
import './SideNav.css'

const Divider = styled.hr`
  width: 85%;
  background-color: aqua;
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

const StyledMenuItem = withStyles((theme) => ({
    root: {
        // paddingRight: '3rem',
        // paddingLeft: '3rem',
        '&:focus': {
            backgroundColor: 'lightgray',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: 'black',
            },
        },
    },
}))(MenuItem);


export function SideNav() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div className='sidenav'>
            <div className='sidenav__logo'>
                <img src={NWHorizontal2Color} alt='NW_Horizontal_2Color' />
            </div>
            <Divider />
            <div className='sidenav__link'>
                <Link to='#'><i className="fas fa-tachometer-alt" /> Dashboard</Link>
            </div>
            <Divider />
            <div className='sidenav__popup'>
                <Link
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    <i className="fas fa-folder" /> Reports
                </Link>
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
        </div>
    )
}
