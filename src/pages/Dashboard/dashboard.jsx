import React, {useEffect, useState} from "react"
import { SideNav, DashboardPanel } from "components"

const Dashboard = () => {
    // Size of SideNav
    const [navOpen, setNavOpen] = useState('0')
    // Boolean for side nav being open. Passed into DashboardPanel to determine width of panel
    const [isSideNavOpen, setIsSideNavOpen] = useState(true)
    
    const userID = sessionStorage.getItem("userID")
    const [user, setUser] = useState({
        "username": '',
        "role": ''
    })

    const [isAppFormVisible, setIsAppFormVisible] = useState(false)
    const [isApplicationTableVisible, setIsApplicationTableVisible] = useState(true)
    // Wait to load DashboardPanel until data is retrieved
    const [isDataRetrieved, setIsDataRetrieved] = useState(false)


    //Object of applications indexed by ApplicationID
    const [applications, setApplications] = useState([])
    //Object of internships indexed by InternshipID
    const [internships, setInternships] = useState([])
    //Object of users indexed by UserID
    const [users, setUsers] = useState([])
    const [currentApplication, setCurrentApplication] = useState()

    /* 
    These states hold values from the database for the dashboard panels.
    All values are integers
    */
    // Values for Admin Panels
    const [totalInterns, setTotalInterns] = useState(0)
    const [pendingApprovals, setPendingApprovals] = useState(0)
    const [activeInterns, setActiveInterns] = useState(0)
    const [outOfStateInterns, setOutOfStateInterns] = useState(0)

    // Values for Faculty Panels
    const [totalFacultyInterns, setTotalFacultyInterns] = useState(0)
    const [activeFacultyInterns, setActiveFacultyInterns] = useState(0)
    const [pendingFacultyApprovals, setPendingFacultyApprovals] = useState(0)
    const [outOfStateInternsFaculty, setOutOfStateInternsFaculty] = useState(0)
    const [inStateInternsFaculty, setInStateInternsFaculty] = useState(0)

    /* 
    This grabs all applications for the current user and stores them in data structures
    These data structures are used for loading currentApplication data in DetailsDialog 
    and DashboardPanel:getInitial()
    */
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
                      setIsDataRetrieved(true)
                  }).catch((error) => {
                    setIsDataRetrieved(true)
                    console.log(error)
                });
            }
          );
    }, []);

    /* 
    These useEffects gather all information for dashboard panels.
    We tried to put them in a object structure but ran into issues with state 
    */

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
    
    /* 
    Functions for handling the size of sidenav on dashboard
    */
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
    isAppFormVisible and isApplicationTableVisible are used in the conditional rendering on DashboardPanel
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
            closeSideNav={closeSideNav}
            openSideNav={openSideNav}
            navOpen={navOpen}
            showAppForm={showAppForm}
            hideAppForm={hideAppForm}
            isAppFormVisible={isAppFormVisible}
            showApplicationTable={showApplicationTable}
            isApplicationTableVisible={isApplicationTableVisible}
            setCurrentApplication={setCurrentApplication}
          />
          {isDataRetrieved && <DashboardPanel
            role={user.role}
            userID={user.username}
            users={users}
            applications={applications}
            internships={internships}

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
