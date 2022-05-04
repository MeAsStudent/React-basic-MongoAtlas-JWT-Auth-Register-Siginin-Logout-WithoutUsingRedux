import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Signin() {

  const navigate = useNavigate();

  const [userin, setUserin] = useState({
    email : "",
    password : ""
  });

  let name, value;
  const funHandelInput = (e) =>{
      name = e.target.name;
      value = e.target.value;
      setUserin({ ...userin, [name]:value });
  }

  const funhandlesignin = async (e) => {
    e.preventDefault(); 
    const { email, password } = userin;

    const res = await fetch("/signin" , {
      method : 'POST',
      headers : {
        "Accept" : "application/json",        
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        email, password
      })
    })
    
    const data = await res.json();
    console.log(data);

    if(data.message === "login successfully"){
      localStorage.setItem("token",data.token)
      console.log('login successfully');
      const val = localStorage.getItem('token');
      console.log(val);
      navigate('/Home');
    }else {
      console.log('Invalid cred');
    }
  };

    return (
      <>
      <br/>
      <br/>
      <br/>
      <h1>signin side</h1>
      <form method = "POST" > 
        <input type='email' name="email" placeholder='email' value={userin.email} onChange={funHandelInput} ></input><br/>
        <input type='password' name="password" placeholder='password' value={userin.password} onChange={funHandelInput} ></input><br/>
       <br/>
        <button type="submit" className="btn btn-primary" onClick={funhandlesignin} >Signin</button>
      </form>
      </>
    );
  }
  
  export default Signin;
  
