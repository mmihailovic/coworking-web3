import React, { useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { loginUser } from '../service/magic';
import sideNavBar from '../assets/sidebarNav.svg';
import '../style/authenticate.css';
import Popup from './Popup';
const Authenticate = ({logged}) => {

  const [email, setEmail] = useState('');
  const [showPopup,setShowPopup] = useState(false);
  const history = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setShowPopup(false);
      return;
    }
    try {
      setShowPopup(true);
      await loginUser(email);
      if(logged)history('/main');
      else history('/login');
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <div>
        <div>
        <img src={sideNavBar}></img>
        </div>
        <div className='loginDiv'>
            <p className='big'>Welcome back!</p>
            <p className='small'>Authenticate with your email to use the app.</p>
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="formBasicEmail">
          <p className='emailLabel'>Email Address</p>
          <FormControl
            type="email"
            name="email"
            // id="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className='emailInput'
          />
        </FormGroup>
        <button type="submit" className='signButton'>Sign in</button>
        <Popup trigger={showPopup} emailToShow={email} func={setShowPopup}></Popup>
      </Form>
    </div>
    </div>
  );
};
export default Authenticate;