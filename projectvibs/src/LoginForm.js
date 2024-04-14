import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Validation from "./LoginValidation"

const LoginForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const HandleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (values) {
      // console.log(values);
      axios.post(`http://localhost:5000/login`,values)
        .then(res => {
          console.log(res.message);
          if(res.status === 200){
          // console.log("port is running");
          navigate("/usertable")
          }
          else if (res.status === 400) {
            alert(res.data.message);}
          else{
            alert("No record found")
          }
        })
        .catch(err => {
          console.log(err);
          if(err.response.status === 400){
            alert(err.response.data.message);}
          else{
            alert("No record found")
          }
        });
    }
  }
  return (
    <div className='d-flex justify-content-center align-items-center bg-info vh-100'>
      <div className='bg-white p-3 rounded w-25' >
        <h2>Sign In</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='mb3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input type="text" name="email" placeholder='Enter Your Email'
              onChange={HandleInput} className='form-control rounded-0' />
            {errors.email && <span className='text-danger'> {errors.email} </span>}
          </div>
          <div className='mb3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input type="password" name="password"
              onChange={HandleInput} placeholder='Enter Your Password' className='form-control rounded-0' />
            {errors.password && <span className='text-danger'> {errors.password} </span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'> Login</button>
          <p>You are agree to our terms and policy</p>
          <Link to="/registerform" className='btn btn-default border w-100 bg-light rounded-0 '>Create Account</Link>

        </form>
      </div>
    </div>
  )
}

export default LoginForm;