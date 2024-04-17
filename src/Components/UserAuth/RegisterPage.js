import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from 'axios';
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from "react-icons/fa";
import InputGroup from 'react-bootstrap/InputGroup';

import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../Redux/Feature/AuthSlice";

const RegisterPage = () => {
    let navigate = useNavigate();

  const [togglePassword1, setTogglePassword1] = useState(false);
  const [togglePassword2, setTogglePassword2] = useState(false);
  const [userRegistration, setUserRegistration] = useState({
    user_first_name:"",
    user_last_name:"",
    user_email: "",
    user_moblie: "",
    password:"",
    password2: "",
  });
  
  const { user_first_name, user_last_name, user_email, user_moblie, password, password2} = userRegistration;

  const dispatch = useDispatch();
  const loading = useSelector((state)=> state.auth.loading)
  console.log("loading in register--", loading);
  console.log("get token in register:--", localStorage.getItem("user-token"));

  const onInputChange = (e) => {
    setUserRegistration({ ...userRegistration, [e.target.name]: e.target.value });
  };


  const togglePass1 = () => {
    setTogglePassword1(!togglePassword1);
  }

  const togglePass2 = () => {
    setTogglePassword2(!togglePassword2);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form Validation
    if(userRegistration.user_email.length === 0){
      alert("Please enter valid email");
      
    }else if(userRegistration.password.length === 0){
      alert("Please enter Password");
      
    }else if( userRegistration.password !== userRegistration.password2){
      alert("Please enter same password");
      
    }else if( userRegistration.user_first_name === ""){
      alert("Please Enter First Name");
      
    }else if( userRegistration.user_last_name === ""){
      alert("Please Enter Last Name");
      
    }else{

          console.log('Registration data Array:',userRegistration);
          dispatch(userRegister({user_first_name,user_last_name,user_email,user_moblie,password2}))
          navigate('/login');

            // Api Calling
            // axios({
            //   baseURL: 'http://127.0.0.1:8000/create-user',
            //   method: "POST",
            //   data: {
            //     first_name: user_first_name,
            //     last_name: user_last_name,
            //     email: user_email,
            //     mobile: user_moblie,
            //     password: password2,
                
            //   },
            // })
            //   .then((res) => {
            //     if (res.status === 201) {
            //       console.log("result.data:",res.data);
            //       alert("Registration Successful !!");
            //       navigate(-1);
            //     }
            //   })
            //   .catch((error) => {
            //     console.log("ERROR", error);
            //     alert("Error Orrured In Registration");
            //   });
    }

    
    
  }

  return (
    <div className="Register">
      <Container className="heading">
        <h2>Registration</h2>
      </Container>

      <Container className="form">
        <Form onSubmit={handleSubmit}>
          
          <Container>
          <Form.Group size="lg" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                name="user_first_name"
                value={user_first_name}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            <Form.Group size="lg" controlId="lastName">
              <Form.Label className="mt-3">Last Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                name="user_last_name"
                value={user_last_name}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            <Form.Group size="lg" controlId="email">
              <Form.Label className="mt-3">Email Address</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                name="user_email"
                value={user_email}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            <Form.Group size="lg" controlId="mobile">
              <Form.Label className="mt-3">Mobile Number</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                name="user_moblie"
                value={user_moblie}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>


            <Form.Group size="lg" controlId="password1">
              <Form.Label className="mt-3">Password</Form.Label>

              <InputGroup className="mb-3">

                {togglePassword1 ? 
                  <Form.Control
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => onInputChange(e)}
                />
                :
                <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
                }

              <InputGroup.Text id="basic-addon2"><FaEye onClick={togglePass1} style={{ fontSize: "20px", color:'black' }} /></InputGroup.Text>
              </InputGroup>

              
            </Form.Group>

            <Form.Group size="lg" controlId="password2">
              <Form.Label className="mt-3">Re-Enter Password</Form.Label>

              <InputGroup className="mb-3">

                {togglePassword2 ? 
                  <Form.Control
                  type="text"
                  name="password2"
                  value={password2}
                  onChange={(e) => onInputChange(e)}
                />
                :
                <Form.Control
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => onInputChange(e)}
              />
                }

              <InputGroup.Text id="basic-addon2"><FaEye onClick={togglePass2} style={{ fontSize: "20px", color:'black' }} /></InputGroup.Text>
              </InputGroup>
            </Form.Group>
            
            <div className="d-grid gap-1 mt-4">
            <Button style={{backgroundColor:"#E36414"}} 
                    size="lg"
                    type="submit"
                    className="mb-3">
                  Register
            </Button>
          </div>
          </Container>
        </Form>

        <ToastContainer />
      </Container>

    </div>
  )
}

export default RegisterPage