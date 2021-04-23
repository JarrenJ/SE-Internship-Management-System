import React from "react";
import {account, airplane, Hourglass, Manlogo, NWDoubleStackedGreen} from "assets";
import { ApplicationForm, ApplicationTable, DetailsDialog, AutoLogOut, MobileNav } from 'components'

import styled from "styled-components";

import './DashboardPanel.css'
import '../../colors.css'
import { COLORS, ROLES } from 'utils'


const Container = styled.div`
    display: flex;
`

export const Row = styled.div`
    display: flex;
    width: ${(props) => props.width ? props.width : '100%'};
    height: auto;
    min-height: ${(props) => props.minHeight};
    max-height: ${(props) => props.maxHeight};
    max-width: ${(props) => props.maxWidth};
    flex-direction: ${(props) => props.direction ? props.direction : 'row'} ;
    flex-wrap: ${(props) => props.wrap ? 'wrap' : 'no-wrap'};
    @media (max-width: ${(props) => props.breakpoint}) {
    flex-direction: column;
    margin: ${(props) => props.breakpointMargin ? props.breakpointMargin : 0};
    }
    margin: ${(props) => props.margin};
`

export const Col = styled.div`
    flex: ${(props) => props.size};
    background-color: ${(props => props.bgColor)};
    min-width: ${(props => props.minWidth)};
    max-width: ${(props => props.maxWidth)};
    min-height: ${(props) => props.minHeight};
    height: 100%;
    max-height: ${(props) => props.maxHeight};
    @media (max-width: ${(props) => props.breakpoint}) {
    margin: ${(props) => props.breakpointMargin ? props.breakpointMargin : 0};
    }
    margin: ${(props) => props.margin};
`
export const DetailButton = styled.button`
    border-radius: 5px;
    padding: 10px;
    background-color: ${(props => props.bgColor ? props.bgColor : COLORS.DETAIL_BTN_PRIMARY)};
    border: 1px solid ${(props => props.bgColor ? props.bgColor : COLORS.DETAIL_BTN_PRIMARY)};
    color: ${(props => props.color ? props.color : COLORS.WHITE)};;
    cursor: pointer;
`
const StyledPanel = styled.div`
    display: flex;
    height: 100%;
    background-color: white;
    width: 80%;
    border-radius: 10px;
    margin: 0 25px;
    padding: .5rem;
    color: ${(props) => props.color};
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-left: 5px solid;
  

    .man-icon{
      height: 75px;
    }
    
    .large-icon{
        height: 50px;
        padding-top: 1rem;
    }
    
    .title {
        font-size: 1.2rem;
        margin-top: 0;
    }
    .info {
        font-size: 1.1rem;
        margin: 0 auto;
    }

    @media (max-width: 1205px) {
        .title {
          font-size: 1.1rem;
        }
    
        .info {
          font-size: .9rem;
        }
    }
    
    @media (max-width: 1024px) {
      max-width: 250px;
    }
`

const Panel = ({ color, title, info, image, imgClass }) => {
    return (
        <StyledPanel color={color}>
            <Row direction='column'>
                <Col size={1}>
                    <p className='title'>{title}</p>
                </Col>
                <Col size={1}>
                    <p className='info'>{info}</p>
                </Col>
            </Row>
            <img className={imgClass} src={image} alt='Icon for dashboard panels' />
        </StyledPanel>
    )
}

export function DashboardPanel({ isSideNavOpen, role, isAppFormVisible,
    userID, users, applications,
    internships, totalInterns, pendingApprovals,
    activeInterns, outOfStateInterns, showAppForm, hideAppForm, showApplicationTable, isApplicationTableVisible,
    currentApplication, setCurrentApplication, totalFacultyInterns,
    activeFacultyInterns, pendingFacultyApprovals, outOfStateInternsFaculty,
    inStateInternsFaculty }) {

    
    const [detailsDialogOpen, setDetailsDialogOpen] = React.useState(false);

    /* 
    getInitial sets the initial values for an application form based off of the currentApplication
    */
    const getInitial = () => {

        if (typeof currentApplication === 'undefined') {
            let initialValues = {
                studentId: "",
                major: "",
                studentFirstName: "",
                studentLastName: "",
                studentEmail: "",
                studentPhoneNum: "",
                instructorFirstName: "",
                instructorLastName: "",
                instructorEmail: "",
                employerName: "",
                primaryContactName: "",
                employerEmail: "",
                employerPhone: "",
                applicationID: null,
                internshipID: null,
                applicationStatus: "Pending Review",
                signature: "",
                agreementDate: "",
                comments: ""
            };

            let initialStuAddr = {
                line1: "",
                line2: "",
                city: "",
                state: "",
                zip: "",
            }

            let initialEmpAddr = {
                line1: "",
                line2: "",
                city: "",
                state: "",
                zip: "",
            }
            let submitDate = new Date(),
                date = submitDate.getFullYear() + '-' + (submitDate.getMonth() + 1) + '-' + submitDate.getDate();
            let initialStartDate = date
            let initialEndDate = date
            return (
                { initialValues, initialStartDate, initialEndDate, initialEmpAddr, initialStuAddr, date }
            )
        } else {
            let initialValues = {
                studentId: currentApplication.StuID,
                major: users[currentApplication.StuID].Major,
                studentFirstName: users[currentApplication.StuID].FirstName,
                studentLastName: users[currentApplication.StuID].LastName,
                studentEmail: users[currentApplication.StuID].PersonalEmail,
                studentPhoneNum: users[currentApplication.StuID].Phone,
                instructorFirstName: users[currentApplication.FacID].FirstName,
                instructorLastName: users[currentApplication.FacID].LastName,
                instructorEmail: users[currentApplication.FacID].PersonalEmail,
                employerName: internships[currentApplication.InternID].EmployerName,
                primaryContactName: internships[currentApplication.InternID].PointOfContact,
                employerEmail: internships[currentApplication.InternID].EmployerEmail,
                employerPhone: internships[currentApplication.InternID].EmployerPhone,
                applicationID: currentApplication.ApplicationID,
                internshipID: currentApplication.InternID,
                applicationStatus: currentApplication.ApplicationStatus,
                signature: currentApplication.Signature,
                agreementDate: currentApplication.AgreementDate,
                comments: currentApplication.Comments
            }
            let studentAddress = users[currentApplication.StuID].StudentAddress.split(",")
            let initialStuAddr = {
                line1: studentAddress[0],
                line2: studentAddress[1],
                city: studentAddress[2],
                state: studentAddress[3],
                zip: studentAddress[4],
            }
            let employerAddress = internships[currentApplication.InternID].EmployerAddress.split(",")
            let initialEmpAddr = {
                line1: employerAddress[0],
                line2: employerAddress[1],
                city: employerAddress[2],
                state: employerAddress[3],
                zip: employerAddress[4],
            }
            let date = currentApplication.ApplicationDate
            let initialStartDate = internships[currentApplication.InternID].StartDate.substr(0, internships[currentApplication.InternID].StartDate.indexOf('T'))
            let initialEndDate = internships[currentApplication.InternID].EndDate.substr(0, internships[currentApplication.InternID].EndDate.indexOf('T'))
            return (
                { initialValues, initialStartDate, initialEndDate, initialEmpAddr, initialStuAddr, date }
            )
        }
    }
    const handleClickOpen = () => {
        setDetailsDialogOpen(true);
    };

    const handleClose = () => {
        setDetailsDialogOpen(false);
    };
    /* 
    DefaultStudentView is loaded when student has no applications in the database.
    */
    const DefaultStudentView = () => {
        return (
            <>
                <Container>
                    <Row>
                        <Col size={1}>
                            <div className='dashboard__student__default__title'>
                                <p>Welcome!</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col size={1}>
                            <div className='dashboard__student__default__image'>
                                <img src={NWDoubleStackedGreen} alt='Northwest Stacked Logo Green' />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col size={1}>
                            <div className='dashboard__student__default__title'>
                                <p>Apply or Track Internship Applications</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }

    /* 
    FacultyView returns the the panels for faculty with information loaded from the database
    */
    const FacultyView = () => {
        return (
            <>
                <Row>
                    <Col>
                        <p className='dashboard__title'>Dashboard</p>
                    </Col>
                </Row>
                <Row breakpoint='507px' wrap='true' margin='0 0 0 -10px'>
                            <Col size={1} breakpoint='1024px' breakpointMargin='25px 0' maxHeight='100px' minWidth='200px'>
                                <Panel color={COLORS.BLUE} info={totalFacultyInterns} title='Total Interns ' image={Manlogo} imgClass='man-icon' />
                            </Col>
                            <Col size={1} breakpoint='1024px' breakpointMargin='25px 0' maxHeight='100px' minWidth='200px'>
                                <Panel color={COLORS.PURPLE} info={activeFacultyInterns} title='Active Interns ' image={Manlogo} imgClass='man-icon' />
                            </Col>
                            <Col size={1} breakpoint='1024px' breakpointMargin='25px 0' maxHeight='100px' minWidth='200px'>
                                <Panel color={COLORS.LIGHT_GREEN} info={pendingFacultyApprovals} title='Pending Approvals ' image={Hourglass} imgClass='large-icon' />
                            </Col>
                            <Col size={1} breakpoint='1024px' breakpointMargin='25px 0' maxHeight='100px' minWidth='200px'>
                                <Panel color={COLORS.LIGHT_BLUE} info={inStateInternsFaculty} title='In State' image={Manlogo} imgClass='man-icon' />
                            </Col>
                            <Col size={1} breakpoint='1024px' breakpointMargin='25px 0' maxHeight='100px' minWidth='200px'>
                                <Panel color={COLORS.RED} info={outOfStateInternsFaculty} title='Out of State' image={airplane} imgClass='large-icon'/>
                            </Col>
                        </Row>

            </>
        )
    }
    /* 
    AdminView loads the given panels for admin with information from the database
    */
    const AdminView = () => {
        return (
            <>
                <Row>
                    <Col>
                        <p className='dashboard__title'>Dashboard</p>
                    </Col>
                </Row>
                <Row breakpoint='507px' wrap margin='0 0 0 -10px'>
                    <Col size={1} breakpoint='1024px' breakpointMargin='25px 0' maxHeight='100px' minWidth='200px'>
                        <Panel color={COLORS.BLUE} info={totalInterns} title='Total Interns' image={Manlogo} imgClass='man-icon' />
                    </Col>
                    <Col size={1} breakpoint='1024px' breakpointMargin='25px 0' maxHeight='100px' minWidth='200px'>
                        <Panel color={COLORS.LIGHT_GREEN} info={activeInterns} title='Active Internships' image={Manlogo} imgClass='man-icon' />
                    </Col>
                    <Col size={1} breakpoint='1024px' breakpointMargin='25px 0' maxHeight='100px' minWidth='200px'>
                        <Panel color={COLORS.LIGHT_BLUE} info={pendingApprovals} title='Pending Approvals' image={Hourglass} imgClass='large-icon' />
                    </Col>
                    <Col size={1} breakpoint='1024px' breakpointMargin='25px 0' maxHeight='100px' minWidth='200px'>
                        <Panel color={COLORS.RED} info={outOfStateInterns} title='Out of State' image={airplane} imgClass='large-icon' />
                    </Col>
                </Row>
            </>
        )
    }

    return (
        <>
            {/* Call AutoLogOut function here */}
            <AutoLogOut />
            <div className="dashboard__container" style={{ left: isSideNavOpen ? '20%' : '3.5%', width: isSideNavOpen ? `80%` : `96.5%` }}>
                <Row maxHeight='65px'>
                    <MobileNav
                        role={role}
                        showAppForm={showAppForm}
                        showApplicationTable={showApplicationTable}
                    />
                    <Col size={1} maxHeight='65px'>
                        <div className="dashboard__Header">
                            <img className='dashboard__profile__pic' src={account} alt='account.png' />
                            <div className="Header_Namebox">
                                <p>{userID}</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                {
                    role === ROLES.ADMIN && <AdminView />
                }
                {
                    role === ROLES.FACULTY && <FacultyView />
                }
                {
                    role === ROLES.STUDENT &&
                    <>
                        {applications.length === 0 && !isAppFormVisible &&
                            <DefaultStudentView />}
                    </>
                }
                {isAppFormVisible &&
                    <ApplicationForm
                        getInitial={getInitial}
                        hideAppForm={hideAppForm} />
                }
                {!isAppFormVisible && !isApplicationTableVisible && role !== 'Student' &&
                    <>
                        <Row>
                            <Col size={1}>
                                <div className='dashboard__Map_header'>
                                    <p>Interns Map</p>
                                </div>
                                <div className='dashboard__Map' />
                            </Col>
                        </Row>

                    </>
                }
                {isApplicationTableVisible &&
                    <Row>
                        <Col size={1} bgColor={COLORS.TRANSPARENT} margin='0 20px' >
                            <ApplicationTable
                                role={role}
                                users={users}
                                applications={applications}
                                internships={internships}
                                setCurrentApplication={setCurrentApplication}
                                handleClickOpen={handleClickOpen}
                            />
                        </Col>
                    </Row>
                }
                <Row>
                    <Col size={1}>
                        <DetailsDialog
                            handleClose={handleClose}
                            applications={applications}
                            internships={internships}
                            role={role}
                            users={users}
                            currentApplication={currentApplication}
                            setCurrentApplication={setCurrentApplication}
                            detailsDialogOpen={detailsDialogOpen}
                            showAppForm={showAppForm}
                        />
                    </Col>
                </Row>


            </div>
        </>
    )
}
