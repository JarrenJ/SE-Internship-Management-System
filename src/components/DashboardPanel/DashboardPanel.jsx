import React, {useState} from "react";
import {account, airplane, Hourglass, Manlogo, NWDoubleStackedGreen} from "assets";
import {ApplicationForm} from "components";

import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from "styled-components";

import './DashboardPanel.css'
import '../../colors.css'
import {InputLabel, TextField} from "@material-ui/core";
import { ApplicationTable } from "components/ApplicationTable/applicationTable";


const Container = styled.div`
  display: flex;
`

export const Row = styled.div`
  display: flex;
  width: ${(props) => props.width ? props.width : '100%'};
  height: auto;
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  max-width: ${(props) => props.maxWidth};
  flex-direction: ${(props) => props.direction ? props.direction : 'row'} ;
  @media (max-width: ${(props) => props.breakpoint}) {
    flex-direction: column;
    margin: ${(props) => props.breakpointMargin ? props.breakpointMargin : 0};
  }
  margin: ${(props) => props.margin};
  //border: 5px solid red;
`

export const Col = styled.div`
  flex: ${(props) => props.size};
  background-color: ${(props => props.bgColor)};
  min-width: ${(props => props.minWidth)};
  max-width: ${(props => props.maxWidth)};
  min-height: ${(props) => props.minHeight};
  height: 100%;
  max-height: ${(props) => props.maxHeight};
  @media (max-width: ${(props) => props.breakpoint}) {
    margin: ${(props) => props.breakpointMargin ? props.breakpointMargin : 0};
  }
  margin: ${(props) => props.margin};
  //border: 5px solid black;
`

const StyledPanel = styled.div`
  display: flex;
  height: 100%;
  background-color: white;
  width: 80%;
  border-radius: 10px;
  margin: 0 25px;
  padding: .5rem;
  color: ${(props) => props.color};
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-left: 5px solid;
  

  .man-icon{
    height: 75px;
  }
  
  .large-icon{
    height: 50px;
    padding-top: 1rem;
  }
  
  .title {
    font-size: 1.2rem;
    margin-top: 0;
  }
  .info {
    font-size: 1.1rem;
    margin: 0 auto;
  }

  @media (max-width: 1205px) {
    .title {
      font-size: 1.1rem;
    }
    
    .info {
      font-size: .9rem;
    }
  }

  @media (max-width: 1024px) {
    max-width: 250px;
  }
`

const Panel = ({ color, title, info, image, imgClass }) => {
    return(
        <StyledPanel color={color}>
            <Row direction='column'>
                <Col size={1}>
                    <p className='title'>{title}</p>
                </Col>
                <Col size={1}>
                    <p className='info'>{info}</p>
                </Col>
            </Row>
            <img className={imgClass} src={image} alt='Icon for dashboard panels' />
        </StyledPanel>
    )
}

export function DashboardPanel({ isOpen, role, isAppFormVisible, isApplicationTableVisible, username, users, applications,
                                   internships, tableError, totalInterns, pendingApprovals,
                                   activeInterns, outOfStateInterns }) {

    const [open, setOpen] = React.useState(false);
    const initial_Comment = "";
                                
    const DefaultStudentView = () => {
        return(
            <>
                <Container>
                    <Row>
                        <Col size={1}>
                            <div className='dashboard__student__default__title'>
                                <p>Welcome!</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col size={1}>
                            <div className='dashboard__student__default__image'>
                                <img src={NWDoubleStackedGreen} alt='Northwest Stacked Logo Green'/>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col size={1}>
                            <div className='dashboard__student__default__title'>
                                <p>Apply or Track your Internship Application</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }

    const StudentView = () => {
        return(
            <>
                    <Row>
                        <Col size={1} bgColor='transparent' margin='0 20px' /*maxWidth='1200px' */>
                            <ApplicationTable
                                role={role}
                                isApplicationTableVisible={isApplicationTableVisible}
                                username={username}
                                users={users}
                                applications={applications}
                                internships={internships}
                                tableError={tableError}
                            />
                        </Col>
                    </Row>
            </>
        )
    }

    return (
        <>
            <div className="dashboard__container" style={{left: isOpen ? '20%' : '3.5%', width: isOpen ? `calc(100% - 20%)` : `calc(100% - 3.5%)`}}>
                <Row maxHeight='65px'>
                    <Col size={1} maxHeight='65px'>
                        <div className="dashboard__Header">
                            <img className='dashboard__profile__pic' src={ account } alt='account.png'/>
                            <div className="Header_Namebox">
                                <p>{username}</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                {role === "Admin" &&
                    <>
                        <Row>
                            <Col>
                                <p className='dashboard__title'>Dashboard</p>
                            </Col>
                        </Row>
                        <Row breakpoint='1024px'>
                            <Col size={1} breakpoint='1024px' breakpointMargin='25px 0'>
                                <Panel color='blue' info={totalInterns} title='Total Interns' image={Manlogo} imgClass='man-icon' />
                            </Col>
                            <Col size={1} breakpoint='1024px' breakpointMargin='25px 0'>
                                <Panel color='green' info={activeInterns} title='Active Internships' image={Manlogo} imgClass='man-icon' />
                            </Col>
                            <Col size={1} breakpoint='1024px' breakpointMargin='25px 0'>
                                <Panel color='rgb(55, 165, 238)' info={pendingApprovals} title='Pending Approvals' image={Hourglass} imgClass='large-icon' />
                            </Col>
                            <Col size={1} breakpoint='1024px' breakpointMargin='25px 0'>
                                <Panel color='red' info={outOfStateInterns} title='Out of State' image={airplane} imgClass='large-icon'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col size={1}>
                                <div className='dashboard__Map_header'>
                                    <p>Interns Map</p>
                                </div>
                                <div className='dashboard__Map' />
                            </Col>
                        </Row>
                    </>
                }
                {isAppFormVisible && <ApplicationForm /> }
                {
                    role === "Student"
                    &&
                    <>
                        {<DefaultStudentView />}
                        {<StudentView />}
                    </>
                }
            </div>
        </>
    )}
