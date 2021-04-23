import React, {useState} from "react";
import { Divide as Hamburger } from 'hamburger-react'
import {Link} from "react-router-dom";

import { COLORS, ROLES } from 'utils'
import './MobileNav.css'

export function MobileNav({role, showAppForm}) {
    const [click, setClick] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState('-100%')

    const handleMenuClick = () => {
        console.log(click)
        setClick(!click)
        console.log(click)
        setIsMobileOpen(click ? '-100%' :'0')
        console.log(isMobileOpen)
    }

    return(
        <>
            <div className='sidenav__hamburger__icon' onClick={handleMenuClick}>
                <Hamburger size={30} color={COLORS.BLACK}/>
            </div>

            <div className='sidenav__mobile__container' style={{left: isMobileOpen}}>
                <div className='sidenav__mobile__links'>
                    {role !== ROLES.STUDENT &&
                        <div className='sidenav__mobile__link'>
                            <p onClick={handleMenuClick}><i className="fas fa-tachometer-alt"/> Dashboard</p>
                        </div>
                    }
                    {role === ROLES.ADMIN &&
                        <div className='sidenav__mobile__link'>
                            <Link
                                to='#'
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                variant="contained"
                                color="primary"
                            >
                                <i className="fas fa-folder"/> Reports
                            </Link>
                        </div>
                    }
                    {role === ROLES.STUDENT &&
                        <>
                            <div className='sidenav__mobile__link'>
                                <p onClick={() => {
                                    showAppForm()
                                    handleMenuClick()
                                }}>
                                    <i className="fas fa-plus-square" /> New Application
                                </p>
                            </div>
                            <div className='sidenav__mobile__link'>
                                <p>
                                    <i className="fas fa-folder-open" /> Check Status
                                </p>
                            </div>
                        </>
                    }
                    {role === ROLES.FACULTY &&
                        <div className='sidenav__mobile__link'>
                            <Link to='#'>
                                <i className="fas fa-folder"/> Applications
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
