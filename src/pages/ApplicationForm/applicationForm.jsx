import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import DatePicker from "react-datepicker";
// import { useForm } from "react-hook-form";
// import "react-datepicker/dist/react-datepicker.css"
// import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'
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
        comments: "",
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

    const [startDate, setStartDate] = useState("2021-05-13")
    const [endDate, setEndDate] = useState("2021-05-14")
    const [values, setValues] = useState(initialValues) //will store majority of the text box inputs
    const [comments, setComments] = useState('')
    const [stuAddress, setStuAddress] = useState(initialStuAddr);
    const [empAddress, setEmpAddress] = useState(initialEmpAddr);

    const handleInputChange = (e) => {
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
    return (
        <div className='appFormContainer'>
            <form className='app__form'>
                <h1>Application Submission Form</h1>
                <div>
                    <h2>Student Information:</h2>
                    <div className='app__row'>
                        <div className='app__column'>
                            <TextField
                                className='app__input wide'
                                label='Student ID'
                                variant={'outlined'}
                                value={values.studentId}
                                onChange={handleInputChange}
                                name={"studentId"}
                            />
                        </div>
                    </div>
                    <div className='app__row'>
                        <div className='app__column'>
                            <TextField
                                className='app__input'
                                id="normal"
                                label='First Name'
                                variant={"outlined"}
                                value={values.studentFirstName}
                                onChange={handleInputChange}
                                name={"studentFirstName"}
                            />
                        </div>
                        <div className='app__column'>
                            <TextField
                                className='app__input'
                                id="normal"
                                label='Last Name'
                                variant={'outlined'}
                                value={values.studentLastName}
                                onChange={handleInputChange}
                                name={'studentLastName'}
                            />
                        </div>
                    </div>
                    <div className='app__row'>
                        <div className='app__column'>
                            <TextField
                                className='app__input'
                                id="normal"
                                label='Personal Email'
                                variant={'outlined'}
                                value={values.studentEmail}
                                onChange={handleInputChange}
                                name={"studentEmail"}
                            />
                        </div>
                        <div className='app__column'>
                            <TextField
                                className='app__input'
                                id="normal"
                                label='Phone Number'
                                variant={'outlined'}
                                value={values.studentPhoneNum}
                                onChange={handleInputChange}
                                name={"studentPhoneNum"}
                            />
                        </div>
                    </div>
                        {/*<h4>Address:</h4>*/}
                    <div className='app__row'>
                        <div className='app__column'>
                            <TextField
                                className='app__input wide'
                                id="normal"
                                label='Address Line 1'
                                variant='outlined'
                                value={stuAddress.line1}
                                onChange={handleAddressChangeS}
                                name="line1"
                            />
                        </div>
                    </div>
                    <div className='app__row'>
                        <div className='app__column'>
                            <TextField
                                className='app__input wide'
                                id="normal"
                                label='Address Line 2'
                                variant='outlined'
                                value={stuAddress.line2}
                                onChange={handleAddressChangeS}
                                name="line2"
                            />
                        </div>
                    </div>
                    <div className='app__row'>
                        <div className='app__column__3'>
                            <TextField
                                className='app__input'
                                id="normal"
                                label='City'
                                variant={'outlined'}
                                value={stuAddress.city}
                                onChange={handleAddressChangeS}
                                name={"city"}
                            />
                        </div>
                        <div className='app__column__3'>
                            <TextField
                                className='app__input'
                                id="normal"
                                label='State'
                                variant={'outlined'}
                                value={stuAddress.state}
                                onChange={handleAddressChangeS}
                                name={"state"}
                            />
                        </div>
                        <div className='app__column__3'>
                            <TextField
                                className='app__input'
                                id="normal"
                                label='ZIP'
                                variant={'outlined'}
                                value={stuAddress.zip}
                                onChange={handleAddressChangeS}
                                name={"zip"}
                            />
                        </div>
                    </div>
                    <div className='app__row'>
                        <div className='app__column'>
                            <TextField
                                className='app__input wide'
                                id="normal"
                                label="Comments"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={comments}
                                onChange={(e) => setComments(e.target.value) }
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Instructor Details:</h2>
                    <div className='app__row'>
                        <div className='app__column'>
                            <TextField
                                className='app__input wide'
                                id="normal"
                                label='Instructor First Name'
                                variant={"outlined"}
                                value={values.instructorFirstName}
                                onChange={handleInputChange}
                                name={'instructorFirstName'}
                            />
                        </div>
                    </div>
                    <div className='app__row'>
                        <div className='app__column'>
                            <TextField
                                className='app__input wide'
                                id="normal"
                                label='Instructor Last Name'
                                variant={'outlined'}
                                value={values.instructorLastName}
                                onChange={handleInputChange}
                                name={"instructorLastName"}
                            />
                        </div>
                    </div>
                    <div className='app__row'>
                        <div className='app__column'>
                            <TextField
                                className='app__input wide'
                                id="normal"
                                label='Instructor Mail'
                                variant={'outlined'}
                                value={values.instructorEmail}
                                onChange={handleInputChange}
                                name={"instructorEmail"}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Employer Information:</h2>
                    <div className='app__row'>
                        <div className='app__column'>
                            <TextField
                                className='app__input wide'
                                id="normal"
                                label='Employer Name'
                                variant={'outlined'}
                                value={values.employerName}
                                onChange={handleInputChange}
                                name={"employerName"}
                            />
                        </div>
                    </div>
                    <div className='app__row'>
                        <div className='app__column'>
                            <TextField
                                className='app__input wide'
                                id="normal"
                                label='Primary Contact Name'
                                variant={"outlined"}
                                value={values.primaryContactName}
                                onChange={handleInputChange}
                                name={"primaryContactName"}
                            />
                        </div>
                    </div>
                    <div className='app__row'>
                        <div className='app__column'>
                            <TextField
                                className='app__input'
                                id="normal"
                                label='Employer Email'
                                variant={'outlined'}
                                value={values.employerEmail}
                                onChange={handleInputChange}
                                name={"employerEmail"}
                            />
                        </div>
                        <div className='app__column'>
                            <TextField
                                className='app__input'
                                id="normal"
                                label='Employer Phone'
                                variant={'outlined'}
                                value={values.employerPhone}
                                onChange={handleInputChange}
                                name={"employerPhone"}
                            />
                        </div>
                    </div>
                    <div>
                        {/*<h4>Employee Location:</h4>*/}
                        <div className='app__row'>
                            <div className='app__column'>
                                <TextField
                                    className='app__input wide'
                                    id="normal"
                                    label='Address Line 1'
                                    variant='outlined'
                                    value={empAddress.line1}
                                    onChange={handleAddressChangeE}
                                    name={"line1"}
                                />
                            </div>
                        </div>
                        <div className='app__row'>
                            <div className='app__column'>
                                <TextField
                                    className='app__input wide'
                                    id="normal"
                                    label='Address Line 2'
                                    variant='outlined'
                                    value={empAddress.line2}
                                    onChange={handleAddressChangeE}
                                    name={"line2"}
                                />
                            </div>
                        </div>
                        <div className='app__row'>
                            <div className='app__column__3'>
                                <TextField
                                    className='app__input'
                                    id="normal"
                                    label='City'
                                    variant='outlined'
                                    value={empAddress.city}
                                    onChange={handleAddressChangeE}
                                    name={"city"}
                                />
                            </div>
                            <div className='app__column__3'>
                                <TextField
                                    className='app__input'
                                    id="normal"
                                    label='State'
                                    variant='outlined'
                                    value={empAddress.state}
                                    onChange={handleAddressChangeE}
                                    name={"state"}
                                />
                            </div>
                            <div className='app__column__3'>
                                <TextField
                                    className='app__input'
                                    id="normal"
                                    label='ZIP'
                                    variant='outlined'
                                    value={empAddress.zip}
                                    onChange={handleAddressChangeE}
                                    name={"zip"}
                                />
                            </div>
                        </div>
                        {/*<h4>Internship Start Date:</h4>*/}
                        {/*<DatePicker id="normal" onChange={change} selected={startDate} variant={'outlined'}/><br></br>*/}
                        {/*<h4>Internship End Date:</h4>*/}
                        {/*<DatePicker id="normal" onChange={onChange} selected={endDate} variant={"outlined"}/>*/}
                        <div className='app__row'>
                            <div className='app__column'>
                                <TextField
                                    className='app__input wide'
                                    id="date"
                                    label="Internship Start Date"
                                    type="date"
                                    variant='outlined'
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    // defaultValue="2017-05-24"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </div>
                        <div className='app__row'>
                            <div className='app__column'>
                                <TextField
                                    className='app__input wide'
                                    id="date"
                                    label="Internship End Date"
                                    type="date"
                                    variant='outlined'
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    // defaultValue="2017-05-24"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </div>
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
