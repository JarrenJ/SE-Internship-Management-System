import React, {useState} from "react";
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@material-ui/data-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from "styled-components";
import {Row, Col} from "../DashboardPanel/DashboardPanel"

const Container = styled.div`
  display: flex;
`
const DetailButton = styled.button`
border-radius: 5px;
padding: 10px;
background-color: ${(props => props.bgColor ? props.bgColor : 'royalblue')};
border: 1px solid ${(props => props.bgColor ? props.bgColor : 'royalblue')};
color: ${(props => props.color ? props.color : 'white')};;
cursor: pointer;
`

const DetailsRow = ({ label, info }) => {
  console.log(info)
  return (
      <Row>
          <Col size={1}>
              {label}: {info}
          </Col>
      </Row>
  )
}


export function ApplicationTable({ role, isApplicationTableVisible, username, users, applications, internships, tableError}){
    const [applicationData, setApplicationData] = useState({})
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
    const facultyColumns = [
        { field: 'firstName', headerName: 'First name', width: 130, hide: true },
        
        // {field: 'major', headerName: 'Major', flex 1}
    ]
    // let showappid = role === 'Student'; 
    const getColumns = (roleColumns) => {
        return (
            [
                { field: 'appID', headerName: 'Application ID', flex: 1, hide: true},
                ...roleColumns,
                { field: 'employerName', headerName: 'Employer Name', flex: 1 },
                { field: 'startDate', headerName: 'Employment Start Date', flex: 1 },
                { field: 'endDate', headerName: 'Employment End Date', flex: 1 },
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
                        fetch(`/api/getFullApplication/${row.appID}`)
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
                                setApplicationData({
        
                                    "ApplicationDate": data.applications[0].ApplicationDate,
                                    "ApplicationID": data.applications[0].ApplicationID,
                                    "ApplicationStatus": data.applications[0].ApplicationStatus,
                                    "FacID": data.applications[0].FacID,
                                    "InternID": data.applications[0].InternID,
                                    "StuID": data.applications[0].StuID,
        
                                    "FacultyFirstName": data.faculty[0].LastName,
                                    "FacultyLastName": data.faculty[0].FirstName,
                                    "FacultyPersonalEmail": data.faculty[0].PersonalEmail,
                                    "FacultyPhone": data.faculty[0].Phone,
                                    "FacultyStudentAddress": data.faculty[0].StudentAddress,
                                    "FacultyUserID": data.faculty[0].UserID,
                                    "FacultyUserRole": data.faculty[0].UserRole,
        
                                    "EmployerAddress": data.internship[0].EmployerAddress,
                                    "EmployerEmail": data.internship[0].EmployerEmail,
                                    "EmployerName": data.internship[0].EmployerName,
                                    "EmployerPhone": data.internship[0].EmployerPhone,
                                    "InternshipID": data.internship[0].InternshipID,
                                    "PointOfContact": data.internship[0].PointOfContact,
                                    "StartDate": row.employmentStartDate,
                                    "EndDate": row.employmentEndDate,
        
                                    "StudentFirstName": data.student[0].FirstName,
                                    "StudentLastName": data.student[0].LastName,
                                    "StudentPersonalEmail": data.student[0].PersonalEmail,
                                    "StudentPhone": data.student[0].Phone,
                                    "StudentAddress": data.student[0].StudentAddress,
                                    "StudentUserID": data.student[0].UserID,
                                    "StudentUserRole": data.student[0].UserRole
                                })
        
                            })
                            .catch((error) => {
        
                        });
        
                    };
        
                    return (
                        <div>
                            {role !== 'Student' &&
                            <DetailButton onClick={onClick}>
                                Approve/Deny
                            </DetailButton>
                            }
                            {role == 'Student' &&
                            <DetailButton onClick={onClick}>
                                Details
                            </DetailButton>
                            }
                        </div>
                    );
                }
                }
            ]
        )
    }
    const rows = applications.length > 0 && applications.map((app, idx) => {
        const studentName = `${users[app.StuID].FirstName} ${users[app.StuID].LastName}`
        // const facultyName = `${users[app.FacID].FirstName} ${users[app.FacID].LastName}`
        const cleanStartDate = internships[app.InternID].StartDate.substr(0, internships[app.InternID].StartDate.indexOf('T'));
        const cleanEndDate = internships[app.InternID].EndDate.substr(0, internships[app.InternID].EndDate.indexOf('T'));
        // console.log(results)
        return({
            id:idx,
            appID: app.ApplicationID, 
            studentName: studentName,
            // facultyName: facultyName,
            employerName: internships[app.InternID].EmployerName,
            startDate: cleanStartDate,
            endDate: cleanEndDate,
            applicationDate: app.ApplicationDate,
            status: app.ApplicationStatus

        })
        // return(
        //     {id: idx, firstName: applicationData.StudentFirstName, lastName: applicationData.StudentLastName, appID: app.ApplicationID, employerName: internships.length > 0 && internships[idx].EmployerName, employmentStartDate: internships.length > 0 && cleanStartDate, employmentEndDate: internships.length > 0 && cleanEndDate, applicationDate: app.ApplicationDate, status: app.ApplicationStatus }
        // )
        // firstName: student.FirstName, lastName: student.LastName,
    })
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
                                <DetailsRow label="Student" info={`${applicationData.StudentFirstName} ${applicationData.StudentLastName}`}/>
                                <DetailsRow label="Student Personal Email" info={applicationData.StudentPersonalEmail}/>
                                <DetailsRow label="Student Phone" info={applicationData.StudentPhone}/>
                                <DetailsRow label="Student Address" info={applicationData.StudentAddress}/>
                                <br />
                                <DetailsRow label="Application Date" info={applicationData.ApplicationDate}/>
                                <DetailsRow label="Application Status" info={applicationData.ApplicationStatus}/>
                                <br />
                                <DetailsRow label="Faculty" info={`${applicationData.FacultyFirstName} ${applicationData.FacultyLastName}`}/>
                                <DetailsRow label="Faculty Email" info={applicationData.FacultyPersonalEmail}/>
                                <br />  
                                <DetailsRow label="Employer Name" info={applicationData.EmployerName}/>
                                <DetailsRow label="Employer Address" info={applicationData.EmployerAddress}/>
                                <DetailsRow label="Start Date" info={applicationData.StartDate}/>
                                <DetailsRow label="End Date" info={applicationData.EndDate}/>
                                <DetailsRow label="Point Of Contact" info={applicationData.PointOfContact}/>
                                <DetailsRow label="Employer Email" info={applicationData.EmployerEmail}/>
                                <DetailsRow label="Employer Phone" info={applicationData.EmployerPhone}/>
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
    return(
        <>
            <Row>
                <Col margin='0 0 0 15px'>
                    <p>Applications</p>
                </Col>
            </Row>
                <Row>
                    <Col size={1} bgColor='white' margin='0 20px' /*maxWidth='1200px' */>

                        {/* Something went wrong -- code below -- currently breaks things*/}

                        {/*<small style={{color: 'red'}}>{`${tableError.error}`}</small>*/}
                        {/*{console.log(tableError.error)}*/}
                        <DataGrid
                            rows={rows}
                            columns={getColumns(facultyColumns)}
                            pageSize={5}
                            autoHeight
                            // disableExtendRowFullWidth
                            disableSelectionOnClick
                            /*checkboxSelection*/
                            components={{
                                Toolbar: GridToolbar,
                            }}
                        />
                    </Col>
                </Row>
            <Row>
                <Col size={1}>
                    <DetailsDialog/>
                </Col>
            </Row>
        </>
    )
}


