import React from 'react';
import ReactDOM from 'react-dom';
import { MDBBtn } from 'mdb-react-ui-kit';


import '../css/linqs.css'

function App() {
    const handleClick = () => {
        console.log('clicked!')
    }
    return (
        <>
            <h2>Hello React!</h2>
            <MDBBtn rounded size='sm' onClick={handleClick} color='light'>Button</MDBBtn>
        </>
    )
}


// component mounts in linqs.html
ReactDOM.render(
  <App />,
  document.getElementById('linqs-root')
);