import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from 'axios';
import "./ChangePassword.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from "react-icons/fa";
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from "react-router-dom";


const ChangePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [togglePassword1, setTogglePassword1] = useState(false);
  const [togglePassword2, setTogglePassword2] = useState(false);

  
  const togglePass1 = () => {
    setTogglePassword1(!togglePassword1);
  }

  const togglePass2 = () => {
    setTogglePassword2(!togglePassword2);
  }

  function validateForm() {
    return email.length > 0 && password1.length > 0;
  }
  

  function handleSubmit(event) {
    event.preventDefault();
    console.log('email:', email);
    console.log('password1:', password1);
    console.log('password2:', password2);

    
        axios({
            baseURL: 'http://127.0.0.1:8000/change-password/',
            method: "POST",
            data: {
              email: email,
              old_password: password1,
              new_password: password2,
            },
          })
            .then((res) => {
              if (res.status === 200) {
                alert("Password Change Successfully");
                navigate('/homeAfterLogin');
              }
            })
            .catch((error) => {
              console.log("ERROR", error);
              alert("Error!! Please provide valid data");
              // const showToastLoginErrorMessage = () => {
              //   toast.error("Error!! Please provide valid credentials", {
              //     position: toast.POSITION.TOP_RIGHT,
              //   });
              // };
      
              // showToastLoginErrorMessage();
            });
    
    
    
  }


  return (
    <div className="ChangePass">
        
      <Container className="heading">
        <h2>Change Password</h2>
      </Container>

      <Container className="form">
        <Form onSubmit={handleSubmit}>
          <Container>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

      
            <Form.Group size="lg" controlId="password1">
              <Form.Label className="mt-3">Old Password</Form.Label>

              <InputGroup className="mb-3">
           {togglePassword1 ? 
                  <Form.Control
                  type="text"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
                :
                <Form.Control
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)} 
                />
                }
              
              <InputGroup.Text id="basic-addon2"><FaEye onClick={togglePass1} style={{ fontSize: "20px", color:'black' }} /></InputGroup.Text>
              </InputGroup>
              
            </Form.Group>

            <Form.Group size="lg" controlId="password2">
              <Form.Label className="mt-3">New Password</Form.Label>

              <InputGroup className="mb-3">
           {togglePassword2 ? 
                  <Form.Control
                  type="text"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                :
                <Form.Control
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)} 
                />
                }
              
              <InputGroup.Text id="basic-addon2"><FaEye onClick={togglePass2} style={{ fontSize: "20px", color:'black' }} /></InputGroup.Text>
              </InputGroup>
              
            </Form.Group>
            
            <div className="d-grid gap-1 mt-4">
            <Button style={{backgroundColor:"#FB8B24"}} 
                    size="lg"
                    type="submit"
                    disabled={!validateForm()}
                    className="mb-3">
                  Submit
            </Button>
          </div>

          </Container>

        </Form>
      </Container>
        <ToastContainer />
    </div>
  )
}

export default ChangePassword