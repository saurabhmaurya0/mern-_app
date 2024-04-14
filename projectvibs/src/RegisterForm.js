import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Validation from './RegisterValidation'
import axios from 'axios'

const RegisterForm = () => {
  const [values, setValues] = useState({
    name:'',
    date:'',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const [errors,setErrors] =useState({});
  const HandleInput = (event) => {
    setValues(prev=>({...prev, [event.target.name]: event.target.value}))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if(values){
        axios.post('http://localhost:5000/register', values)
        .then(res=>{
          navigate("/")
        }
        )
        .catch(err=>console.log(err));
    }
  }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className='bg-white p-3 rounded w-25'>
      <h2>Register</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className='mb3'>
          <label htmlFor='name'><strong>Name</strong></label>
          <input type="text" name="name"  placeholder='Enter Your Name' 
          onChange={HandleInput} className='form-control rounded-0'/>
          {errors.name && <span className='text-danger'> {errors.name} </span> }
        </div>
        <div className='mb3'>
          <label htmlFor='date'><strong>Date</strong></label>
          <input type="date" name="date"  placeholder='Enter Your Date' 
          onChange={HandleInput} className='form-control rounded-0' />
          {errors.date && <span className='text-danger'> {errors.date} </span> }
        </div>
        <div className='mb3'>
          <label htmlFor='email'><strong>Email</strong></label>
          <input type="email" name="email"  placeholder='Enter Your Email' 
          onChange={HandleInput} className='form-control rounded-0' />
          {errors.email && <span className='text-danger'> {errors.email} </span> }
        </div>
        <div className='mb3'>
          <label htmlFor='password'><strong>Password</strong></label>
          <input type="password" name="password"  placeholder='Enter Your Password' 
          onChange={HandleInput} className='form-control rounded-0' />
          {errors.password && <span className='text-danger'> {errors.password} </span> }
        </div>
        <button type='submit' className='btn btn-success w-100 rounded-0'> Register </button>
        <p>You are agree to our terms and policy</p>
        <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 '>Login</Link>

        </form>
    </div>
  </div>
  )
}

export default RegisterForm