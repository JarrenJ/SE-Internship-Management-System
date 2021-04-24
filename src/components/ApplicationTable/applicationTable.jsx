import React from "react";
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import {Row, Col, DetailButton} from "../DashboardPanel/DashboardPanel"
import { COLORS, ROLES } from 'utils'



export function ApplicationTable({ role, users, applications, internships, setCurrentApplication, handleClickOpen}){

    // This determines the default columns based on role
    let adminDefault = true
    let facultyDefault = true
    let studentDefault = true
    if (role === ROLES.ADMIN) {
        adminDefault = false
    } else if (role === ROLES.FACULTY){
        facultyDefault = false
    } else if (role === ROLES.STUDENT){
        studentDefault = false
    }

    /* Column structure, widths are hardcoded to not cutoff. All columns here can be shown in table
     * Hide determines which columns are shown on load. If you would like to change the default columns
     * add or remove defaults to hide, they should be ANDed together
     */
    const columns =
            [
                {field: 'appID', hide: true}, // needed to load details
                {field: 'studentName', headerName: 'Student Name', width: 150, hide: facultyDefault && adminDefault},
                {field: 'studentPersonalEmail', headerName: 'Student Email', width: 150, hide: true},
                {field: 'studentPhone', headerName: 'Student Phone', width: 150, hide: true},
                {field: 'studentAddress', headerName: 'Student Address', width: 175, hide: true},
                {field: 'major', headerName: 'Major', width: 150, hide: facultyDefault},
                {field: 'facultyName', headerName: 'Faculty Name', width: 150, hide: adminDefault},
                {field: 'facultyEmail', headerName: 'Faculty Email', width: 175, hide: true},
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
                            setCurrentApplication(applications[params.getValue("appID")])
                        };
                        return (
                            <div>
                                {role !== ROLES.STUDENT &&
                                <DetailButton onClick={onClick}>
                                    Approve/Deny
                                </DetailButton>
                                }
                                {role === ROLES.STUDENT &&
                                <DetailButton onClick={onClick}>
                                    Details
                                </DetailButton>
                                }
                            </div>
                        );
                    }
                }
            ]
    /* Iterates through the loaded applications and gets info
     */
    const rows = Object.entries(applications).map((i, idx) => {
        const app = i[1]

        return({
            id:idx,
            appID: app.ApplicationID,
            studentName: `${users[app.StuID].FirstName} ${users[app.StuID].LastName}`,
            major: users[app.StuID].Major,
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
                    <Col size={1} bgColor={COLORS.SECONDARY_BG_COLOR} margin='0 20px'>

                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            autoHeight
                            disableSelectionOnClick
                            components={{
                                Toolbar: GridToolbar,
                            }}
                        />
                    </Col>
                </Row>
        </>
       )
}
