import React, {useEffect, useState} from "react"
import { SideNav, DashboardPanel } from "components"

const Dashboard = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [down, setDown] = useState(false)
    const [navOpen, setNavOpen] = useState('0')

    const [isSideNavOpen, setIsSideNavOpen] = useState(true)
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
    const [currentApplication, setCurrentApplication] = useState()

    const [totalFacultyInterns, setTotalFacultyInterns] = useState(0)
    const [activeFacultyInterns, setActiveFacultyInterns] = useState(0)
    const [pendingFacultyApprovals, setPendingFacultyApprovals] = useState(0)
    const [outOfStateInternsFaculty, setOutOfStateInternsFaculty] = useState(0)
    const [inStateInternsFaculty, setInStateInternsFaculty] = useState(0)


    useEffect(() => {
        fetch(`/api/getUser/${userID}`)
          .then(response => response.json())
          .then(data => {
                setUser({
                    "username": data.username,
                    "role": data.role
                })
                fetch(`/api/getFullApplications/${data.role}/${data.username}`)
                  .then(res => {
                      if (res.ok) {
                          // api returned status 200, so we return the response
                          return res.json()
                      } else {
                          // api returned code 400, so we throw an error to catch later
                          throw new Error('Something went wrong fetching your data...')
                      }
                  })
                  .then((data1) => {
                      console.log(data1)
                      setApplications(data1.applications)
                      setInternships(data1.internships)
                      setUsers(data1.users)
                      setIsLoaded(true)
                  }).catch((error) => {
                    setIsLoaded(true)
                    console.log(error)
                    setTableError({ error: error })
                });
            }
          );
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

    useEffect(() => {
        fetch(`/api/getTotalFacultyInterns/${userID}`)
          .then(response => response.json())
          .then(data => {
              setTotalFacultyInterns(data.totalInterns)
          })
    }, [totalFacultyInterns])

    useEffect(() => {
        fetch(`/api/getTotalFacultyInternsActive/${userID}`)
          .then(response => response.json())
          .then(data => {
              setActiveFacultyInterns(data.ActiveInterns)
          })
    }, [activeFacultyInterns])

    useEffect(() => {
        fetch(`/api/getPendingFacultyApprovals/${userID}`)
          .then(response => response.json())
          .then(data => {
              setPendingFacultyApprovals(data.pendingApprovals)
          })
    }, [pendingFacultyApprovals])

    useEffect(() => {
        fetch(`/api/getOutOfStateInternsFaculty/${userID}`)
          .then(response => response.json())
          .then(data => {
              console.log(data[0].OutOfStateInterns)
              setOutOfStateInternsFaculty(data[0].OutOfStateInterns)
          })
    }, [outOfStateInternsFaculty])

    useEffect(() => {
        fetch(`/api/getInStateInternsFaculty/${userID}`)
          .then(response => response.json())
          .then(data => {
              console.log(data)
              setInStateInternsFaculty(data[0].InStateInterns)
          })
    }, [inStateInternsFaculty])

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
        console.log(isSideNavOpen)
        setIsSideNavOpen(false)
        console.log(isSideNavOpen)
    }

    const openSideNav = () => {
        setNavOpen('0')
        setIsSideNavOpen(true)
    }

    /* 
    The following three functions are passed into components so they can change the visibility of other components
    isAppFormVisible is used the in the conditional rendering of some items in Dashboard panel so 
    */
    const showAppForm = () => {
        setIsAppFormVisible(true)
        setIsApplicationTableVisible(false)
    }
    const hideAppForm = () => {
        setIsAppFormVisible(false)
        setCurrentApplication(undefined)
        setIsApplicationTableVisible(!isApplicationTableVisible)
        console.log(currentApplication)
    }
    const showApplicationTable = () => {
        setIsApplicationTableVisible(!isApplicationTableVisible)
        hideAppForm()
    }

    return (
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
            hideAppForm={hideAppForm}
            isAppFormVisible={isAppFormVisible}
            showApplicationTable={showApplicationTable}
            isApplicationTableVisible={isApplicationTableVisible}
            setCurrentApplication={setCurrentApplication}
          />
          {isLoaded && <DashboardPanel
            role={user.role}
            userID={user.username}
            users={users}
            applications={applications}
            internships={internships}
            tableError={tableError}
            totalInterns={totalInterns}
            totalFacultyInterns={totalFacultyInterns}
            pendingApprovals={pendingApprovals}
            pendingFacultyApprovals={pendingFacultyApprovals}
            activeInterns={activeInterns}
            activeFacultyInterns={activeFacultyInterns}
            outOfStateInterns={outOfStateInterns}
            outOfStateInternsFaculty={outOfStateInternsFaculty}
            inStateInternsFaculty={inStateInternsFaculty}
            isSideNavOpen={isSideNavOpen}
            showAppForm={showAppForm}
            hideAppForm={hideAppForm}
            showApplicationTable={showApplicationTable}
            isAppFormVisible={isAppFormVisible}
            isApplicationTableVisible={isApplicationTableVisible}
            currentApplication={currentApplication}
            setCurrentApplication={setCurrentApplication}
          />}
      </>
    )
}

export { Dashboard }
