import React from "react";

import { SideNav } from 'components'

import './dashboard.css'

export function Dashboard({role}) {
    return (
        <>
            <SideNav role={role} />
            <div className="dashboard__container">
            </div>
        </>
    )
}
