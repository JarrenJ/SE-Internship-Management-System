import React from "react";
import "./dashboard.css"
import "../../colors.css"

export function Dashboard() {
    return (
        <div className="dashboard__container">
            <div className="dashboard__Header"></div>
            <p>Hello world!</p>
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
