

import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import { PrettyChatWindow } from "react-chat-engine-pretty";

const Friends = ({ user,projectId }) => {
  const [username, setUsername] = useState('')

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername('')
    )
  }

  function renderChatForm(creds) {
    return (
      <>
        <div>
          <TextField style={{ margin: '10px', maxWidth: '50%' }} id="outlined-basic" value={username} onChange={(e) => setUsername(e.target.value)} label="username" variant="outlined" />
          <Button onClick={() => createDirectChat(creds)} style={{ margin: '10px', maxWidth: '50%', marginTop: '20px' }} variant="contained">Create</Button>
        </div>
      </>
    )
  }

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '10px',zIndex:100 }}>
        <h2>CHAT WITH OTHERS</h2>
      </div>
      <ChatEngine
        height='80vh'
        projectID={projectId}
        userName={user.username}
        userSecret={user.username}
        renderNewChatForm={(creds) => renderChatForm(creds)}
      />
    </>
  )


}

export default Friends;