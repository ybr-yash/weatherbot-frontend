import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./ChatList.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ChatList = ({tagID}) => {
  console.log("TAG ID Props in Chat List", tagID);
  const [getChatHistory, setGetChatHistory] = useState([]);
  const [getTagName, setGetTagName] = useState('');
  const [currentUserData, setCurrentUserData] = useState([]);


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
    console.log(" Current User Data in Chat List--", currentUserData.first_name);


  useEffect(() => {

    axios({
      baseURL: `http://127.0.0.1:8000/chats-in-tags/${tagID}`,
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

// ------------------------------------------------------------------------
      axios({
        baseURL: `http://127.0.0.1:8000/tags-by-id/${tagID}`,
        method: "GET",
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("Get Tag by ID res.data:", res.data);
            setGetTagName(res.data);
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
          // alert("Error in Tag by ID Data Data");
        });
  }, [tagID]);

  console.log("Get User Chat History", getChatHistory);
  // console.log("Get Tag By ID Data", getTagName[0].tag_title);

  return (
    <div className="ChatsMain">
      <Navbar expand="lg" className="bg-light mb-3">
        <Container>
          <Navbar.Brand><h5>Chat List</h5></Navbar.Brand>
          <h5>{getTagName && getTagName[0].tag_title}</h5>
        </Container>
        
      </Navbar>

      <Container className="ChatsHistDiv me-5">
        <div className="d-grid gap-2">
          {getChatHistory.length ?
            getChatHistory.map((index, key) => {
              return (
                <>
                
                  <Row>
                    <Col></Col>
                    <Col>
                      <p style={{ textAlign: "right", marginRight: 20 }}>
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
                      <p style={{ textAlign: "left", marginLeft: 35 }}>
                        Bot Response
                      </p>
                      <Button
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
            <h3>No Chat History!!</h3>
            </>
            
          }
        </div>
      </Container>
    </div>
  );
};

export default ChatList;
