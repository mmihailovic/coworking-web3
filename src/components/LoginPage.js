import React from 'react';
import logo from '../logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';


const LoginPage = ( {onClick} ) => {
  return (
    <header className="App-header">  
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Button variant="light" size="lg" onClick={onClick}>
                    Connect
            </Button>
        </div>
    </header> 
  )
}

export default LoginPage