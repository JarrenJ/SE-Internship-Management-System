import React from "react";
import TextField from '@material-ui/core/TextField';

/*Application Form will load the application page along with the form to fill out.
Form will be one page and at the bottom will be two buttons. Upon clicking one of those buttons the data submitted will be stored and sent
*/
export function ApplicationForm(){

    return(
        <div className={"main"}>
            <form className={'app__form'} >
                <h1>Application Submission Form</h1>
                <h4>Student ID</h4>
                <TextField id="filled-basic" label='Student ID' variant='filled'/>


            </form>





        </div>
    )
}