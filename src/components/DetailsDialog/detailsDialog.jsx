import React, { useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Row, Col, DetailButton } from "../DashboardPanel/DashboardPanel"
import { TextField } from "@material-ui/core";
import { COLORS, ROLES } from 'utils'


export function DetailsDialog({ handleClose, internships, role, users, currentApplication, detailsDialogOpen, showAppForm }) {

    /* Endpoint takes the information given in DetailsDialog and submits it to the database
     * 
     */
    const updateStatus = (status, appID, comment) => {
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
                "appID": appID,
                "comment": comment
            }),
        }).then(r => window.location.reload(true))
        handleClose()
    }
    // holds the comment that Faculty can leave when approve/deny
    const [comment, set_comment] = useState("");
    const handleCommentChange = (e) => {
        set_comment(e.target.value)
    }
    // For comment box. Max size in database 255 characters
    const CHAR_LIM = 250;

    const DetailsRow = ({ label, info }) => {
        return (
            <Row>
                <Col size={1}>
                    {label}: {info}
                </Col>
            </Row>
        )
    }
    // this code should never be seen, here so the site doesn't break on load
    if (typeof currentApplication === 'undefined') {
        return (
            <Dialog
                open={detailsDialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">{"Details"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Something went wrong and your data was not loaded
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <DetailButton bgColor='gray' onClick={handleClose}>
                        Close
                    </DetailButton>
                </DialogActions>
            </Dialog>
        )
    } else {
        return (
            <div>
                <Dialog
                    open={detailsDialogOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title">{"Details"}</DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <DetailsRow label="Student Name" info={`${users[currentApplication.StuID].FirstName} ${users[currentApplication.StuID].LastName}`} />
                            <DetailsRow label="Student Personal Email" info={users[currentApplication.StuID].PersonalEmail} />
                            <DetailsRow label="Student Phone" info={users[currentApplication.StuID].Phone} />
                            <DetailsRow label="Major" info={users[currentApplication.StuID].Major} />
                            <br />
                            <DetailsRow label="Student Address" info={users[currentApplication.StuID].StudentAddress} />
                            <DetailsRow label="Application Date" info={currentApplication.ApplicationDate} />
                            <DetailsRow label="Application Status" info={currentApplication.ApplicationStatus} />
                            <DetailsRow label="Start Date" info={internships[currentApplication.InternID].StartDate.substr(0, internships[currentApplication.InternID].StartDate.indexOf('T'))} />
                            <DetailsRow label="End Date" info={internships[currentApplication.InternID].EndDate.substr(0, internships[currentApplication.InternID].EndDate.indexOf('T'))} />
                            <br />
                            <DetailsRow label="Faculty Name" info={`${users[currentApplication.FacID].FirstName} ${users[currentApplication.FacID].LastName}`} />
                            <DetailsRow label="Faculty Email" info={users[currentApplication.FacID].PersonalEmail} />
                            <br />
                            <DetailsRow label="Employer Name" info={internships[currentApplication.InternID].EmployerName} />
                            <DetailsRow label="Employer Address" info={internships[currentApplication.InternID].EmployerAddress} />
                            <DetailsRow label="Point Of Contact" info={internships[currentApplication.InternID].PointOfContact} />
                            <DetailsRow label="Employer Email" info={internships[currentApplication.InternID].EmployerEmail} />
                            <DetailsRow label="Employer Phone" info={internships[currentApplication.InternID].EmployerPhone} />
                            <Row>
                                <Col size={1}>
                                    Past Comments: {currentApplication.Comments}
                                </Col>
                            </Row>
                        </DialogContentText>
                        {role !== ROLES.STUDENT &&
                            <>
                                <TextField
                                    variant="outlined"
                                    value={comment}
                                    label="Comments"
                                    multiline={true}
                                    rows={2}
                                    onChange={handleCommentChange}
                                    inputProps={{
                                        maxlength: CHAR_LIM
                                    }}
                                    helperText={`${comment.length}/${CHAR_LIM}`}
                                    fullWidth
                                />
                            </>
                        }
                    </DialogContent>
                    <DialogActions>
                        {role !== ROLES.STUDENT &&
                            <>
                                <DetailButton bgColor={COLORS.APPROVE} onClick={() => updateStatus('Approved', currentApplication.ApplicationID, comment)}>
                                    Approve
                                </DetailButton>
                                <DetailButton bgColor={COLORS.DENY} onClick={() => updateStatus('Denied', currentApplication.ApplicationID, comment)} autoFocus>
                                    Deny
                                </DetailButton>
                            </>
                        }
                        <DetailButton bgColor={COLORS.CLOSE} onClick={() => {
                            handleClose()
                            showAppForm()
                        }
                        }>
                            Edit Application
                        </DetailButton>

                        <DetailButton bgColor={COLORS.CLOSE} onClick={handleClose}>
                            Close
                        </DetailButton>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
