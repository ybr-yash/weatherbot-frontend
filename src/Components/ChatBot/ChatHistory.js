import React from 'react';
import TagsList from './TagsList';
import ChatList from './ChatList';
import Container from 'react-bootstrap/Container';
import { useParams } from "react-router-dom";

const ChatHistory = () => {
    const { tagId } = useParams();
    console.log("Tag ID in Chat History--", tagId);
  return (
    <div>
        <div className='d-flex'>
            <div style={{width: 500}}>
                    <TagsList/>
            </div>

            <Container>
                <ChatList tagID = {tagId}/>
            </Container>
        </div>
    </div>
  )
}

export default ChatHistory