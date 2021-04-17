import React, {useState} from "react";
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@material-ui/data-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from "styled-components";
import {Row, Col, DetailButton} from "../DashboardPanel/DashboardPanel"
// import {DetailsDialog} from "components"
// import {ActionsButtons} from "../DetailsDialog/detailsDialog"



export function ApplicationTable({ role, isApplicationTableVisible, username, users, applications, internships, tableError, setOpen, open, setCurrentApplication, currentApplication, handleClose, handleClickOpen, ActionsButtons}){
    
    const facultyColumns = [
        {field: 'studentName', headerName: 'Student Name', width: 150, hide: false},
        {field: 'major', headerName: 'Major', width: 150, hide: false},
        {field: 'startDate', headerName: 'Start Date', width: 125, hide: false},
        {field: 'applicationDate', headerName: 'Application Date', width: 175, hide: false},
        {field: 'applicationStatus', headerName: 'Status', width: 100, hide: false}
    ]
    const studentColumns = [
        {field: 'employerName', headerName: 'Employer Name', width: 175, hide: false},
        {field: 'startDate', headerName: 'Start Date', width: 125, hide: false},
        {field: 'endDate', headerName: 'End Date', width: 125, hide: false},
        {field: 'applicationDate', headerName: 'Application Date', width: 175, hide: false},
        {field: 'applicationStatus', headerName: 'Status', width: 100, hide: false}
    ]
    const adminColumns = [
        {field: 'studentName', headerName: 'Student Name', width: 150, hide: false},
        {field: 'facultyName', headerName: 'Faculty Name', width: 150, hide: false},
        {field: 'employerName', headerName: 'Employer Name', width: 175, hide: false},
        {field: 'applicationDate', headerName: 'Application Date', width: 175, hide: false},
        {field: 'applicationStatus', headerName: 'Status', width: 100, hide: false}
    ]
    const nonRoleColumns = [
        {field: 'studentPersonalEmail', headerName: 'Student Email', width: 150, hide: true},
        {field: 'studentPhone', headerName: 'Student Phone', width: 150, hide: true},
        {field: 'studentAddress', headerName: 'Student Address', width: 175, hide: true},
        {field: 'applicationDate', headerName: 'Application Date', width: 175, hide: true},
        {field: 'applicationStatus', headerName: 'Status', width: 100, hide: true},
        {field: 'employerName', headerName: 'Employer Name', width: 175, hide: true},
        {field: 'employerAddress', headerName: 'Employer Address', width: 175, hide: true},
        {field: 'startDate', headerName: 'Start Date', width: 125, hide: true},
        {field: 'endDate', headerName: 'End Date', width: 125, hide: true},
        {field: 'PointOfContact', headerName: 'Point Of Contact', width: 175, hide: true},
        {field: 'employerEmail', headerName: 'Employer Email', width: 175, hide: true},
        {field: 'employerPhone', headerName: 'Employer Phone', width: 175, hide: true},            
    ]
    let roles = []
    if (role === 'Admin') {
        roles = adminColumns
    } else if (role === 'Faculty'){
        roles = facultyColumns
    } else if (role === 'Student'){
        roles = studentColumns
    }
    const allColumns = new Set(roles, nonRoleColumns)
    const getColumns = 
            [
                ...allColumns,
                {field: 'appID', hide: true},
                {
                    field: "",
                    headerName: "Action",
                    sortable: false,
                    flex: 1,
                    disableClickEventBubbling: true,
                    renderCell: (params) => {
                    // ActionsButtons(params, applications, setCurrentApplication, setOpen, handleClose,handleClickOpen)
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
                            columns={getColumns}
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
            {/* <Row>
                <Col size={1}>
                    <DetailsDialog/>
                </Col>
            </Row> */}
        </>
       )
}