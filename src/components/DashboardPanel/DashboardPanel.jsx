import React, {useState} from "react";
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

import './DashboardPanel.css'
import '../../colors.css'


const Container = styled.div`
  display: flex;
`

const Row = styled.div`
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

const Col = styled.div`
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

export function DashboardPanel({ isOpen, role, isAppFormVisible, username, applications,
                                   internships, tableError, totalInterns, pendingApprovals,
                                   activeInterns, outOfStateInterns }) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateStatus = (status, appID) => {
        console.log(status)
        console.log(appID)
        fetch('/api/updateStatus', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "status": status,
                "appID": appID
            }),
        }).then(r => window.location.reload(true))
        handleClose()
    }

    const DetailButton = styled.button`
      border-radius: 5px;
      padding: 10px;
      background-color: ${(props => props.bgColor ? props.bgColor : 'royalblue')};
      border: 1px solid ${(props => props.bgColor ? props.bgColor : 'royalblue')};
      color: ${(props => props.color ? props.color : 'white')};;
      cursor: pointer;
    `

    const [applicationData, setApplicationData] = useState({})

    const DetailsDialog = () => {
        // const [open, setOpen] = React.useState(false);
        //
        // const handleClickOpen = () => {
        //     setOpen(true);
        // };
        //
        // const handleClose = () => {
        //     setOpen(false);
        // };

        return (
            <div>
                {/*<Button variant="outlined" color="primary" onClick={handleClickOpen}>*/}
                {/*    Open alert dialog*/}
                {/*</Button>*/}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title">{"Details"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Row>
                                <Col size={1}>
                                    <b>Data from table only...</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col size={1}>
                                    <p>Employer Name: {applicationData.EmployerName}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col size={1}>
                                    <p>Start Date: {applicationData.StartDate}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col size={1}>
                                    <p>End Date: {applicationData.EndDate}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col size={1}>
                                    <p>Date Submitted: {applicationData.DateSubmitted}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col size={1}>
                                    <p>Status: {applicationData.Status}</p>
                                </Col>
                            </Row>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {role !== 'Student' &&
                            <>
                                <DetailButton bgColor='#4BB543' onClick={() => updateStatus('Approved', applicationData.ID)}>
                                    Approve
                                </DetailButton>
                                <DetailButton bgColor='#BD0037' onClick={() => updateStatus('Denied', applicationData.ID)} autoFocus>
                                    Deny
                                </DetailButton>
                            </>
                        }
                        <DetailButton bgColor='gray' onClick={handleClose}>
                            Close
                        </DetailButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    const columns = [
        { field: 'appID', headerName: 'Application ID', flex: 1, hide: true },
        { field: 'employerName', headerName: 'Employer Name', flex: 1 },
        { field: 'employmentStartDate', headerName: 'Employment Start Date', flex: 1 },
        { field: 'employmentEndDate', headerName: 'Employment End Date', flex: 1 },
        { field: 'applicationDate', headerName: 'Application Date', flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            flex: .5,
        },
        {
            field: "",
            headerName: "Action",
            sortable: false,
            flex: 1,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = () => {
                    // Open DetailsDialog
                    handleClickOpen()
                    const api = params.api;
                    const fields = api
                        .getAllColumns()
                        .map((c) => c.field)
                        .filter((c) => c !== "__check__" && !!c);
                    const row = {};

                    fields.forEach((f) => {
                        row[f] = params.getValue(f);
                    });
                    setApplicationData({
                        "EmployerName": row.employerName,
                        "StartDate": row.employmentStartDate,
                        "EndDate": row.employmentEndDate,
                        "DateSubmitted": row.applicationDate,
                        "Status": row.status,
                        "ID": row.appID
                    })
                };

                return (
                    <div>
                        <DetailButton onClick={onClick}>
                            Details
                        </DetailButton>
                    </div>
                );
            }
        }
    ];

    const rows = applications.length > 0 && applications.map((app, idx) => {
        console.log(app)
        console.log(internships)

        const cleanStartDate = internships.length > 0 && internships[idx].StartDate.substr(0, internships[idx].StartDate.indexOf('T'));
        const cleanEndDate = internships.length > 0 && internships[idx].EndDate.substr(0, internships[idx].EndDate.indexOf('T'));
        return(
            {id: idx, appID: app.ApplicationID, employerName: internships.length > 0 && internships[idx].EmployerName, employmentStartDate: internships.length > 0 && cleanStartDate, employmentEndDate: internships.length > 0 && cleanEndDate, applicationDate: app.ApplicationDate, status: app.ApplicationStatus }
        )
    })

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
                    <Col margin='0 0 0 15px'>
                        <p>Applications</p>
                    </Col>
                </Row>
                <Container>
                    <Row>
                        <Col size={1} bgColor='white' margin='0 20px' /*maxWidth='1200px' */>

                            {/* Something went wrong -- code below -- currently breaks things*/}

                            {/*<small style={{color: 'red'}}>{`${tableError.error}`}</small>*/}
                            {/*{console.log(tableError.error)}*/}
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                autoHeight
                                // disableExtendRowFullWidth
                                disableSelectionOnClick
                                /*checkboxSelection*/
                            />
                        </Col>
                    </Row>
                </Container>
                <Row>
                    <Col size={1}>
                        <DetailsDialog/>
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
                                <p>{username}</p>
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
                {isAppFormVisible && <ApplicationForm /> }
                {
                    role === "Student"
                    &&
                    <>
                        {applications.length === 0 && <DefaultStudentView />}
                        {applications.length > 0 && <StudentView />}
                    </>
                }
            </div>
        </>
    )}
