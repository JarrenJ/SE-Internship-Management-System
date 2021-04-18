import React, {useCallback, useState, useReducer} from "react";
import {account, airplane, Hourglass, Manlogo, NWDoubleStackedGreen} from "assets";
import {ApplicationForm} from "components";

import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from "styled-components";
import {DetailsDialog} from "../DetailsDialog/detailsDialog";

import './DashboardPanel.css'
import '../../colors.css'
import {InputLabel, TextField} from "@material-ui/core";
import { ApplicationTable } from "components/ApplicationTable/applicationTable";


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
  @media (max-width: ${(props) => props.breakpoint}) {
    flex-direction: column;
    margin: ${(props) => props.breakpointMargin ? props.breakpointMargin : 0};
  }
  margin: ${(props) => props.margin};
  //border: 5px solid red;
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
  //border: 5px solid black;
`
export const DetailButton = styled.button`
border-radius: 5px;
padding: 10px;
background-color: ${(props => props.bgColor ? props.bgColor : 'royalblue')};
border: 1px solid ${(props => props.bgColor ? props.bgColor : 'royalblue')};
color: ${(props => props.color ? props.color : 'white')};;
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
    return(
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
function fixCurrentApplication(state, action){
    if (action === 0){
        return undefined
    } else{
        return state
    }
}
export function DashboardPanel({ isOpen, role, isAppFormVisible, isApplicationTableVisible, userID, users, applications,
                                   internships, tableError, totalInterns, pendingApprovals,
                                   activeInterns, outOfStateInterns, showAppForm }) {

    const [open, setOpen] = React.useState(false);
    const [currentApplication, setCurrentApplication] = useState()
    console.log(currentApplication)
    const getInitial = () => {
        let initialValues = {}
        let initialStuAddr = {}
        let initialEmpAddr = {}
        let initialStartDate = ""
        let initialEndDate = ""
        let date = ""
        // let currentApplication = 'undefined'
        console.log(typeof currentApplication === 'undefined')
        // console.log(Object.values(currentApplication).length)
        // if (sessionStorage.getItem('app')){
        //     currentApplication = JSON.parse(sessionStorage.getItem('app'))
        // }
    
        if (typeof currentApplication === 'undefined') {
            console.log(currentApplication)
            let initialValues = {
                studentId: "",
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
                    comments: "",
                    applicationID: null,
                    internshipID: null
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
                console.log(initialValues)
                return (
                    {initialValues, initialStartDate, initialEndDate, initialEmpAddr, initialStuAddr, date}
            )
        } else {
            console.log(currentApplication)
            let initialValues = {
                studentId: currentApplication.StuID,
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
                    comments: "",
                    applicationID: currentApplication.ApplicationID,
                    internshipID: currentApplication.InternID
                }
                let studentAddress = users[currentApplication.StuID].StudentAddress.split(",")
                console.log(studentAddress)
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
                let initialStartDate =  internships[currentApplication.InternID].StartDate.substr(0, internships[currentApplication.InternID].StartDate.indexOf('T'))
                let initialEndDate = internships[currentApplication.InternID].EndDate.substr(0, internships[currentApplication.InternID].EndDate.indexOf('T'))
                console.log(initialValues)
                return (
                    {initialValues, initialStartDate, initialEndDate, initialEmpAddr, initialStuAddr, date}
                )
            }
    }
    // const forceUpdate = useCallback(() => {
    //     console.log('=== FORCED ===')
    //     console.log(currentApplication)
    //     if (typeof currentApplication === undefined){
    //         setCurrentApplication()
    //     } else{
    //         setCurrentApplication(applications[currentApplication.appID])

    //     }
    // }, [])
    // const ActionsButtons = (params, applications, role, setOpen, setCurrentApplication, handleClickOpen, handleClose) => {
    
    //     const onClick = () => {
    //         // Open DetailsDialog
    //         handleClickOpen()
    //         console.log(applications[params.getValue("appID")])
    //         setCurrentApplication(applications[params.getValue("appID")])
    //     };
    //     console.log(applications)
        
    //     return (
    //         <div>
    //             {role !== 'Student' &&
    //             <DetailButton onClick={onClick}>
    //                 Approve/Deny
    //             </DetailButton>
    //             }
    //             {role == 'Student' &&
    //             <DetailButton onClick={onClick}>
    //                 Details
    //             </DetailButton>
    //             }
                
    //         </div>
    //     );
    // }
    // const editApplication = () => {
    //     handleClose()
    //     console.log(currentApplication)
    //     // setCurrentApplication(applications[currentApplication.appID])
    //     console.log(currentApplication)
    //     sessionStorage.setItem("app", JSON.stringify(currentApplication))
    //     console.log(currentApplication)
    //     // forceUpdate()
    //     console.log(currentApplication)
    // }
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    const initial_Comment = "";
                                
    const DefaultStudentView = () => {
        return(
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
                                <img src={NWDoubleStackedGreen} alt='Northwest Stacked Logo Green'/>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col size={1}>
                            <div className='dashboard__student__default__title'>
                                <p>Apply or Track your Internship Application</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }

    const StudentView = () => {
        return(
            <>
                    <Row>
                        <Col size={1} bgColor='transparent' margin='0 20px' /*maxWidth='1200px' */>
                            <ApplicationTable
                                role={role}
                                isApplicationTableVisible={isApplicationTableVisible}
                                userID={userID}
                                users={users}
                                applications={applications}
                                internships={internships}
                                tableError={tableError}
                                setCurrentApplication={setCurrentApplication}
                                currentApplication={currentApplication}
                                open={open}
                                setOpen={setOpen}
                                handleClickOpen={handleClickOpen}
                                handleClose={handleClose}
                                // ActionsButtons={ActionsButtons}
                            />
                        </Col>
                    </Row>
            </>
        )
    }

    return (
        <>
            <div className="dashboard__container" style={{left: isOpen ? '20%' : '3.5%', width: isOpen ? `calc(100% - 20%)` : `calc(100% - 3.5%)`}}>
                <Row maxHeight='65px'>
                    <Col size={1} maxHeight='65px'>
                        <div className="dashboard__Header">
                            <img className='dashboard__profile__pic' src={ account } alt='account.png'/>
                            <div className="Header_Namebox">
                                <p>{userID}</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                {role === "Admin" &&
                    <>
                        <Row>
                            <Col>
                                <p className='dashboard__title'>Dashboard</p>
                            </Col>
                        </Row>
                        <Row breakpoint='1024px'>
                            <Col size={1} breakpoint='1024px' breakpointMargin='25px 0'>
                                <Panel color='blue' info={totalInterns} title='Total Interns' image={Manlogo} imgClass='man-icon' />
                            </Col>
                            <Col size={1} breakpoint='1024px' breakpointMargin='25px 0'>
                                <Panel color='green' info={activeInterns} title='Active Internships' image={Manlogo} imgClass='man-icon' />
                            </Col>
                            <Col size={1} breakpoint='1024px' breakpointMargin='25px 0'>
                                <Panel color='rgb(55, 165, 238)' info={pendingApprovals} title='Pending Approvals' image={Hourglass} imgClass='large-icon' />
                            </Col>
                            <Col size={1} breakpoint='1024px' breakpointMargin='25px 0'>
                                <Panel color='red' info={outOfStateInterns} title='Out of State' image={airplane} imgClass='large-icon'/>
                            </Col>
                        </Row>
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
                {/* {isAppFormVisible && <ApplicationForm */}
                {/* {isAppFormVisible && typeof currentApplication !== undefined && <ApplicationForm
                    currentApplication={currentApplication}
                    applications={applications}
                    users={users}
                    internships={internships} /> } */}
                {isAppFormVisible && <ApplicationForm
                getInitial={getInitial}
                />}
                {
                    role === "Student"
                    &&
                    <>
                        {typeof applications === undefined &&<DefaultStudentView />}
                        {<StudentView />}
                    </>
                }
                <Row>
                <Col size={1}>
                    <DetailsDialog
                        handleClose={handleClose}
                        handleClickOpen={handleClickOpen} 
                        applications={applications}
                        internships={internships}
                        role={role}
                        users={users}
                        currentApplication={currentApplication}
                        setCurrentApplication={setCurrentApplication}
                        open={open}
                        showAppForm={showAppForm}
                        // setOpen={setOpen}
                        // editApplication={editApplication}
                        setCurrentApplication={setCurrentApplication}
                        
                    />
                </Col>
                </Row>
            </div>
        </>
    )}
