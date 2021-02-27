import React from "react";
import TextField from '@material-ui/core/TextField';

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

    return(
        <div className={'main'}>
            <form className={'app__form'} >
                <h1>Application Submission Form</h1>
                <div>
                    <h2>Student Information</h2>
                    <TextField id="normal" label='Student ID' variant={'outlined'}/>
                    <TextField id="normal" label='First Name' variant={"outlined"}/>
                    <TextField id="normal" label='Last Name' variant={'outlined'}/>
                    <TextField id="normal" label='Personal Email' variant={'outlined'}/>
                    <TextField id="normal" label='Phone Number' variant={'outlined'}/>
                    <div>
                        <h4>Address</h4>
                        <TextField id="normal" label='Address Line 1'/>
                        <TextField id="normal" label='Address Line 2'/>
                        <TextField id="normal" label='City'/>
                        <TextField id="normal" label='State'/>
                        <TextField id="normal" label='ZIP'/>
                    </div>

                </div>
                <div>
                    <h2>Instructor Details</h2>


                </div>
                <div>
                    <h2>Employer Information</h2>

                </div>

            </form>





        </div>
    )
}