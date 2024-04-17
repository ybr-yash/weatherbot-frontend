import React, { useEffect, useState } from "react";


import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'



import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from 'axios';
import "./UpdateToAdmin.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from "react-icons/fa";
import InputGroup from 'react-bootstrap/InputGroup';


const UpdateToAdmin = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log("id in UpdateToAdmin", id);

    const [userType, setUserType] = useState();
    const [getUserDataByID, setGetUserDataByID] = useState();
    console.log("userType---", userType);
    

    const onInputChange = (e) => {
        setGetUserDataByID({ ...getUserDataByID, [e.target.name]: e.target.value});
      };

    useEffect(()=>{

        axios({
            baseURL: `http://127.0.0.1:8000/get-user/${id}`,
            method: "GET",
          })
            .then((res) => {
              if (res.status === 200) {
                console.log("Get User data by ID:",res.data);
                setGetUserDataByID(res.data)
              }
            })
            .catch((error) => {
              console.log("ERROR", error);
              alert("Error in Get User data by ID");
            });

    },[]);

    console.log("getUserDataByID in Update user type--", getUserDataByID);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Api Calling
        axios({
            baseURL: `http://127.0.0.1:8000/edit-user/${id}`,
            method: "PUT",
            data: getUserDataByID,
          })
            .then((res) => {
              if (res.status === 200) {
                console.log("Update User type result.data:",res.data);
                alert("Update Successful !!");
                // navigate("/GetAllUsersAdmin");
              }
            })
            .catch((error) => {
              console.log("ERROR", error);
              alert("Error Orrured In User type Update");
            });

    }

  return (
    <div className="UpdateUser">
        
      <Container className="heading">
        <h2>Update User Type</h2>
      </Container>

      <Container className="form">
        <Form 
        onSubmit={handleSubmit}
        >
          <Container>

                    <Form.Group size="lg" controlId="password">
                          <Form.Select 
                          name="user_type" 
                        //   value={getUserDataByID.user_type} 
                          onChange={(e)=>onInputChange(e)} 
                          aria-label="Default select example"
                          
                          >
                            {/* <option selected disabled>
                              Select Status
                            </option> */}
                            <option>Select User Type</option>
                            <option value="User" style={{backgroundColor:"#ed5247", color:"white"}}>User</option>
                            <option value="Admin" style={{backgroundColor:"#f7c95e", color:"white"}}>Admin</option>
                          </Form.Select>
                        </Form.Group>

      
            
            
            <div className="d-grid gap-1 mt-4">
            <Button style={{backgroundColor:"#FB8B24"}} 
                    size="lg"
                    type="submit"
                    className="mb-3">
                  Update
            </Button>
          </div>

          </Container>

        </Form>
      </Container>
        <ToastContainer />
    </div>
  )
}

export default UpdateToAdmin