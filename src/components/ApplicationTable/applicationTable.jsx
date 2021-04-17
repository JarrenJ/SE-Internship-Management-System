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
    const [currentApplication, setCurrentApplication] = useState({"ApplicationID": 1, "StuID": "S528544", "FacID": "neloe", "InternID": 1})
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
                            console.log(applications[params.getValue("appID")])
                            setCurrentApplication(applications[params.getValue("appID")])
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
    // applications.length > 0 &&
    const rows = Object.entries(applications).map((test, idx) => {
        console.log(idx)
        const app = test[1]
        
        return({
            id:idx,
            appID: app.ApplicationID, 
            studentName: `${users[app.StuID].FirstName} ${users[app.StuID].LastName}`,
            studentPersonalEmail: users[app.StuID].PersonalEmail,
            studentPhone: users[app.StuID].Phone,
            studentAddress: users[app.StuID].StudentAddress,
            applicationDate: app.ApplicationDate,
            applicationStatus: app.ApplicationStatus,
            facultyName: `${users[app.FacID].FirstName} ${users[app.FacID].LastName}`,
            facultyEmail: users[app.FacID].PersonalEmail,
            employerName: internships[app.InternID].EmployerName,
            employerAddress: internships[app.InternID].EmployerAddress,
            startDate: internships[app.InternID].StartDate.substr(0, internships[app.InternID].StartDate.indexOf('T')),
            endDate: internships[app.InternID].EndDate.substr(0, internships[app.InternID].EndDate.indexOf('T')),
            PointOfContact: internships[app.InternID].PointOfContact,
            employerEmail: internships[app.InternID].EmployerEmail,
            employerPhone: internships[app.InternID].EmployerPhone
        })
        
    })
    console.log(rows)
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
                                <DetailsRow label="Student Name" info={`${users[currentApplication.StuID].FirstName} ${users[currentApplication.StuID].LastName}`}/>
                                <DetailsRow label="Student Personal Email" info={ users[currentApplication.StuID].PersonalEmail}/>
                                <DetailsRow label="Student Phone" info={ users[currentApplication.StuID].Phone}/>
                                <DetailsRow label="Student Address" info={ users[currentApplication.StuID].StudentAddress}/>
                                <DetailsRow label="Application Date" info={ currentApplication.ApplicationDate}/>
                                <DetailsRow label="Application Status" info={ currentApplication.ApplicationStatus}/>
                                <DetailsRow label="Faculty Name" info={`${users[currentApplication.FacID].FirstName} ${users[currentApplication.FacID].LastName}`}/>
                                <DetailsRow label="Faculty Email" info={ users[currentApplication.FacID].PersonalEmail}/>
                                <DetailsRow label="Employer Name" info={ internships[currentApplication.InternID].EmployerName}/>
                                <DetailsRow label="Employer Address" info={ internships[currentApplication.InternID].EmployerAddress}/>
                                <DetailsRow label="Start Date" info={ internships[currentApplication.InternID].StartDate.substr(0, internships[currentApplication.InternID].StartDate.indexOf('T'))}/>
                                <DetailsRow label="End Date" info={ internships[currentApplication.InternID].EndDate.substr(0, internships[currentApplication.InternID].EndDate.indexOf('T'))}/>
                                <DetailsRow label="Point Of Contact" info={ internships[currentApplication.InternID].PointOfContact}/>
                                <DetailsRow label="Employer Email" info={ internships[currentApplication.InternID].EmployerEmail}/>
                                <DetailsRow label="Employer Phone" info={ internships[currentApplication.InternID].EmployerPhone}/>
                         </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {role !== 'Student' &&
                                <>
                                    <DetailButton bgColor='#4BB543' onClick={() => updateStatus('Approved', currentApplication.ApplicationID)}>
                                        Approve
                                    </DetailButton>
                                    <DetailButton bgColor='#BD0037' onClick={() => updateStatus('Denied', currentApplication.ApplicationID)} autoFocus>
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


