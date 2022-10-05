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

const Authenticate = ({logged}) => {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState(null);
  const history = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!email) {
      setLoading(false);
      setError('Email is Invalid');
      return;
    }
    try {
      await loginUser(email);
      setLoading(false);
      if(logged)history('/main');
      else history('/login');
      window.location.reload(false);
    } catch (error) {
      setError('Unable to log in');
      console.error(error);
    }
  };
  const handleChange = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div className="w-50 p-5 mt-5 mx-auto">
      <h1 className="h1 text-center">React Magic Form</h1>
      <Form onSubmit={handleSubmit} className="p-2 my-5 mx-auto">
        <FormGroup className="mt-3" controlId="formBasicEmail">
          <FormLabel fontSize="sm">Enter Email Address</FormLabel>
          <FormControl
            type="email"
            name="email"
            // id="email"
            value={email}
            onChange={handleChange}
            placeholder="Email Address"
          />
          <p className="text-danger text-small">{error}</p>
        </FormGroup>
        <Button
          type="submit"
          size="md"
          className="d-block w-100"
          variant="primary"
        >
          {loading ? 'Loading...' : 'Send'}
        </Button>
      </Form>
    </div>
  );
};
export default Authenticate;