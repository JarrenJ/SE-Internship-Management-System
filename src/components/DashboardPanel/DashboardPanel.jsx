import React, {useState} from "react";
import { account, airplane, Hourglass, Manlogo } from "assets";
import { ApplicationForm } from "components";
import styled from "styled-components";

import { DataGrid } from '@material-ui/data-grid';

import './DashboardPanel.css'
import '../../colors.css'

import { NWDoubleStackedGreen } from "assets"


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Container = styled.div`
  display: flex;
  //padding: 2rem 0;
  //justify-content: center;
  //align-items: center;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: ${(props) => props.minHeight};
  max-width: ${(props) => props.maxWidth};
  //@media (max-width: 970px) {
  //  flex-direction: column;
  //}
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

  //@media (max-width: 768px) {
  //  min-width: 100%;
  //  margin: 10px auto;
  //}
  //margin: 0 25px;
  margin: ${(props) => props.margin};
  //border: 5px solid black;
`

export function DashboardPanel({ isOpen, role, isAppFormVisible, username, applications, internships, tableError }) {

    // const DetailButton = () => {
    //     return(
    //         <button style={{color: 'darkblue'}}>Details</button>
    //     )
    // }

    // Planning to change this to be called StyledDetailButton and return it from function above...

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const DetailButton = styled.button`
      border-radius: 5px;
      padding: 10px;
      background-color: royalblue;
      border: 1px solid royalblue;
      color: white;
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
                    fullWidth="true"
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
                        <Button onClick={handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    const columns = [
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
                    // const cleanStartDate = row.employmentStartDate.substr(0, row.employmentStartDate.indexOf('T'));
                    // const cleanEndDate = row.employmentEndDate.substr(0, row.employmentEndDate.indexOf('T'));
                    setApplicationData({
                        "EmployerName": row.employerName,
                        "StartDate": row.employmentStartDate,
                        "EndDate": row.employmentEndDate,
                        "DateSubmitted": row.applicationDate,
                        "Status": row.status
                    })
                    // return row.employerName
                    // return alert(JSON.stringify(row, null, 4));
                };

                return (
                    <div>
                        <DetailButton onClick={onClick}>
                            Details
                        </DetailButton>
                    </div>
                );
            }
        },
    ];

    const rows =  applications.length > 0 && applications.map((app, idx) => {
        console.log(app)
        const cleanStartDate = internships[idx].StartDate.substr(0, internships[idx].StartDate.indexOf('T'));
        const cleanEndDate = internships[idx].EndDate.substr(0, internships[idx].EndDate.indexOf('T'));
        return(
            {id: idx, employerName: internships.length > 0 && internships[idx].EmployerName, employmentStartDate: internships.length > 0 && cleanStartDate, employmentEndDate: internships.length > 0 && cleanEndDate, applicationDate: app.ApplicationDate, status: app.ApplicationStatus }
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
                <Container>
                    <Row>
                        <Col margin='0 0 0 15px'>
                            <p>Applications</p>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col size={1} bgColor='white' margin='0 20px' maxWidth='1200px'>

                            {/* Something went wrong -- code below -- currently breaks things*/}

                            {/*<small style={{color: 'red'}}>{`${tableError.error}`}</small>*/}
                            {/*{console.log(tableError.error)}*/}
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                autoHeight='true'
                                disableExtendRowFullWidth='true'
                                disableSelectionOnClick='true'
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
                <div className="dashboard__row">
                    <div className="dashboard__column__no__margin">
                        <div className="dashboard__Header">
                            <div className='dashboard__row'>
                                <div className='dashboard__column'>
                                    <img src={ account } alt='account.png'/>
                                    <div className="Header_Namebox">
                                        <p>{username}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {role === "Admin" &&
                    <>
                        <div className='dashboard__row'>
                            <div className='dashboard__column'>
                                <p className='dashboard__title'>Dashboard</p>
                            </div>
                        </div>
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
                                <div className='dashboard__Map' />
                            </div>
                        </div>
                    </>
                }
                {
                    role === "Student"
                    &&
                    <>
                        {applications.length === 0 && <DefaultStudentView />}
                        {applications.length > 0 && <StudentView />}
                    </>
                }
                {isAppFormVisible && <ApplicationForm /> }
            </div>
        </>
    )}
