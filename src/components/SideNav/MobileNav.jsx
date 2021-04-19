import React, { useState } from "react";

import './MobileNav.css'
import {Link} from "react-router-dom";

export function MobileNav({role, handleClick, down, showAppForm}) {
    const [click, setClick] = useState(false);
    const [isOpen, setIsOpen] = useState('-100%')
    // const handleMenuClick = () => setClick(!click);
    // const closeMobileMenu = () => setClick(false);

    const handleMenuClick = () => {
        console.log(click)
        setClick(!click)
        console.log(click)
        setIsOpen(click ? '-100%' :'0')
        console.log(isOpen)
    }

    return(
        <>
            <div className='sidenav__hamburger__icon' onClick={handleMenuClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>

            <div className='sidenav__mobile__container' style={{left: isOpen}}>
                <div className='sidenav__mobile__links'>
                    {role !== 'Student' &&
                        <div className='sidenav__mobile__link'>
                            <p className='sidenav__mobile__link' onClick={handleMenuClick}><i className="fas fa-tachometer-alt"/> Dashboard</p>
                        </div>
                    }
                    {role === 'Admin' &&
                        <div className='sidenav__mobile__link'>
                            <Link
                                to='#'
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                variant="contained"
                                color="primary"
                                onClick={handleClick}
                            >
                                <i className="fas fa-folder"/> Reports
                                {/*{*/}
                                {/*    down ? <i className="fas fa-chevron-down left" />*/}
                                {/*        :*/}
                                {/*        <i className="fas fa-chevron-right left" />*/}
                                {/*}*/}
                            </Link>
                        </div>
                    }
                    {role === 'Student' &&
                        <>
                            <div className='sidenav__mobile__link'>
                                <p className='sidenav__mobile__link' onClick={() => {
                                    showAppForm()
                                    handleMenuClick()
                                }}>
                                    <i className="fas fa-plus-square" /> New Application
                                </p>
                            </div>
                            <div className='sidenav__mobile__link'>
                                <p className='sidenav__mobile__link'>
                                    <i className="fas fa-folder-open" /> Check Status
                                </p>
                            </div>
                        </>
                    }
                    {role === 'Faculty' &&
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
