// import React, { useEffect, useRef, useState } from 'react';

// import { ChatEngine } from 'react-chat-engine';

// function Friends({user}) {
// 	return (
// 		<ChatEngine
// 			projectID='f6aff6c0-ca83-4900-abfb-df2dd6c44a93'
// 			userName={user.username}
// 			userSecret={user.username}
// 		/>
// 	);
// }


// export default Friends


import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import { PrettyChatWindow } from "react-chat-engine-pretty";

const Friends = ({ user }) => {
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
          {/* <button onClick={() => createDirectChat(creds)}>
          Create
        </button> */}
        </div>
      </>
    )
  }

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '10px',zIndex:100 }}>
        <h2>CHAT WITH YOUR FRIENDS</h2>
      </div>
      <ChatEngine
        height='80vh'
        projectID='f6aff6c0-ca83-4900-abfb-df2dd6c44a93'
        userName={user.username}
        userSecret={user.username}
        renderNewChatForm={(creds) => renderChatForm(creds)}
      />
    </>
  )


}

export default Friends;