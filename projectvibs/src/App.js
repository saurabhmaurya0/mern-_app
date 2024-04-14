import React from 'react';
// import BrowserRouter from './BrowserRouter'
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import UserTable from "./UserTable"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />}></Route>
        <Route path='/registerform' element={<RegisterForm />}></Route>
        <Route path='/usertable' element={<UserTable />}></Route>
      
      </Routes>

    </BrowserRouter>
  )
}

export default App