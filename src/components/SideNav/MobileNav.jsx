import React, {useState} from "react";
import { Divide as Hamburger } from 'hamburger-react'
import {Link} from "react-router-dom";

import { COLORS, ROLES } from 'utils'
import './MobileNav.css'

export function MobileNav({role, showAppForm, showApplicationTable}) {
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
                        <>
                            <p className='sidenav__p__click' 
                                onClick={() => {
                                    showApplicationTable()
                                    handleMenuClick()}}>
                                <i className="fas fa-tachometer-alt" /> Show Dashboard
                            </p>
                            <p className='sidenav__p__click' 
                                onClick={() => {
                                    showAppForm()
                                    handleMenuClick()}}>
                                <i className="fas fa-plus-square" /> New Application
                            </p>
                        </>
                    }
                    {role === ROLES.STUDENT &&
                        <>
                            <p className='sidenav__p__click'
                                 onClick={() => {
                                    showAppForm()
                                    handleMenuClick()}}>
                                <i className="fas fa-plus-square" /> New Application
                            </p>
                            <p className='sidenav__p__click' 
                                onClick={() => {
                                    showApplicationTable()
                                    handleMenuClick()}}>
                                <i className="fas fa-folder-open" /> Check Status
                            </p>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
