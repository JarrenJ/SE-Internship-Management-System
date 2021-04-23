import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { Row, Col } from "../DashboardPanel/DashboardPanel"

import styled from "styled-components";

import './applicationForm.css';

const Form = styled.form`
    width: 100%;
    max-width: 80%;
    background-color: var(--secondary-bg-color);
    border-radius: 3px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    display: flex;
    padding: 2rem 0;
    justify-content: center;
    align-items: center;
`

export function ApplicationForm({ getInitial, hideAppForm }) {
    // Gets initial values from DashboardPanel
    const {initialValues, initialStartDate, initialEndDate, initialEmpAddr, initialStuAddr, date} = getInitial()

    // determines which page is rendered, page values are hard coded
    const [currentStep, setCurrentStep] = useState(1)

    // State for all info that needs to be modified 
    const [signature, setSignature] = useState(" ")
    const [agreementDate, setAgreementDate] = useState(" ")
    const [startDate, setStartDate] = useState(initialStartDate)
    const [endDate, setEndDate] = useState(initialEndDate)
    const [values, setValues] = useState(initialValues) //will store majority of the text box inputs
    const [comments, setComments] = useState('')
    const [stuAddress, setStuAddress] = useState(initialStuAddr);
    const [empAddress, setEmpAddress] = useState(initialEmpAddr);

    /* Submits all values from application state into submit endpoint 
     *
     */
    const onSubmit = () => {
        console.log("hit submit")
        fetch(`/api/submit`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    ...values,
                    "comments": comments,
                    "stuAddress": `${stuAddress.line1}, ${stuAddress.line2}, ${stuAddress.city}, ${stuAddress.state}, ${stuAddress.zip}`,
                    "empAddress": `${empAddress.line1}, ${empAddress.line2}, ${empAddress.city}, ${empAddress.state}, ${empAddress.zip}`,
                    "startDate": startDate,
                    "endDate": endDate,
                    "submitDate": date,
                    "signature": signature,
                    "agreementDate": agreementDate
                }
            ),
        }).then(r => window.location.reload(true))
        hideAppForm()
    }

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
        setCurrentStep(currentStep >= 3 ? 4 : currentStep + 1)
    }

    const previous = () => {
        setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1)
    }
    const closeButton = () => {
        return(
            <Button
                    variant='outlined'
                    onClick={hideAppForm}
                >
                    Close
                </Button>
        )
    }
    const nextButton = () => {
        if (currentStep < 4) {
            return (
                <Button
                    variant='outlined'
                    onClick={next}
                >
                    Next
                </Button>
            )
        }
        return (
            <Button
                variant='outlined'
                onClick={onSubmit}
                disabled={((signature.length < 3) || (values.studentId < 3) ||
                    (values.instructorEmail < 3) || (agreementDate.length < 1)) === true}
            >
                Submit
            </Button>
        )
    }

    const previousButton = () => {
        if (currentStep !== 1) {
            return (
                <Button
                    variant='outlined'
                    onClick={previous}
                >
                    Previous
                </Button>
            )
        }
        return null
    }
    return (
        <Container>
            <Form>
                <Row minHeight='700px'>
                    <Col size={1}>
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
                            handleInputChange={handleInputChange}
                            handleAddressChangeE={handleAddressChangeE}
                        />
                        <Agreement
                        currentStep={currentStep}
                        values={values}
                        signature={signature}
                        setSignature={setSignature}
                        agreementDate={agreementDate}
                        setAgreementDate={setAgreementDate}
                        handleInputChange={handleInputChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col size={1} maxWidth='100%' margin='0 30px'>
                        <div className='app__btns__container'>
                            <div className='app__btn__prev'>
                                {previousButton()}
                            </div>
                            <div className='app__btn__next'>
                                {nextButton()}
                            </div>
                            <div className='app__btn__close'>
                                {closeButton()}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

const StudentInfo = ({ currentStep, values, handleInputChange, handleAddressChangeS, stuAddress, comments, setComments }) => {
    if (currentStep !== 1) {
        return null
    }
    return(
        <div className='student__info'>
            <Row>
                <Col size={1} margin='0 10px'>
                    <h2>Student Information:</h2>
                </Col>
            </Row>
            <Row>
                <Col size={1} margin='10px'>
                    <TextField
                        className='wide'
                        label='Student ID'
                        variant='outlined'
                        value={values.studentId}
                        onChange={handleInputChange}
                        name="studentId"
                    />
                </Col>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='app__input__component'
                        label='Major'
                        variant='outlined'
                        value={values.major}
                        onChange={handleInputChange}
                        name="major"
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin='10px'>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='First Name'
                        variant="outlined"
                        value={values.studentFirstName}
                        onChange={handleInputChange}
                        name="studentFirstName"
                    />
                </Col>
                <Col size={1} margin='10px'>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='Last Name'
                        variant='outlined'
                        value={values.studentLastName}
                        onChange={handleInputChange}
                        name='studentLastName'
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin='10px'>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='Personal Email'
                        variant='outlined'
                        value={values.studentEmail}
                        onChange={handleInputChange}
                        name="studentEmail"
                    />
                </Col>
                <Col size={1} margin='10px'>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='Phone Number'
                        variant='outlined'
                        value={values.studentPhoneNum}
                        onChange={handleInputChange}
                        name="studentPhoneNum"
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin='10px'>
                    <TextField
                        className='wide'
                        id="normal"
                        label='Address Line 1'
                        variant='outlined'
                        value={stuAddress.line1}
                        onChange={handleAddressChangeS}
                        name="line1"
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin='10px'>
                    <TextField
                        className='wide'
                        id="normal"
                        label='Address Line 2'
                        variant='outlined'
                        value={stuAddress.line2}
                        onChange={handleAddressChangeS}
                        name="line2"
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin='10px'>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='City'
                        variant='outlined'
                        value={stuAddress.city}
                        onChange={handleAddressChangeS}
                        name="city"
                    />
                </Col>
                <Col size={1} margin='10px'>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='State'
                        variant='outlined'
                        value={stuAddress.state}
                        onChange={handleAddressChangeS}
                        name="state"
                    />
                </Col>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='ZIP'
                        variant='outlined'
                        value={stuAddress.zip}
                        onChange={handleAddressChangeS}
                        name="zip"
                    />
                </Col>
            </Row>
            {/*
              * Below code is for comments, we never found reason to use, so commented out for now.
            */}
            {/* <Row>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='wide'
                        id="normal"
                        label="Comments"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={comments}
                        onChange={(e) => setComments(e.target.value) }
                    />
                </Col>
            </Row> */}
        </div>
    )
}

const InstructorInfo = ({ currentStep, values, handleInputChange }) => {
    if (currentStep !== 2) {
        return null
    }
    return(
        <div className='instructor__details'>
            <Row>
                <Col size={1} margin='0 10px'>
                    <h2>Instructor Details:</h2>
                </Col>
            </Row>
            <Row>
                <Col size={1} margin='10px'>
                    <TextField
                        className='wide'
                        id="normal"
                        label='Instructor First Name'
                        variant="outlined"
                        value={values.instructorFirstName}
                        onChange={handleInputChange}
                        name='instructorFirstName'
                    />
                </Col>
                <Col size={1} margin='10px'>
                    <TextField
                        className='wide'
                        id="normal"
                        label='Instructor Last Name'
                        variant={'outlined'}
                        value={values.instructorLastName}
                        onChange={handleInputChange}
                        name="instructorLastName"
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin='10px'>
                    <TextField
                        className='wide'
                        id="normal"
                        label='Instructor Mail'
                        variant='outlined'
                        value={values.instructorEmail}
                        onChange={handleInputChange}
                        name="instructorEmail"
                    />
                </Col>
            </Row>
        </div>
    )
}

const EmployerInfo = ({ currentStep, values, handleInputChange, handleAddressChangeE, empAddress, endDate, startDate, setEndDate, setStartDate }) => {
    if (currentStep !== 3) {
        return null
    }
    return (
        <>
            <div className='employer__details'>
                <Row>
                    <Col size={1} margin='0 10px'>
                        <h2>Employer Information:</h2>
                    </Col>
                </Row>
                <Row>
                    <Col size={1} margin='10px'>
                        <TextField
                            className='wide'
                            id="normal"
                            label='Employer Name'
                            variant='outlined'
                            value={values.employerName}
                            onChange={handleInputChange}
                            name="employerName"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col size={1} margin='10px'>
                        <TextField
                            className='wide'
                            id="normal"
                            label='Primary Contact Name'
                            variant="outlined"
                            value={values.primaryContactName}
                            onChange={handleInputChange}
                            name="primaryContactName"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col size={1} margin='10px'>
                        <TextField
                            className='wide'
                            id="normal"
                            label='Employer Email'
                            variant='outlined'
                            value={values.employerEmail}
                            onChange={handleInputChange}
                            name="employerEmail"
                        />
                    </Col>
                    <Col size={1} margin='10px'>
                        <TextField
                            className='wide'
                            id="normal"
                            label='Employer Phone'
                            variant='outlined'
                            value={values.employerPhone}
                            onChange={handleInputChange}
                            name="employerPhone"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col size={1} margin='10px'>
                        <TextField
                            className='wide'
                            id="normal"
                            label='Address Line 1'
                            variant='outlined'
                            value={empAddress.line1}
                            onChange={handleAddressChangeE}
                            name="line1"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col size={1} margin='10px'>
                        <TextField
                            className='wide'
                            id="normal"
                            label='Address Line 2'
                            variant='outlined'
                            value={empAddress.line2}
                            onChange={handleAddressChangeE}
                            name="line2"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col size={1} margin='10px'>
                        <TextField
                            className='wide'
                            id="normal"
                            label='City'
                            variant='outlined'
                            value={empAddress.city}
                            onChange={handleAddressChangeE}
                            name="city"
                        />
                    </Col>
                    <Col size={1} margin='10px'>
                        <TextField
                            className='wide'
                            id="normal"
                            label='State'
                            variant='outlined'
                            value={empAddress.state}
                            onChange={handleAddressChangeE}
                            name="state"
                        />
                    </Col>
                    <Col size={1} margin='10px'>
                        <TextField
                            className='wide'
                            id="normal"
                            label='ZIP'
                            variant='outlined'
                            value={empAddress.zip}
                            onChange={handleAddressChangeE}
                            name="zip"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col size={1} margin={'10px'}>
                        <TextField
                            className='wide'
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
                    </Col>
                </Row>
                <Row>
                    <Col size={1} margin='10px'>
                        <TextField
                            className='wide'
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
                    </Col>
                </Row>
            </div>
        </>
    )
}

const Agreement = ({ currentStep, signature, setSignature, agreementDate, setAgreementDate }) => {
    if (currentStep !== 4) {
        return null
    }
    return(
        <div className='Internship Agreement'>
            <Row>
                <Col size={1} margin='0 20px'>
                    <h2>Internship Agreement:</h2>
                </Col>
            </Row>
            <Row>
                <Col size={1} margin='0 30px'>
                    <h3>The Student agrees to:</h3>
                </Col>
            </Row>
            <Row>
                <Col size='1' margin='0 35px'>
                    <ul>
                        <li>Do an honest day’s work,
                            recognizing that the employer must profit
                            from the student’s labor in order to justify providing the internship experience.</li>
                        <li>Keep the employer’s interest in mind and be punctual, dependable, and loyal.</li>
                        <li>Follow instructions, avoid unsafe acts, and be alert to unsafe conditions.</li>
                        <li>Be courteous and considerate of the employer, co-workers, and customers.</li>
                        <li>Do all jobs assigned to the best of one’s ability.</li>
                        <li>Be alert to perform unassigned tasks which promote the welfare of the business.</li>
                        <li>Notify the employer prior to any absence.</li>
                        <li>Keep records of the work experience and complete all reports the school and employer require</li>
                        <li>Report to the University Supervisor any problem, in regard to the training, prior to any termination</li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col size={1} margin='10px'>
                    <TextField
                        label="Student Signature"
                        className='wide'
                        type="text"
                        variant='outlined'
                        value={signature}
                        onChange={e => setSignature(e.target.value)}
                    />
                </Col>
                <Col size={1} margin='10px'>
                    <TextField
                        label="Date"
                        className='wide'
                        type="date"
                        variant='outlined'
                        value={agreementDate}
                        onChange={e => setAgreementDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                    </TextField>
                </Col>
            </Row>
        </div>
    )
}
