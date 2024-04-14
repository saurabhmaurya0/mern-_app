// UserTable.js
import React from 'react';
import { Table } from 'react-bootstrap';

function UserTable() {
  // Retrieve user information from local storage
  const storedUser = localStorage.getItem('user');
  console.log(storedUser);
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div>
      <h2>User Table</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {user ? (
            <tr>
              <td>{user.name}</td>
              <td>{user.dob}</td>
              <td>{user.email}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="3">No user data available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default UserTable;
