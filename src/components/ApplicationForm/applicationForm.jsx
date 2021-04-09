import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
// import { Grid, Row, Col } from '../../pages/Home/home'

import styled from "styled-components";

import './applicationForm.css';

// const ApplicationForm = () => {
//
//     const initialValues = {
//         studentId: "",
//         studentFirstName: "",
//         studentLastName: "",
//         studentEmail: "",
//         studentPhoneNum: "",
//         instructorFirstName: "",
//         instructorLastName: "",
//         instructorEmail: "",
//         employerName: "",
//         primaryContactName: "",
//         employerEmail: "",
//         employerPhone: "",
//         comments: "",
//     };
//
//     const initialStuAddr = {
//         line1: "",
//         line2: "",
//         city: "",
//         state: "",
//         zip: "",
//     }
//
//     const initialEmpAddr = {
//         line1: "",
//         line2: "",
//         city: "",
//         state: "",
//         zip: "",
//     }
//
//     function submitClick() {
//         alert("Form Submit")
//         console.log(values)
//         console.log(stuAddress)
//         console.log(empAddress)
//         console.log(startDate)
//         console.log(endDate)
//     }
//
//     const [currentStep, setCurrentStep] = useState(1)
//     const [startDate, setStartDate] = useState("2021-05-13")
//     const [endDate, setEndDate] = useState("2021-05-14")
//     const [values, setValues] = useState(initialValues) //will store majority of the text box inputs
//     const [comments, setComments] = useState('')
//     const [stuAddress, setStuAddress] = useState(initialStuAddr);
//     const [empAddress, setEmpAddress] = useState(initialEmpAddr);
//
//     const handleInputChange = (e) => {
//         const {name, value} = e.target;
//         setValues({
//             ...values,
//             [name]: value,
//         })
//     }
//     const handleAddressChangeS = (e) => {
//         const {name, value} = e.target;
//         setStuAddress({
//             ...stuAddress,
//             [name]: value,
//         })
//     }
//
//     const handleAddressChangeE = (e) => {
//         const {name, value} = e.target;
//         setEmpAddress({
//             ...empAddress,
//             [name]: value,
//         })
//     }
//
//     const next = () => {
//         setCurrentStep(currentStep >= 2 ? 3 : currentStep + 1)
//     }
//
//     const previous = () => {
//         setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1)
//     }
//
//     const nextButton = () => {
//         if (currentStep < 3) {
//             return (
//                 <Button
//                     className='app__btn__next'
//                     variant='outlined'
//                     onClick={next}
//                 >
//                     Next
//                 </Button>
//             )
//         }
//         return null
//     }
//
//     const previousButton = () => {
//         if (currentStep !== 1) {
//             return (
//                 <Button
//                     className='app__btn__prev'
//                     variant='outlined'
//                     onClick={previous}
//                 >
//                     Previous
//                 </Button>
//             )
//         }
//         return null
//     }
//
//     return (
//         <div className='app__form__container__component'>
//             <form className='app__form__component'>
//                 <StudentInfo
//                     currentStep={currentStep}
//                     values={values}
//                     stuAddress={stuAddress}
//                     comments={comments}
//                     setComments={setComments}
//                     handleInputChange={handleInputChange}
//                     handleAddressChangeS={handleAddressChangeS}
//                 />
//                 <InstructorInfo
//                     currentStep={currentStep}
//                     values={values}
//                     handleInputChange={handleInputChange}
//                 />
//                 <EmployerInfo
//                     currentStep={currentStep}
//                     values={values}
//                     empAddress={empAddress}
//                     startDate={startDate}
//                     endDate={endDate}
//                     setStartDate={setStartDate}
//                     setEndDate={setEndDate}
//                     submitClick={submitClick}
//                     handleInputChange={handleInputChange}
//                     handleAddressChangeE={handleAddressChangeE}
//                 />
//                 <div className='app__btns__container'>
//                     <div className='app__btn__prev'>
//                         {previousButton()}
//                     </div>
//                     <div className='app__btn__next'>
//                         {nextButton()}
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }

const Form = styled.form`
  width: 100%;
  max-width: 80%;
  //min-height: 740px;
  background-color: #ffffff;
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

const Row = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: ${(props) => props.minHeight};
  max-width: ${(props) => props.maxWidth};
  @media (max-width: 970px) {
    flex-direction: column;
  }
  margin: ${(props) => props.margin};
  //border: 5px solid red;
`

const Col = styled.div`
  flex: ${(props) => props.size};
  background-color: ${(props => props.bgColor)};
  min-width: ${(props => props.minWidth)};
  max-width: ${(props => props.maxWidth)};
  min-height: ${(props) => props.minHeight};
  height: 100%;

  @media (max-width: 768px) {
    min-width: 100%;
    margin: 10px auto;
  }
  //margin: 0 25px;
  margin: ${(props) => props.margin};
  //border: 5px solid black;
`

export const ApplicationForm = () => {

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

    const submitDate = new Date(),
        date = submitDate.getFullYear() + '-' + (submitDate.getMonth() + 1) + '-' + submitDate.getDate();

    const onSubmit = () => {
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
                    "submitDate": date
                }
            ),
        }).then(r => r)
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
        setCurrentStep(currentStep >= 2 ? 3 : currentStep + 1)
    }

    const previous = () => {
        setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1)
    }

    const nextButton = () => {
        if (currentStep < 3) {
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
                <Row minHeight={'700px'}>
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
                            submitClick={submitClick}
                            handleInputChange={handleInputChange}
                            handleAddressChangeE={handleAddressChangeE}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col size={1} maxWidth={'100%'} margin={'0 30px'}>
                        <div className='app__btns__container'>
                            <div className='app__btn__prev'>
                                {previousButton()}
                            </div>
                            <div className='app__btn__next'>
                                {nextButton()}
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
            <h2>Student Information:</h2>
            <Row>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='wide'
                        label='Student ID'
                        variant={'outlined'}
                        value={values.studentId}
                        onChange={handleInputChange}
                        name={"studentId"}
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='First Name'
                        variant={"outlined"}
                        value={values.studentFirstName}
                        onChange={handleInputChange}
                        name={"studentFirstName"}
                    />
                </Col>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='Last Name'
                        variant={'outlined'}
                        value={values.studentLastName}
                        onChange={handleInputChange}
                        name={'studentLastName'}
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='Personal Email'
                        variant={'outlined'}
                        value={values.studentEmail}
                        onChange={handleInputChange}
                        name={"studentEmail"}
                    />
                </Col>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='Phone Number'
                        variant={'outlined'}
                        value={values.studentPhoneNum}
                        onChange={handleInputChange}
                        name={"studentPhoneNum"}
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin={'10px'}>
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
                <Col size={1} margin={'10px'}>
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
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='City'
                        variant={'outlined'}
                        value={stuAddress.city}
                        onChange={handleAddressChangeS}
                        name={"city"}
                    />
                </Col>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='State'
                        variant={'outlined'}
                        value={stuAddress.state}
                        onChange={handleAddressChangeS}
                        name={"state"}
                    />
                </Col>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='app__input__component'
                        id="normal"
                        label='ZIP'
                        variant={'outlined'}
                        value={stuAddress.zip}
                        onChange={handleAddressChangeS}
                        name={"zip"}
                    />
                </Col>
            </Row>
            <Row>
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
            </Row>
        </div>
    )
}

const InstructorInfo = ({ currentStep, values, handleInputChange }) => {
    if (currentStep !== 2) {
        return null
    }
    return(
        <div className='instructor__details'>
            <h2>Instructor Details:</h2>
            <Row>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='wide'
                        id="normal"
                        label='Instructor First Name'
                        variant={"outlined"}
                        value={values.instructorFirstName}
                        onChange={handleInputChange}
                        name={'instructorFirstName'}
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='wide'
                        id="normal"
                        label='Instructor Last Name'
                        variant={'outlined'}
                        value={values.instructorLastName}
                        onChange={handleInputChange}
                        name={"instructorLastName"}
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='wide'
                        id="normal"
                        label='Instructor Mail'
                        variant={'outlined'}
                        value={values.instructorEmail}
                        onChange={handleInputChange}
                        name={"instructorEmail"}
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
    return(
        <>
        <div className='employer__details'>
            <h2>Employer Information:</h2>
            <Row>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='wide'
                        id="normal"
                        label='Employer Name'
                        variant={'outlined'}
                        value={values.employerName}
                        onChange={handleInputChange}
                        name={"employerName"}
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='wide'
                        id="normal"
                        label='Primary Contact Name'
                        variant={"outlined"}
                        value={values.primaryContactName}
                        onChange={handleInputChange}
                        name={"primaryContactName"}
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='wide'
                        id="normal"
                        label='Employer Email'
                        variant={'outlined'}
                        value={values.employerEmail}
                        onChange={handleInputChange}
                        name={"employerEmail"}
                    />
                </Col>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='wide'
                        id="normal"
                        label='Employer Phone'
                        variant={'outlined'}
                        value={values.employerPhone}
                        onChange={handleInputChange}
                        name={"employerPhone"}
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='wide'
                        id="normal"
                        label='Address Line 1'
                        variant='outlined'
                        value={empAddress.line1}
                        onChange={handleAddressChangeE}
                        name={"line1"}
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='wide'
                        id="normal"
                        label='Address Line 2'
                        variant='outlined'
                        value={empAddress.line2}
                        onChange={handleAddressChangeE}
                        name={"line2"}
                    />
                </Col>
            </Row>
            <Row>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='wide'
                        id="normal"
                        label='City'
                        variant='outlined'
                        value={empAddress.city}
                        onChange={handleAddressChangeE}
                        name={"city"}
                    />
                </Col>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='wide'
                        id="normal"
                        label='State'
                        variant='outlined'
                        value={empAddress.state}
                        onChange={handleAddressChangeE}
                        name={"state"}
                    />
                </Col>
                <Col size={1} margin={'10px'}>
                    <TextField
                        className='wide'
                        id="normal"
                        label='ZIP'
                        variant='outlined'
                        value={empAddress.zip}
                        onChange={handleAddressChangeE}
                        name={"zip"}
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
                <Col size={1} margin={'10px'}>
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
