import React from "react";
import "./dashboard.css"
import "../../colors.css"

export function Dashboard() {
    return (
        <div className="dashboard__container">
            <div className="dashboard__Header"> <div className="Header_Namebox"> <p>Name</p></div> </div>
            <p>Dashboard</p>
            <div className="Button_box" >
            <div className="dashboard__Button1">
            <p>Total Interns</p> </div>
            <div className="dashboard__Button2"> 
            <p>Active Interns</p> </div>
            <div className="dashboard__Button3"> 
            <p>Pending Approvals</p> </div>
            <div className="dashboard__Button4"> 
            <p>Out of State</p> </div></div>
            
            
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

export function FacultyView() {

    return (
        <div>
            THIS IS THE FACULTY PAGE
        </div>
    );
}
