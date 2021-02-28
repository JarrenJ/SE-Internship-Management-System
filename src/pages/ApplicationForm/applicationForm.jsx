import React from "react";
import TextField from '@material-ui/core/TextField';
import DatePicker from "react-datepicker";
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css"
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'
import './applicationForm.css';
/*Application Form will load the application page along with the form to fill out.
Form will be one page and at the bottom will be two buttons. Upon clicking one of those buttons the data submitted will be stored and sent
*/

/*TO DO:
* -- Add in all Input Boxes (Student info/ Faculty info/ employer info)
* -- Make sure Input Boxes accept required information. Ex: an email box is receiving and email address
* -- Style Page
* -- Add in a button that when pressed stores the information when pressed.
* -- Possibly more things...
*  */
export function ApplicationForm(){
    const [startDate, change] = useState(new Date());
    const [endDate, onChange] = useState(new Date());
    return(
        <div className={'main'}>
            <form className={'app__form'} >
                <h1>Application Submission Form</h1>
                <div>
                    <h2>Student Information:</h2>
                    <TextField id="normal" label='Student ID' variant={'outlined'}/><br></br>
                    <TextField id="normal" label='First Name' variant={"outlined"}/>
                    <TextField id="normal" label='Last Name' variant={'outlined'}/><br></br>
                    <TextField id="normal" label='Personal Email' variant={'outlined'}/><br></br>
                    <TextField id="normal" label='Phone Number' variant={'outlined'}/><br></br>
                    <div>
                        <h4>Address</h4>
                        <TextField id="normal" label='Address Line 1'/><br></br>
                        <TextField id="normal" label='Address Line 2'/><br></br>
                        <TextField id="normal" label='City'/>
                        <TextField id="normal" label='State'/>
                        <TextField id="normal" label='ZIP'/>
                    </div>

                </div>
                <div>
                    <h2>Instructor Details:</h2>
                    <TextField id="normal" label='Instructor First Name' variant={"outlined"}/><br></br>
                    <TextField id="normal" label='Instructor Last Name' variant={'outlined'}/><br></br>
                    <TextField id="normal" label='Instructor Mail' variant={'outlined'}/>
                </div>
                <div>
                    <h2>Employer Information:</h2>
                    <TextField id="normal" label='Employee Name' variant={'outlined'}/><br></br>
                    <TextField id="normal" label='Primary Contact Name' variant={"outlined"}/>
                    <TextField id="normal" label='Employee Email' variant={'outlined'}/>
                    <TextField id="normal" label='Employee Phone' variant={'outlined'}/><br></br>
                    <div>
                        <h4>Employee Location</h4>
                        <TextField id="normal" label='Address Line 1'/><br></br>
                        <TextField id="normal" label='Address Line 2'/><br></br>
                        <TextField id="normal" label='City'/>
                        <TextField id="normal" label='State'/>
                        <TextField id="normal" label='ZIP'/>
                        <h6>Internship Start Date:</h6>
                        <DatePicker id="normal" onChange={change} selected={startDate} variant={'outlined'}/><br></br>
                        <h6>Internship End Date:</h6>
                        <DatePicker id="normal" onChange={onChange} selected={endDate} variant={"outlined"}/>
                    </div>
                </div>

            </form>

        </div>
    )
}