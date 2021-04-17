import React, {useState} from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from "styled-components";
import {Row, Col, DetailButton} from "../DashboardPanel/DashboardPanel"

// export const ActionsButtons = (params, applications, role, setOpen, setCurrentApplication, handleClickOpen, handleClose) => {
    
//     // const [currentApplication, setCurrentApplication] = useState({"ApplicationID": 1, "StuID": "S528544", "FacID": "neloe", "InternID": 1})
//     // const [open, setOpen] = useState(false);
    
//     const onClick = () => {
//         // Open DetailsDialog
//         handleClickOpen()
//         console.log(applications[params.getValue("appID")])
//         setCurrentApplication(applications[params.getValue("appID")])
//     };
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

export function DetailsDialog ({handleClickOpen, handleClose, applications, internships, role, users, currentApplication, setCurrentApplication, open}) {
    const DetailsRow = ({ label, info }) => {
        return (
            <Row>
                <Col size={1}>
                    {label}: {info}
                </Col>
            </Row>
        )
      }

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
    )
    
}