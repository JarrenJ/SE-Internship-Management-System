import React, {useState} from "react";
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@material-ui/data-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from "styled-components";
import {Row, Col, DetailButton} from "../DashboardPanel/DashboardPanel"



export function ApplicationTable({ role, users, applications, internships, tableError, setCurrentApplication, handleClickOpen}){
    
    let adminDefault = true
    
    let facultyDefault = true
    let studentDefault = true
    if (role === 'Admin') {
        adminDefault = false
    } else if (role === 'Faculty'){
        facultyDefault = false
    } else if (role === 'Student'){
        studentDefault = false
    }
   
    const columns = 
            [
                {field: 'appID', hide: true},
                {field: 'studentName', headerName: 'Student Name', width: 150, hide: facultyDefault && adminDefault},
                {field: 'studentPersonalEmail', headerName: 'Student Email', width: 150, hide: true},
                {field: 'studentPhone', headerName: 'Student Phone', width: 150, hide: true},
                {field: 'studentAddress', headerName: 'Student Address', width: 175, hide: true},
                {field: 'major', headerName: 'Major', width: 150, hide: facultyDefault},
                {field: 'facultyName', headerName: 'Faculty Name', width: 150, hide: adminDefault},
                {field: 'employerName', headerName: 'Employer Name', width: 175, hide: studentDefault},
                {field: 'PointOfContact', headerName: 'Point Of Contact', width: 175, hide: true},
                {field: 'employerEmail', headerName: 'Employer Email', width: 175, hide: true},
                {field: 'employerPhone', headerName: 'Employer Phone', width: 175, hide: true},            
                {field: 'employerAddress', headerName: 'Employer Address', width: 175, hide: true},
                {field: 'startDate', headerName: 'Start Date', width: 125, hide: studentDefault && facultyDefault},
                {field: 'endDate', headerName: 'End Date', width: 125, hide: studentDefault},
                {field: 'applicationDate', headerName: 'Application Date', width: 175, hide: adminDefault && studentDefault && facultyDefault},
                {field: 'applicationStatus', headerName: 'Status', width: 100, hide: adminDefault && studentDefault && facultyDefault},
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
                            // console.log(applications[params.getValue("appID")])
                            setCurrentApplication(applications[params.getValue("appID")])
                        };
                        return (
                            <div>
                                {role !== 'Student' &&
                                <DetailButton onClick={onClick}>
                                    Approve/Deny
                                </DetailButton>
                                }
                                {role === 'Student' &&
                                <DetailButton onClick={onClick}>
                                    Details
                                </DetailButton>
                                }
                            </div>
                        );
                    }
                }
            ]
        
    
    // applications.length > 0 &&
    const rows = Object.entries(applications).map((test, idx) => {
        // console.log(idx)
        const app = test[1]
        
        return({
            id:idx,
            appID: app.ApplicationID, 
            studentName: `${users[app.StuID].FirstName} ${users[app.StuID].LastName}`,
            major: `Jarren needs to add this`,
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
                            columns={columns}
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
        </>
       )
}
