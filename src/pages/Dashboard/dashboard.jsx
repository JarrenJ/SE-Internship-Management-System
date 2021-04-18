import React, {useEffect, useState} from "react"
import { SideNav, DashboardPanel } from "components"

const Dashboard = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [down, setDown] = useState(false)
    const [navOpen, setNavOpen] = useState('0')

    const [isOpen, setIsOpen] = useState(true)
    const userID = sessionStorage.getItem("userID")
    const [isAppFormVisible, setIsAppFormVisible] = useState(false)
    const [isApplicationTableVisible, setIsApplicationTableVisible] = useState(true)
    const [tableError, setTableError] = useState({
        "error": new Error
    })

    const [user, setUser] = useState({
        "username": '',
        "role": ''
    })

    const [applications, setApplications] = useState([])
    const [internships, setInternships] = useState([])
    const [users, setUsers] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [totalInterns, setTotalInterns] = useState(0)
    const [pendingApprovals, setPendingApprovals] = useState(0)
    const [activeInterns, setActiveInterns] = useState(0)
    const [outOfStateInterns, setOutOfStateInterns] = useState(0)

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
    fetch(`/api/getFullApplications/Student/S528544`)
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
            console.log(data)
            setApplications(data.applications)
            setInternships(data.internships)
            setUsers(data.users)
            setIsLoaded(true)
        }).catch((error) => {
            setIsLoaded(true)
            console.log(error)
            setTableError({error: error})
        });
    }, []);
    

    // For below 3 codeblocks, I am planning on hitting one endpoint eventually to grab all necessary data

    useEffect(() => {
        fetch(`/api/getTotalInterns`)
            .then(response => response.json())
            .then(data => {
                setTotalInterns(data.totalInterns)
            })
    }, [totalInterns])

    useEffect(() => {
        fetch(`/api/getPendingApprovals`)
            .then(response => response.json())
            .then(data => {
                setPendingApprovals(data.pendingApprovals)
            })
    }, [pendingApprovals])

    useEffect(() => {
        fetch(`/api/getActiveInterns`)
            .then(response => response.json())
            .then(data => {
                setActiveInterns(data.activeInterns)
            })
    }, [activeInterns])

    useEffect(() => {
        fetch(`/api/getOutOfStateInterns`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setOutOfStateInterns(data.outOfStateInterns)
            })
    }, [outOfStateInterns])

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

    const showApplicationTable = () => {
        setIsApplicationTableVisible(!isApplicationTableVisible)
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
                showApplicationTable={showApplicationTable}
                isApplicationTableVisible={isApplicationTableVisible}
            />
            {isLoaded && <DashboardPanel
                role={user.role}
                userID={user.username}
                users={users}
                applications={applications}
                internships={internships}
                tableError={tableError}
                totalInterns={totalInterns}
                pendingApprovals={pendingApprovals}
                activeInterns={activeInterns}
                outOfStateInterns={outOfStateInterns}
                isOpen={isOpen}
                isAppFormVisible={isAppFormVisible}
                isApplicationTableVisible={isApplicationTableVisible}
            />}
        </>
    )
}

export { Dashboard }
