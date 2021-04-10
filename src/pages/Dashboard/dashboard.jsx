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
    const [tableError, setTableError] = useState({
        "error": new Error
    })

    const [user, setUser] = useState({
        "username": '',
        "role": ''
    })
    const [applications, setApplications] = useState([])
    const [internships, setInternships] = useState([])

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

    useEffect(() => {
        fetch(`/api/getApplications/${userID}`)
            .then(res => {
                if (res.ok) {
                    // api returned status 200, so we return the response
                    return res.json()
                } else {
                    // api returned code 400, so we throw an error to catch later
                    throw new Error('Something went wrong fetching your data...')
                }
            })
            .then((data) => {
                // console.log(error)
                console.log(data)
                setApplications(data.applications)
                setInternships(data.internships)
            }).catch((error) => {
            console.log(error)
            setTableError({error: error})
        });
    }, []);

    console.log(applications)
    console.log(internships)
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
                applications={applications}
                internships={internships}
                tableError={tableError}
                isOpen={isOpen}
                isAppFormVisible={isAppFormVisible}
            />
        </>
    )

}

export { Dashboard }
