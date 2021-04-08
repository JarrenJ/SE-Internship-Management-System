import React from "react";
import { account, airplane, Hourglass, Manlogo } from "assets";

import './DashboardPanel.css'
import '../../colors.css'
import {ApplicationForm1} from "components";

export function DashboardPanel({ isOpen }) {

    return (
        <>
            <div className="dashboard__container" style={{left: isOpen ? '20%' : '3.5%', width: isOpen ? `calc(100% - 20%)` : `calc(100% - 3.5%)`}}>
                <div className="dashboard__row">
                    <div className="dashboard__column__no__margin">
                        <div className="dashboard__Header">
                            <div className='dashboard__row'>
                                <div className='dashboard__column'>
                                    <img src={ account } alt='account.png'/>
                                    <div className="Header_Namebox">
                                        <p>Cindy Tu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p>Dashboard</p>
                <div className='dashboard__row'>
                    <div className='dashboard__column__4'>
                        <div className="dashboard__Button1">
                            <p>Total Interns</p><img src={ Manlogo } alt='Manlogo.png'/><p>4</p>
                        </div>
                    </div>
                    <div className='dashboard__column__4'>
                        <div className="dashboard__Button2">
                            <p>Active Interns</p><img src={ Manlogo } alt='Manlogo.png'/><p>2</p>
                        </div>
                    </div>
                    <div className='dashboard__column__4'>
                        <div className="dashboard__Button3">
                            <p>Pending Approvals</p><img src={ Hourglass } alt='Hourglass.png'/><p>1</p>
                        </div>
                    </div>
                    <div className='dashboard__column__4'>
                        <div className="dashboard__Button4">
                            <p>Out of State</p><img src ={ airplane } alt='airplace.png'/><p>3</p>
                        </div>
                    </div>
                </div>
                <div className='dashboard__row'>
                    <div className='dashboard__column'>
                        <div className='dashboard__Map_header'>
                            <p>Interns Map</p>
                        </div>
                        <div className='dashboard__Map' />
                    </div>
                </div>
                <ApplicationForm1 />
            </div>
        </>
    )}
