import React from 'react'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

import Sun1 from "../../Images/SunImg2.jpg"
import Rain1 from "../../Images/RainImg1.jpg"
import BotImage from "../../Images/BotImage2.jpg"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

import DeleteAccount from '../UserInfo/DeleteAccount';
import Modal from 'react-bootstrap/Modal';

const Header = () => {
  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [currentUserData, setCurrentUserData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let token = localStorage.getItem("user-token");
  console.log("Token in Header", token);


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
        // alert("Error in Get Current User Data");
        
      });

  },[]);
  console.log(" Current User type Data in Header--", currentUserData.user_type);
  

  const handleLogout = () =>{
    // navigate('/');
    window.location.href = '/';
    localStorage.clear("user-token");
  }


  return (
    <div>
      {
        token ? 
        <Navbar expand="lg" style={{backgroundColor:"#eba834"}}>
      <Container fluid>
        <img src={Sun1} alt='' style={{height:60, width:100}} className='me-3'></img>
        <Navbar.Brand href="/homeAfterLogin" className='text-dark fs-3 fw-bold' style={{fontFamily:"cursive"}}>WEATHER CHAT BOT</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          {
            currentUserData.user_type == "Admin" ? 
            <>
            <Link to={"/GetAllUsersAdmin"}><Button  variant="danger" className='me-4'>Get All Users</Button></Link>
            <Link to={"#"}><Button  variant="danger" className='me-4'>Not Answer Questions</Button></Link>
            </>
            :
            <>
            <Link to={"/startChat"}><Button  variant="danger" className='me-4'>Start Chat</Button></Link>
            <Link to={"/chatHistory/:tagId"}><Button  variant="danger" className='me-4'>Chat History</Button></Link>
            </>
          }
          
          {/* <Button onClick={handleLogout} variant="danger" className='me-4'>Logout</Button> */}
          
            <Dropdown className='me-3'>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
            User Info
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/UserInfo">Update</Dropdown.Item>
              <Dropdown.Item href="/ChangePassword">Change Password</Dropdown.Item>
              <Link to={"/DeleteAccount"} style={{textDecoration:"none"}}><Dropdown.Item onClick={handleShow}>Delete Account</Dropdown.Item></Link>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4" onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          

          <img src={BotImage} alt='' style={{height:60, width:100, borderRadius:50}}></img>
        </Navbar.Collapse>
      </Container>

      <DeleteAccount show={show} handleClose={handleClose}/>

    </Navbar>
        
        :
      
        <Navbar expand="lg" className="bg-dark">
      <Container fluid>
        <img src={Sun1} alt='' style={{height:60, width:100}} className='me-3'></img>
        <Link to={"/"} style={{textDecoration:"none"}}><Navbar.Brand href="#" className='text-white fs-3 fw-bold' style={{fontFamily:"cursive"}}>WEATHER CHAT BOT</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
           
          </Nav>
          
          <Link to={'/register'}><Button variant="warning" className='me-4'>Sign Up</Button></Link>
          <Link to={'/login'}><Button variant="success" className='me-4'>Login</Button></Link>
          <img src={Rain1} alt='' style={{height:60, width:100}}></img>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        
      }
    
    </div>
  )
}

export default Header