import React, {useEffect, useState} from "react"
import { SideNav, DashboardPanel } from "components"

const Dashboard = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [down, setDown] = useState(false)
    const [navOpen, setNavOpen] = useState('0')

    const [isOpen, setIsOpen] = useState(true)
    // const userRole = sessionStorage.getItem("role")
    const userID = sessionStorage.getItem("userID")
    const [isAppFormVisible, setIsAppFormVisible] = useState(false)

    const [user, setUser] = useState({
        "username": '',
        "role": ''
    })

    useEffect(() => {
        fetch(`/api/getUser/${userID}`)
            .then(response => response.json())
            .then(data =>
                setUser({
                    "username": data.username,
                    "role": data.role
                })
            );
    }, []);

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

    const showAppForm = () => {
        setIsAppFormVisible(!isAppFormVisible)
    }

    return(
        <>
            <SideNav
                role={user.role}
                handleClick={handleClick}
                handleClose={handleClose}
                closeSideNav={closeSideNav}
                openSideNav={openSideNav}
                down={down}
                navOpen={navOpen}
                anchorEl={anchorEl}
                showAppForm={showAppForm}
                isAppFormVisible={isAppFormVisible}
            />
            <DashboardPanel
                role={user.role}
                username={user.username}
                isOpen={isOpen}
                isAppFormVisible={isAppFormVisible}
            />
        </>
    )

}

export { Dashboard }
