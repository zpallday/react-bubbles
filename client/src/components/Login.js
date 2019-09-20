import React, { useState } from "react";
import axios from 'axios';

const Login = (history) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

 const [credentials, setCredentials] = useState({ username: "" , password: ""});

const handleChange = e => {
  setCredentials({...credentials, [e.target.name]: e.target.value})

}

  const login = e => {
    e.preventDefault();
    axios
    .post('http://localhost:5000/api/login', credentials)
    .then(res => { 
      console.log(res)
      localStorage.setItem('token', res.data.payload);
      history.push('/bubbles');
    })
    .catch(error => console.log(error.response))
  }

  return (
    <div className='App'>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input 
        type='text'
        name="username"
        placeholder="your username"
        value={credentials.username}
        onChange={handleChange}
        />
        <input 
        type="password"
        name="password"
        placeholder="your password"
        value={credentials.password}
        onChange={handleChange}
        />
      <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
