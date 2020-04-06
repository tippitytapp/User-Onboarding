import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import SignUpForm from "./components/Form";
import './App.css';




function App() {



  return (
    <div className="App">
      <img src="./images/yuplarge.JPG" alt="the word 'Yup' written in cursive" />
      <h1>For Milk and Yup</h1>
<SignUpForm />
    </div>
  );
}

export default App;
