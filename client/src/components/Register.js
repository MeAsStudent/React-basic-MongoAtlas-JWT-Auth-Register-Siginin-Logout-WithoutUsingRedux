import React from 'react';
import { useState } from 'react';

function Register() {

  const [user, setUser] = useState({
    name : "",
    email : "",
    password : "",
    cpassword : ""
  });

  let name, value;
  const funHandelInput = (e) =>{
      name = e.target.name;
      value = e.target.value;
      setUser({ ...user, [name]:value });
  }

  const funhandleSubmit = async (e) => {
    e.preventDefault(); 
    const { name, email, password, cpassword } = user;

    const res = await fetch("/register" , {
      method : 'POST',
      headers : {
        "Accept" : "application/json",        
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        name, email, password, cpassword
      })
    })

    const data = await res.json();
    console.log(data);

    if(res.status === 201){
      window.alert("registered successfully");
      setUser({ ...user, name : "", email : "", password : "", cpassword : "" });
      console.log("success");        
    }else if(data.error === 'password mismatched'){
      window.alert("confirm password mismatched");
      console.log("confirm password mismatched");
    }
    else if(data.error === 'Email already exist'){
      window.alert("Email already exist");
      console.log("Email already exist");
    }
    else {
      window.alert("Not added successfully");
      console.log("plz fill out the field");
    }
  };

    return (
      <>
      <br/>
      <br/>
      <br/>
      <h1>register side</h1>
      <form method = "POST" > 
        <input type='text' name="name" placeholder='name' value={user.name} onChange={funHandelInput} ></input><br/>
        <input type='email' name="email" placeholder='email' value={user.email} onChange={funHandelInput} ></input><br/>
        <input type='password' name="password" placeholder='password' value={user.password} onChange={funHandelInput} ></input><br/>
        <input type='password' name="cpassword" placeholder='confirm-password' value={user.cpassword} onChange={funHandelInput} ></input><br/>
        <br/>
        <button type="submit" className="btn btn-primary" onClick={funhandleSubmit} >Submit</button>
      </form>
      </>
    );
  }
  
  export default Register;
  