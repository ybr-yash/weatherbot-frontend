import React, { useState } from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from "axios";
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './TagsList.css';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../Redux/Feature/AuthSlice";
import { Link } from 'react-router-dom';

const TagsList = () => {
    const dispatch = useDispatch();
    const [currentUserData, setCurrentUserData] = useState([]);
    const [tagsOfUser, setTagsofUser] = useState();

    let token = localStorage.getItem("user-token");
    console.log("Token in TagsList--", token);

    useEffect(() => {
      
      axios({
        baseURL: `http://127.0.0.1:8000/get-user-profile/${token}`,
        method: "GET",
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("Get Current User Data:",res.data);
            setCurrentUserData(res.data);
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
          alert("Error in Get Current User Data");
          
        });

    },[]);
    
    
    useEffect(() => {
      if(currentUserData.length !== 0){
        console.log('User Id--', currentUserData.id)
        axios({
          baseURL: `http://127.0.0.1:8000/tags-by-user/${currentUserData.id}`,
          method: "GET",
        })
          .then((res) => {
            if (res.status === 200) {
              console.log("Get Tags of Current User:",res.data);
              setTagsofUser(res.data)
            }
          })
          .catch((error) => {
            console.log("ERROR", error);
            alert("Error in Tags of Current User");
          });
      }

    }, [currentUserData.id])
    
    
    console.log("Tags of Current User", tagsOfUser);
    


  return (
    <div className='TagsMain'>

    <Navbar expand="lg" className="bg-light mb-3" >
      <Container>
        <Navbar.Brand><h5>Tags List</h5></Navbar.Brand>
      </Container>
    </Navbar>


    
    <Container className='TagsDiv me-5'>
            <div className="d-grid gap-1">
                    {/* <Button variant="secondary" size="lg">
                      Block level button
                    </Button>
                    <Button variant="secondary" size="lg">
                      Block level button
                    </Button>
                    <Button variant="secondary" size="lg">
                      Block level button
                    </Button>
                    <Button variant="secondary" size="lg">
                      Block level button
                    </Button> */}
                    {
                      tagsOfUser && tagsOfUser.map((index, key)=>{
                        return(
                          <Button variant="secondary" size="lg" style={{backgroundColor:"#944E63"}}>
                          <Link to={`/chatHistory/${index.id}`} style={{textDecoration: 'None', color:'white', fontWeight:"bolder"}}>{index.tag_title}</Link>
                        </Button>
                        )
                      })
                    }
              </div>
      </Container>


      
    
      
        
    </div>
  )
}

export default TagsList