import React from 'react';
import Home from './components/Home';
import Signin from './components/Signin';
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/Home" exact element = { <Home/> } />
        <Route path="/register" exact element = { <Register/> } />
        <Route path="/signin" exact element = { <Signin/> } />
        <Route/>
      </Routes>
    </>
  );
}

export default App;
