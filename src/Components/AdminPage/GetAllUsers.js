import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { FaEye, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import UpdateToAdmin from "./UpdateToAdmin";

const GetAllUsers = () => {

    const [getAllUsersData, setGetAllUsersData] = useState();

    let token = localStorage.getItem("user-token");
    console.log("Token in Get All Users--", token);

    useEffect(()=>{
        axios({
            baseURL: `http://127.0.0.1:8000/get-all-user/${token}`,
            method: "GET",
          })
            .then((res) => {
              if (res.status === 200) {
                console.log("Get All Users Data for Admin:",res.data);
                setGetAllUsersData(res.data);
              }
            })
            .catch((error) => {
              console.log("ERROR", error);
              alert("Error in Get All Users Data for Admin");
              
            });
    },[]);

    console.log('Get All Users Data:--',getAllUsersData)

  return (
    <div>
      <Navbar expand="lg" className="bg-light mb-3">
        <Container className="justify-content-center">
          <Navbar.Brand>
            <h4>All Active Users List</h4>
          </Navbar.Brand>
        </Container>
      </Navbar>

    <Container>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email ID</th>
          <th>Mobile Number</th>
          <th>User Type</th>
          <th>Make Admin</th>
        </tr>
      </thead>
      <tbody>
        
        {
            getAllUsersData && getAllUsersData.map((index, key)=>{
                return(
                    
                    
                    <tr key={key}>
                            <td>{key+1}</td>
                            <td>{index.first_name}</td>
                            <td>{index.last_name}</td>
                            <td>{index.email}</td>
                            <td>{index.mobile}</td>
                            <td>{index.user_type}</td>
                            <td><Link to={`/UpdateToAdmin/${index.id}`}><FaEdit style={{ fontSize: "20px", color:'black' }} /></Link></td>
               
                    </tr>        
                    
                )
            })
        }
        
        
      </tbody>
    </Table>
    </Container>
      

    </div>
  );
};

export default GetAllUsers;
