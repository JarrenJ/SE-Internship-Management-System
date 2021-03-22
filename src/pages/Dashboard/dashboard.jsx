import React from "react";
import "./dashboard.css"
import "../../colors.css"
import { Manlogo } from 'assets'
import { Hourglass } from 'assets'
import { airplane } from 'assets'
import { account } from 'assets'
import { map } from 'assets'

export function Dashboard() {
    return (
        <div className="dashboard__container">
            <div className="dashboard__Header">
            <img src={ account } alt='account.png'/>
                <div className="Header_Namebox">
                    <p>Cindy Tu</p>
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
            <div className='dashboard__Map_header'>
                <p>Interns Map</p>
            </div>
            <div className='dashboard__Map'>
                <img src={ map } alt='map.png'/>
            </div>
        </div>

    )
}
export function StudentView() {

    return (
        <div>
            THIS IS THE STUDENT PAGE
        </div>
    );
}

export function AdminView() {

    return (
        <div>
            THIS IS THE ADMIN PAGE
        </div>
    );
}

// export function Dashboard() {
//
//     const userRole = sessionStorage.getItem('role')
//     return (
//         <>
//             <SideNav role={userRole} />
//             <div className="dashboard__container">
//                 <div className="dashboard__Header"></div>
//             </div>
//         </>
//     )
// }
