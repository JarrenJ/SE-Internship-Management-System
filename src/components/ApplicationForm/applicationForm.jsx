import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import './applicationForm.css';

const ApplicationForm1 = () => {

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

    function submitClick() {
        alert("Form Submit")
        console.log(values)
        console.log(stuAddress)
        console.log(empAddress)
        console.log(startDate)
        console.log(endDate)
    }

    const [currentStep, setCurrentStep] = useState(1)
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

    const next = () => {
        setCurrentStep(currentStep >= 2 ? 3 : currentStep + 1)
    }

    const previous = () => {
        setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1)
    }

    const nextButton = () => {
        if (currentStep < 3) {
            return (
                <button
                    className="btn btn-primary float-right"
                    type="button" onClick={next}>
                    Next
                </button>
            )
        }
        return null;
    }

    const previousButton = () => {
        if (currentStep !== 1) {
            return (
                <button
                    className="btn btn-primary float-right"
                    type="button" onClick={previous}>
                    Previous
                </button>
            )
        }
        return null;
    }

    return (
        <div className='app__form__container__component'>
            <form className='app__form__component'>
                <StudentInfo
                    currentStep={currentStep}
                    values={values}
                    stuAddress={stuAddress}
                    comments={comments}
                    setComments={setComments}
                    handleInputChange={handleInputChange}
                    handleAddressChangeS={handleAddressChangeS}
                />
                <InstructorInfo
                    currentStep={currentStep}
                    values={values}
                    handleInputChange={handleInputChange}
                />
                <EmployerInfo
                    currentStep={currentStep}
                    values={values}
                    empAddress={empAddress}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    submitClick={submitClick}
                    handleInputChange={handleInputChange}
                    handleAddressChangeE={handleAddressChangeE}
                />
                <div className='app__row__component'>
                    <div className='app__column__component'>
                        {previousButton()}
                    </div>
                    <div className='app__column__component'>
                        {nextButton()}
                    </div>
                </div>
            </form>
        </div>
    )
}

const StudentInfo = (props) => {
    const {currentStep, values, handleInputChange, handleAddressChangeS, stuAddress, comments, setComments} = props
    if (currentStep !== 1) {
        return null
    }
    return(
        <div className='student__info'>
            <h2>Student Information:</h2>
            <div className='app__row__component'>
                <div className='app__column'>
                    <TextField
                        className='app__input__component wide__component'
                        label='Student ID'
                        variant={'outlined'}
                        value={values.studentId}
                        onChange={handleInputChange}
                        name={"studentId"}
                    />
                </div>
            </div>
            <div className='app__row__component'>
                <div className='app__column__component'>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='First Name'
                        variant={"outlined"}
                        value={values.studentFirstName}
                        onChange={handleInputChange}
                        name={"studentFirstName"}
                    />
                </div>
                <div className='app__column__component'>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='Last Name'
                        variant={'outlined'}
                        value={values.studentLastName}
                        onChange={handleInputChange}
                        name={'studentLastName'}
                    />
                </div>
            </div>
            <div className='app__row__component'>
                <div className='app__column__component'>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='Personal Email'
                        variant={'outlined'}
                        value={values.studentEmail}
                        onChange={handleInputChange}
                        name={"studentEmail"}
                    />
                </div>
                <div className='app__column__component'>
                    <TextField
                        className='app__input__component'
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
            <div className='app__row__component'>
                <div className='app__column__component'>
                    <TextField
                        className='app__input__component wide__component'
                        id="normal"
                        label='Address Line 1'
                        variant='outlined'
                        value={stuAddress.line1}
                        onChange={handleAddressChangeS}
                        name="line1"
                    />
                </div>
            </div>
            <div className='app__row__component'>
                <div className='app__column__component'>
                    <TextField
                        className='app__input__component wide__component'
                        id="normal"
                        label='Address Line 2'
                        variant='outlined'
                        value={stuAddress.line2}
                        onChange={handleAddressChangeS}
                        name="line2"
                    />
                </div>
            </div>
            <div className='app__row__component'>
                <div className='app__column__3__component'>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='City'
                        variant={'outlined'}
                        value={stuAddress.city}
                        onChange={handleAddressChangeS}
                        name={"city"}
                    />
                </div>
                <div className='app__column__3__component'>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='State'
                        variant={'outlined'}
                        value={stuAddress.state}
                        onChange={handleAddressChangeS}
                        name={"state"}
                    />
                </div>
                <div className='app__column__3__component'>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='ZIP'
                        variant={'outlined'}
                        value={stuAddress.zip}
                        onChange={handleAddressChangeS}
                        name={"zip"}
                    />
                </div>
            </div>
            <div className='app__row__component'>
                <div className='app__column__component'>
                    <TextField
                        className='app__input__component wide__component'
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
    )
}

const InstructorInfo = (props) => {
    const {currentStep, values, handleInputChange} = props
    if (currentStep !== 2) {
        return null
    }
    return(
        <div className='instructor__details'>
            <h2>Instructor Details:</h2>
            <div className='app__row__component'>
                <div className='app__column__component'>
                    <TextField
                        className='app__input__component wide__component'
                        id="normal"
                        label='Instructor First Name'
                        variant={"outlined"}
                        value={values.instructorFirstName}
                        onChange={handleInputChange}
                        name={'instructorFirstName'}
                    />
                </div>
            </div>
            <div className='app__row__component'>
                <div className='app__column__component'>
                    <TextField
                        className='app__input__component wide__component'
                        id="normal"
                        label='Instructor Last Name'
                        variant={'outlined'}
                        value={values.instructorLastName}
                        onChange={handleInputChange}
                        name={"instructorLastName"}
                    />
                </div>
            </div>
            <div className='app__row__component'>
                <div className='app__column__component'>
                    <TextField
                        className='app__input__component wide__component'
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
    )
}

const EmployerInfo = (props) => {
    const {currentStep, values, handleInputChange, handleAddressChangeE, empAddress, endDate, startDate, setEndDate, setStartDate, submitClick} = props
    if (currentStep !== 3) {
        return null
    }
    return(
        <>
        <div className='employer__details'>
            <h2>Employer Information:</h2>
            <div className='app__row__component'>
                <div className='app__column__component'>
                    <TextField
                        className='app__input__component wide__component'
                        id="normal"
                        label='Employer Name'
                        variant={'outlined'}
                        value={values.employerName}
                        onChange={handleInputChange}
                        name={"employerName"}
                    />
                </div>
            </div>
            <div className='app__row__component'>
                <div className='app__column__component'>
                    <TextField
                        className='app__input__component wide__component'
                        id="normal"
                        label='Primary Contact Name'
                        variant={"outlined"}
                        value={values.primaryContactName}
                        onChange={handleInputChange}
                        name={"primaryContactName"}
                    />
                </div>
            </div>
            <div className='app__row__component'>
                <div className='app__column__component'>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='Employer Email'
                        variant={'outlined'}
                        value={values.employerEmail}
                        onChange={handleInputChange}
                        name={"employerEmail"}
                    />
                </div>
                <div className='app__column__component'>
                    <TextField
                        className='app__input__component'
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
                <div className='app__row__component'>
                    <div className='app__column__component'>
                        <TextField
                            className='app__input__component wide__component'
                            id="normal"
                            label='Address Line 1'
                            variant='outlined'
                            value={empAddress.line1}
                            onChange={handleAddressChangeE}
                            name={"line1"}
                        />
                    </div>
                </div>
                <div className='app__row__component'>
                    <div className='app__column__component'>
                        <TextField
                            className='app__input__component wide__component'
                            id="normal"
                            label='Address Line 2'
                            variant='outlined'
                            value={empAddress.line2}
                            onChange={handleAddressChangeE}
                            name={"line2"}
                        />
                    </div>
                </div>
                <div className='app__row__component'>
                    <div className='app__column__3__component'>
                        <TextField
                            className='app__input__component'
                            id="normal"
                            label='City'
                            variant='outlined'
                            value={empAddress.city}
                            onChange={handleAddressChangeE}
                            name={"city"}
                        />
                    </div>
                    <div className='app__column__3__component'>
                        <TextField
                            className='app__input__component'
                            id="normal"
                            label='State'
                            variant='outlined'
                            value={empAddress.state}
                            onChange={handleAddressChangeE}
                            name={"state"}
                        />
                    </div>
                    <div className='app__column__3__component'>
                        <TextField
                            className='app__input__component'
                            id="normal"
                            label='ZIP'
                            variant='outlined'
                            value={empAddress.zip}
                            onChange={handleAddressChangeE}
                            name={"zip"}
                        />
                    </div>
                </div>
                <div className='app__row__component'>
                    <div className='app__column__component'>
                        <TextField
                            className='app__input__component wide__component'
                            id="date"
                            label="Internship Start Date"
                            type="date"
                            variant='outlined'
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                <div className='app__row__component'>
                    <div className='app__column__component'>
                        <TextField
                            className='app__input__component wide__component'
                            id="date"
                            label="Internship End Date"
                            type="date"
                            variant='outlined'
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
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
            onClick={submitClick}
        >
            Submit
        </Button>
    </>
    )
}

export { ApplicationForm1 }
