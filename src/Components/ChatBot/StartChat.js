import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./StartChat.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import { FaEye } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

const StartChat = () => {
    const [currentUserData, setCurrentUserData] = useState([]);
    const [getUserTags, setGetUserTags] = useState([]);
    const [queryInput, setQueryInput] = useState('');
    const [getChatHistory, setGetChatHistory] = useState([]);

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
    console.log(" Current User Data in Start Chat--", currentUserData.id);


    useEffect(() => {
      
        axios({
            baseURL: `http://127.0.0.1:8000/tags-by-user/${currentUserData.id}`,
            method: "GET",
          })
            .then((res) => {
              if (res.status === 200) {
                console.log("Get User Tags res.data:", res.data);
                setGetUserTags(res.data);
              }
            })
            .catch((error) => {
              console.log("ERROR", error);
              // alert("Error in Get User Chat Data");
            });
  
      },[currentUserData.id]);

      let getUserTagsLength = getUserTags.length;
      let getTagsData = getUserTags[getUserTagsLength-1]
      console.log(" Get Current User's Latest Tags Data in Start Chat--", getTagsData);


      useEffect(()=>{

        if(getTagsData){
            axios({
                baseURL: `http://127.0.0.1:8000/chats-in-tags/${getTagsData.id}`,
                method: "GET",
              })
                .then((res) => {
                  if (res.status === 200) {
                    console.log("Get User Chat Data:", res.data);
                    setGetChatHistory(res.data);
                  }
                })
                .catch((error) => {
                  console.log("ERROR", error);
                  setGetChatHistory([]);
                  // alert("Error in Get User Chat Data");
                });
        }
                

      },[getTagsData])


      

      const handleQuerySubmit = (e) =>{
        e.preventDefault();
        console.log("queryInput", queryInput);

        axios({
              baseURL: `http://127.0.0.1:8000/chat-generation/${token}`,
              method: "POST",
              data: {
                user_query: queryInput,  
              },
            })
              .then((res) => {
                if (res.status === 200) {
                  console.log("result.data:",res.data);
                }
              })
              .catch((error) => {
                console.log("ERROR", error);
                alert("Error!! in user query");
              });
// =================================================================
axios({
    baseURL: `http://127.0.0.1:8000/chats-in-tags/${getTagsData.id}`,
    method: "GET",
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("Get User Chat Data:", res.data);
        setGetChatHistory(res.data);
      }
    })
    .catch((error) => {
      console.log("ERROR", error);
      setGetChatHistory([]);
      // alert("Error in Get User Chat Data");
    });

    setQueryInput('');
      }

  return (
    <div>
      <Navbar expand="lg" className="bg-light mb-3">
        <Container>
          <Navbar.Brand><h5>Start Chat</h5></Navbar.Brand>
          <h5>{getTagsData && getTagsData.tag_title}</h5>
        </Container>
        
      </Navbar>

      <Container className="StartChatsDiv">
        <div className="d-grid gap-2">
          {getChatHistory.length ?
            getChatHistory.map((index, key) => {
              return (
                <>
                
                  <Row>
                    <Col></Col>
                    <Col>
                      <p style={{ textAlign: "right", marginRight: 100 }}>
                        {currentUserData.first_name}
                      </p>
                      <Button
                        variant="primary"
                        size="lg"
                        style={{ width: 300, textAlign: "right" }}
                        className="pull-right"
                      >
                        {index.user_query}
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p style={{ textAlign: "left", marginLeft: 100 }}>
                        Bot Response
                      </p>
                      <Button
                        className="mb-3"
                        size="lg"
                        variant="light"
                        style={{
                          width: 300,
                          backgroundColor: "#50C4ED",
                          textAlign: "left",
                        }}
                      >
                        {index.bot_response}
                      </Button>
                    </Col>
                    <Col></Col>
                  </Row>
                </>
              );
            })
            :
            <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h3>You're Starting a New Conversation!!</h3>
            </>
            
          }

                
        </div>
      </Container>


                <Container>
                <Form.Group size="lg" controlId="password">
                            

                            <InputGroup className="mb-3">
                        
                                
                            
                                <Form.Control
                                type="text"
                                value={queryInput}
                                onChange={(e) => setQueryInput(e.target.value)} 
                                />
                            
                            
                            <InputGroup.Text id="basic-addon2"><FaPlay onClick={handleQuerySubmit}  style={{ fontSize: "20px", color:'black' }} /></InputGroup.Text>
                            </InputGroup>
                            
                            </Form.Group>
                </Container>
      

    </div>
  )
}

export default StartChat