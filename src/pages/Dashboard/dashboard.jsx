import React, {useState} from "react"
import { SideNav, DashboardPanel } from "components"

// import '../../components/SideNav/SideNav.css'
import "./dashboard.css"
import "../../colors.css"
import { Manlogo } from 'assets'
import { Hourglass } from 'assets'
import { airplane } from 'assets'
import { account } from 'assets'
import { map } from 'assets'


const Divider = styled.hr`
  width: 85%;
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

const StyledMenuItem = withStyles(() => ({
    root: {
        '&:focus': {
            backgroundColor: 'lightgray',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: 'black',
            },
        },
    },
}))(MenuItem);

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

function SideNav({role, handleClick, handleClose, closeSideNav, openSideNav, anchorEl, setAnchorEl, down, setDown, navOpen, setNavOpen}) {

    // const [anchorEl, setAnchorEl] = useState(null);
    // const [down, setDown] = useState(false)
    // const [navOpen, setNavOpen] = useState('0')
    //
    // const handleClick = (e) => {
    //     setDown(!down)
    //     setAnchorEl(e.currentTarget);
    // };
    //
    // const handleClose = () => {
    //     setAnchorEl(null);
    //     setDown(!down)
    // };
    //
    // const closeSideNav = () => {
    //     setNavOpen('-20%')
    // }
    //
    // const openSideNav = () => {
    //     setNavOpen('0')
    // }

    return(
        <div className='container'>
            <div className='sidenav' style={{left: navOpen}}>
                <div className='sidenav__logo'>
                    <img src={NWHorizontal2Color} alt='NW_Horizontal_2Color' />
                </div>
                <Divider />
                {role !== 'Student' &&
                <>
                    <div className='sidenav__link'>
                        <Link to='#'><i className="fas fa-tachometer-alt" /> Dashboard</Link>
                    </div>
                    <Divider />
                </>
                }
                <div className='sidenav__popup'>
                    {role === 'Admin' &&
                    <Link
                        to='#'
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >
                        <i className="fas fa-folder" /> Reports
                        {
                            down ? <i className="fas fa-chevron-down left" />
                                :
                                <i className="fas fa-chevron-right left" />
                        }
                    </Link>
                    }
                    {role === 'Faculty' &&
                    <Link to='#'>
                        <i className="fas fa-folder" /> Applications
                    </Link>
                    }

                    {role === 'Student' &&
                    <>
                        <Link to='#'>
                            <i className="fas fa-plus-square" /> New Application
                        </Link>
                        <Link to='#'>
                            <i className="fas fa-folder-open" /> Check Status
                        </Link>
                    </>
                    }
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

                <div className='sidenav__btn'>
                    <button onClick={closeSideNav}><i className="fas fa-chevron-left" /></button>
                </div>
            </div>
            {navOpen >= '-15%' &&
            <div className='sidenav__collapsed'>
                <div className='sidenav__collapsed__logo'>
                    <img src={NWTripleStacked2Color} alt='NW_Horizontal_2Color' />
                </div>
                {role !== 'Student' &&
                <div className='sidenav__collapsed__icon'>
                    <Link to='#'><i className="fas fa-tachometer-alt" /></Link>
                </div>
                }
                <div className='sidenav__collapsed__icon'>
                    {role === 'Admin' &&
                    <Link
                        to='#'
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >
                        <i className="fas fa-folder" />
                    </Link>
                    }
                    {role === 'Faculty' &&
                    <Link to='#'>
                        <i className="fas fa-folder" />
                    </Link>
                    }

                    {role === 'Student' &&
                    <>
                        <Link to='#'>
                            <i className="fas fa-plus-square" />
                        </Link>
                        <Link to='#'>
                            <i className="fas fa-folder-open" />
                        </Link>
                    </>
                    }
                </div>
                <div className='sidenav__btn'>
                    <button onClick={openSideNav}><i className="fas fa-chevron-right" /></button>
                </div>
            </div>
            }
        </div>
    )}


export function Dashboard({isOpen, openSideNav, closeSideNav}) {

    // const userRole = sessionStorage.getItem("role")

    return (
        <>
            {/*<SideNav role={userRole} />*/}
            <div className="dashboard__container" style={{left: isOpen ? '20%' : '3.5%', width: isOpen ? `calc(100% - 20%)` : `calc(100% - 3.5%)`}}>
                <div className="dashboard__row">
                    <div className="dashboard__column__no__margin">
                        <div className="dashboard__Header">
                            <div className='dashboard__row'>
                                <div className='dashboard__column'>
                                    <img src={ account } alt='account.png'/>
                                    <div className="Header_Namebox">
                                        <button onClick={openSideNav}>Open</button>
                                        <button onClick={closeSideNav}>Closed</button>
                                        <p>{isOpen ? 'open' : 'closed'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p>Dashboard</p>
                <div className='dashboard__row'>
                    <div className='dashboard__column__4'>
                        <div className="dashboard__Button1">
                            <p>Total Interns</p><img src={ Manlogo } alt='Manlogo.png'/><p>4</p>
                        </div>
                    </div>
                    <div className='dashboard__column__4'>
                        <div className="dashboard__Button2">
                            <p>Active Interns</p><img src={ Manlogo } alt='Manlogo.png'/><p>2</p>
                        </div>
                    </div>
                    <div className='dashboard__column__4'>
                        <div className="dashboard__Button3">
                            <p>Pending Approvals</p><img src={ Hourglass } alt='Hourglass.png'/><p>1</p>
                        </div>
                    </div>
                    <div className='dashboard__column__4'>
                        <div className="dashboard__Button4">
                            <p>Out of State</p><img src ={ airplane } alt='airplace.png'/><p>3</p>
                        </div>
                    </div>
                </div>
                <div className='dashboard__row'>
                    <div className='dashboard__column'>
                        <div className='dashboard__Map_header'>
                            <p>Interns Map</p>
                        </div>
                        <div className='dashboard__Map'>
                            <img src={ map } alt='map.png'/>
                        </div>
                    </div>
                </div>
                {/*<div className='dashboard__Map_header'>*/}
                {/*    <p>Interns Map</p>*/}
                {/*</div>*/}
                {/*<div className='dashboard__Map'>*/}
                {/*    <img src={ map } alt='map.png'/>*/}
                {/*</div>*/}
            </div>
        </>
    )}
export function StudentView() {

    return (
        <div>
            THIS IS THE STUDENT PAGE
        </div>
    );
}

export function AdminView() {
    return (
        <div>
            THIS IS THE ADMIN PAGE
        </div>
    );
}
export { Dashboard }
