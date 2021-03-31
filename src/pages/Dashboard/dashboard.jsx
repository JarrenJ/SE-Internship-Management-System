import React, {useState} from "react"
import { SideNav, DashboardPanel } from "components"

import '../../components/SideNav/SideNav.css'
import "./dashboard.css"
import "../../colors.css"

const Dashboard = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [down, setDown] = useState(false)
    const [navOpen, setNavOpen] = useState('0')

    const [isOpen, setIsOpen] = useState(true)
    const userRole = sessionStorage.getItem("role")

    const handleClick = (e) => {
        setDown(!down)
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setDown(!down)
    };

    const closeSideNav = () => {
        setNavOpen('-20%')
        console.log(isOpen)
        setIsOpen(false)
        console.log(isOpen)
    }

    const openSideNav = () => {
        setNavOpen('0')
        setIsOpen(true)
    }

    return(
        <div className='dashboard__container__1'>
            <SideNav
                role={userRole}
                handleClick={handleClick}
                handleClose={handleClose}
                closeSideNav={closeSideNav}
                openSideNav={openSideNav}
                down={down}
                setDown={setDown}
                navOpen={navOpen}
                setNavOpen={setNavOpen}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
            />
            <DashboardPanel
                isOpen={isOpen}
                closeSideNav={closeSideNav}
                openSideNav={openSideNav}
            />
        </div>
    )

}

export { Dashboard }
