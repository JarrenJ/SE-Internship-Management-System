import React from "react";

import { SideNav } from 'components'

export function Dashboard() {

    const userRole = sessionStorage.getItem('role')

    return (
        <>
            <SideNav role={userRole} />
            <div className="dashboard__container">
                <div className="dashboard__Header"></div>
            </div>
        </>
    )
}
