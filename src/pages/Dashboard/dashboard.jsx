import React from "react";

import { SideNav } from 'components'

export function Dashboard({role}) {
    return (
        <>
            <SideNav role={role} />
            <div className="dashboard__container">
                <div className="dashboard__Header"></div>
                <p>Hello world!</p>
            </div>
        </>
    )
}
