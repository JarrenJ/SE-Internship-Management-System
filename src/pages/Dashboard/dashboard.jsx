import React from "react";

import { SideNav } from 'components'


export function StudentView() {

    return (
        <div>
            <SideNav isStudent />
            THIS IS THE STUDENT PAGE
        </div>
    );
}

export function AdminView() {

    return (
        <div>
            <SideNav isAdmin />
            THIS IS THE ADMIN PAGE
        </div>
    );
}

export function FacultyView() {

    return (
        <div>
            <SideNav isFaculty />
            THIS IS THE FACULTY PAGE
        </div>
    );
}
