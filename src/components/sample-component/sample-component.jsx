import React from 'react';

function getUsers() {
    fetch(`/api/accounts`)
        .then((response) => response.json())
        .then(users => console.log(users));
}

export function SampleComponent() {
    // let role = JSON.parse(localStorage.getItem('token'));
    // console.log('admin, pls')
    // console.log(role)
    console.log(localStorage)
    console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('role'))

    return (
        <div>
            This is a sample component
            {getUsers()}
        </div>
    );
}
