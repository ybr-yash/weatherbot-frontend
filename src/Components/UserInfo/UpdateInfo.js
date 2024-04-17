import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from 'axios';
import "./UpdateInfo.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import InputGroup from 'react-bootstrap/InputGroup';




const UpdateInfo = () => {

  let navigate = useNavigate();

  const [currentUserData, setCurrentUserData] = useState([]);

  const [updateUserInformation, setUpdateUserInformation] = useState({});
  

  let token = localStorage.getItem("user-token");
    console.log("Token in Start Chat--", token);

    useEffect(() => {
      
      axios({
        baseURL: `http://127.0.0.1:8000/get-user-profile/${token}`,
        method: "GET",
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("Get Current User res.data:",res.data);
            setCurrentUserData(res.data);
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
          alert("Error in Get Current User Data");
          
        });

    },[]);
    console.log(" Current User Data in Update Information--", currentUserData.id);


    useEffect(() => {
      if(currentUserData.id){

        axios({
            baseURL: `http://127.0.0.1:8000/get-user/${currentUserData.id}`,
            method: "GET",
          })
            .then((res) => {
              if (res.status === 200) {
                console.log("Get User by ID res.data:",res.data);
                setUpdateUserInformation(res.data);
              }
            })
            .catch((error) => {
              console.log("ERROR", error);
              alert("Error in Get User Data by Id");
              
            });

      }
  
      },[currentUserData.id]);
      console.log("Get User Data  by ID in Update Information--", updateUserInformation);

  const onInputChange = (e) => {
    setUpdateUserInformation({ ...updateUserInformation, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form Validation
    if(updateUserInformation.user_email === ""){
      alert("Please enter valid email");
      
    }else if( updateUserInformation.user_first_name === ""){
      alert("Please Enter First Name");
      
    }else if( updateUserInformation.user_last_name === ""){
      alert("Please Enter Last Name"); 
    }else if( updateUserInformation.user_moblie === ""){
        alert("Please Enter Mobile Number");  
    }else{

          console.log('Registration data Array:',updateUserInformation);

            // Api Calling
            axios({
              baseURL: `http://127.0.0.1:8000/edit-user/${currentUserData.id}`,
              method: "PUT",
              data: updateUserInformation,
            })
              .then((res) => {
                if (res.status === 200) {
                  console.log("Update User result.data:",res.data);
                  alert("Update Successful !!");
                  navigate("/homeAfterLogin");
                }
              })
              .catch((error) => {
                console.log("ERROR", error);
                alert("Error Orrured In User Update");
              });
    }
}
  return (
    <div className="Update">
      <Container className="heading">
        <h2>Update Information</h2>
      </Container>

      <Container className="form">
        <Form onSubmit={handleSubmit}>
          
          <Container>
          <Form.Group size="lg" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                name="first_name"
                value={updateUserInformation.first_name}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            <Form.Group size="lg" controlId="lastName">
              <Form.Label className="mt-3">Last Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                name="last_name"
                value={updateUserInformation.last_name}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            <Form.Group size="lg" controlId="email">
              <Form.Label className="mt-3">Email Address</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                name="email"
                value={updateUserInformation.email}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            <Form.Group size="lg" controlId="mobile">
              <Form.Label className="mt-3">Mobile Number</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                name="mobile"
                value={updateUserInformation.mobile}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            
            <div className="d-grid gap-1 mt-4">
            <Button style={{backgroundColor:"#E36414"}} 
                    size="lg"
                    type="submit"
                    className="mb-3">
                  Update
            </Button>
          </div>
          </Container>
        </Form>

        <ToastContainer />
      </Container>

    </div>
  )
}

export default UpdateInfo