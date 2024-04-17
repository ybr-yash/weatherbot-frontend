import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteAccount = ({show, handleClose}) => {
    const [currentUserData, setCurrentUserData] = useState([]);
    const [tagsOfUser, setTagsofUser] = useState();
    const navigate = useNavigate('');

    let token = localStorage.getItem("user-token");
    console.log("Token in Start Chat--", token);

    useEffect(() => {
      
      axios({
        baseURL: `http://127.0.0.1:8000/get-user-profile/${token}`,
        method: "GET",
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("Get Current User res.data in delete account:",res.data);
            setCurrentUserData(res.data);
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
          alert("Error in Get Current User Data");
          
        });

    },[]);
    console.log(" Current User Data in Delete Account--", currentUserData);
    console.log("Current user id is in delete.js--", currentUserData.id);


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

    const handleDelete = () =>{
// ----------------------------------------------------------------------------
      for(let i=0;i<tagsOfUser.length;i++){
        console.log('i--', tagsOfUser[i].id);
        axios({
          baseURL: `http://localhost:8000/delete-chat-by-tag/${tagsOfUser[i].id}`,
          method: 'DELETE',
        })
          .then((res) => {
            if (res.status === 200) {
              console.log("Delete Current User's all chats in all tags res.data in delete account:",res.data);
            }
          })
          .catch((error) => {
            console.log("ERROR", error);
            // alert("Error in Delete Current User's Chat Data");
          });
      }

      
// ----------------------------------------------------------------------------

      for(let i=0; i<tagsOfUser.length; i++){
        console.log('i--', tagsOfUser[i].id);
        axios({
          baseURL: `http://localhost:8000/delete-tags-by-userID/${tagsOfUser[i].id}`,
          method: 'DELETE',
        })
          .then((res) => {
            if (res.status === 200) {
              console.log("Delete Current User's all tags res.data in delete account:",res.data);
            }
          })
          .catch((error) => {
            console.log("ERROR", error);
            // alert("Error in Delete Current User's Chat Data");
          });
      }

// ----------------------------------------------------------------------------
        console.log("Current user id is in delete.js--", currentUserData.id);
        axios({
            baseURL: `http://localhost:8000/delete-user/${currentUserData.id}`,
            method: 'DELETE',
          })
            .then((res) => {
              if (res.status === 200) {
                console.log("Delete Current User res.data in delete account:",res.data);
                // navigate('/login');
                window.location.href = "/";
                localStorage.clear("user-token");
              }
            })
            .catch((error) => {
              console.log("ERROR", error);
              alert("Error in Delete Current User Data");
              
            });
    }

  return (
    <div>

    <Modal show={show} 
    onHide={handleClose}
    centered
    >
        <Modal.Header closeButton style={{backgroundColor:"#FF8911"}}>
          <Modal.Title>Delete User Account</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#FEECE2"}}>
            Hey {currentUserData.first_name} {currentUserData.last_name}!!! <br></br>
            Are You Sure?? <br></br>
            Do You Really Want to Delete Your Account??
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:"#FF8911"}}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeleteAccount