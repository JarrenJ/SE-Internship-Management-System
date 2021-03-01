import React from "react";

import { SideNav } from 'components'


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
            <SideNav />
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
