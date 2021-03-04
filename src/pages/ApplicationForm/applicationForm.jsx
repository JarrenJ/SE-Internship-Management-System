import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DatePicker from "react-datepicker";
import { useState } from 'react';
import { useForm } from "react-hook-form";
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

export function ApplicationForm() {
    //variable used to intialize the values of all input boxes
    const initialValues = {
        studentId: "",
        studentFirstName: "",
        studentLastName: "",
        studentEmail: "",
        studentPhoneNum: "",
        instructorFirstName: "",
        instructorLastName: "",
        instructorEmail: "",
        employerName: "",
        primaryContactName: "",
        employerEmail: "",
        employerPhone: "",
    };

    const initialStuAddr = {
        line1: "",
        line2: "",
        city: "",
        state: "",
        zip: "",
    }

    const initialEmpAddr = {
        line1: "",
        line2: "",
        city: "",
        state: "",
        zip: "",
    }

    function submitCLick(){
        alert("Form Submit")
        console.log(values)
        console.log(stuAddress)
        console.log(empAddress)
        console.log(startDate)
        console.log(endDate)
    }

    const [startDate, change] = useState(new Date());
    const [endDate, onChange] = useState(new Date());
    const [values, setValues] = useState(initialValues) //will store majority of the text box inputs
    const [stuAddress, setStuAddress] = useState(initialStuAddr);
    const [empAddress, setEmpAddress] = useState(initialEmpAddr);

    const handleInputChange = (e) => {
        //const name = e.target.name
        //const value = e.target.value
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        })
    }
    const handleAddressChangeS = (e) => {
        const {name, value} = e.target;
        setStuAddress({
            ...stuAddress,
            [name]: value,
        })
    }

    const handleAddressChangeE = (e) => {
        const {name, value} = e.target;
        setEmpAddress({
            ...empAddress,
            [name]: value,
        })
    }
    console.log(initialValues)
    console.log(values.studentId)
    return (
        <div className={'appFormContainer'}>
            <form className={'app__form'}>
                <h1>Application Submission Form</h1>
                <div>
                    <h2>Student Information:</h2>
                    <TextField
                        label='Student ID'
                        variant={'outlined'}
                        value={values.studentId}
                        onChange={handleInputChange}
                        name={"studentId"}
                    /><br></br>
                    <TextField
                        id="normal"
                        label='First Name'
                        variant={"outlined"}
                        value={values.studentFirstName}
                        onChange={handleInputChange}
                        name={"studentFirstName"}
                    />
                    <TextField
                        id="normal"
                        label='Last Name'
                        variant={'outlined'}
                        value={values.studentLastName}
                        onChange={handleInputChange}
                        name={'studentLastName'}
                    /><br></br>
                    <TextField
                        id="normal"
                        label='Personal Email'
                        variant={'outlined'}
                        value={values.studentEmail}
                        onChange={handleInputChange}
                        name={"studentEmail"}
                    /><br></br>
                    <TextField
                        id="normal"
                        label='Phone Number'
                        variant={'outlined'}
                        value={values.studentPhoneNum}
                        onChange={handleInputChange}
                        name={"studentPhoneNum"}
                    /><br></br>
                    <div>
                        <h4>Address:</h4>
                        <TextField
                            id="normal"
                            label='Address Line 1'
                            value={stuAddress.line1}
                            onChange={handleAddressChangeS}
                            name={"line1"}
                        /><br></br>
                        <TextField
                            id="normal"
                            label='Address Line 2'
                            value={stuAddress.line2}
                            onChange={handleAddressChangeS}
                            name={"line2"}
                        /><br></br>
                        <TextField
                            id="normal"
                            label='City'
                            value={stuAddress.city}
                            onChange={handleAddressChangeS}
                            name={"city"}
                        />
                        <TextField
                            id="normal"
                            label='State'
                            value={stuAddress.state}
                            onChange={handleAddressChangeS}
                            name={"state"}
                        />
                        <TextField
                            id="normal"
                            label='ZIP'
                            value={stuAddress.zip}
                            onChange={handleAddressChangeS}
                            name={"zip"}
                        />
                    </div>
                </div>
                <div>
                    <h2>Instructor Details:</h2>
                    <TextField
                        id="normal"
                        label='Instructor First Name'
                        variant={"outlined"}
                        value={values.instructorFirstName}
                        onChange={handleInputChange}
                        name={'instructorFirstName'}
                    />
                    <TextField
                        id="normal"
                        label='Instructor Last Name'
                        variant={'outlined'}
                        value={values.instructorLastName}
                        onChange={handleInputChange}
                        name={"instructorLastName"}
                    /><br></br>
                    <TextField
                        id="normal"
                        label='Instructor Mail'
                        variant={'outlined'}
                        value={values.instructorEmail}
                        onChange={handleInputChange}
                        name={"instructorEmail"}
                    />
                </div>
                <div>
                    <h2>Employer Information:</h2>
                    <TextField
                        id="normal"
                        label='Employer Name'
                        variant={'outlined'}
                        value={values.employerName}
                        onChange={handleInputChange}
                        name={"employerName"}
                    /><br></br>
                    <TextField
                        id="normal"
                        label='Primary Contact Name'
                        variant={"outlined"}
                        value={values.primaryContactName}
                        onChange={handleInputChange}
                        name={"primaryContactName"}
                    /><br></br>
                    <TextField
                        id="normal"
                        label='Employer Email'
                        variant={'outlined'}
                        value={values.employerEmail}
                        onChange={handleInputChange}
                        name={"employerEmail"}
                    /><br></br>
                    <TextField
                        id="normal"
                        label='Employer Phone'
                        variant={'outlined'}
                        value={values.employerPhone}
                        onChange={handleInputChange}
                        name={"employerPhone"}
                    /><br></br>
                    <div>
                        <h4>Employee Location:</h4>
                        <TextField
                            id="normal"
                            label='Address Line 1'
                            value={empAddress.line1}
                            onChange={handleAddressChangeE}
                            name={"line1"}
                        /><br></br>
                        <TextField
                            id="normal"
                            label='Address Line 2'
                            value={empAddress.line2}
                            onChange={handleAddressChangeE}
                            name={"line2"}
                        /><br></br>
                        <TextField
                            id="normal"
                            label='City'
                            value={empAddress.city}
                            onChange={handleAddressChangeE}
                            name={"city"}
                        />
                        <TextField
                            id="normal"
                            label='State'
                            value={empAddress.state}
                            onChange={handleAddressChangeE}
                            name={"state"}
                        />
                        <TextField
                            id="normal"
                            label='ZIP'
                            value={empAddress.zip}
                            onChange={handleAddressChangeE}
                            name={"zip"}
                        />
                        <h4>Internship Start Date:</h4>
                        <DatePicker id="normal" onChange={change} selected={startDate} variant={'outlined'}/><br></br>
                        <h4>Internship End Date:</h4>
                        <DatePicker id="normal" onChange={onChange} selected={endDate} variant={"outlined"}/>
                    </div>
                </div>
                <Button
                    variant={"contained"}
                    onClick={submitCLick}
                >
                    Submit
                </Button>

            </form>

        </div>
    )

}