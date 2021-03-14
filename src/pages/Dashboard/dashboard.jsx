import React from "react";

import {ApplicationForm1, SideNav} from 'components'

import './dashboard.css'

export function Dashboard({role}) {
    return (
        <>
            <SideNav role={role} />
            <div className="dashboard__container">
                {/*<div className="dashboard__Header"></div>*/}
                {/*<p>Hello world!</p>*/}
                <ApplicationForm1 />
            </div>
        </>
    )
}
