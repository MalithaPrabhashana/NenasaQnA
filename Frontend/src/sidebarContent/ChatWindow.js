import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import axios from 'axios';


import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine';
import { PrettyChatWindow } from "react-chat-engine-pretty";
function ChatWindow({ user, endUser, chat }) {

    // const user="student"

    return (
        <div className="card" style={{ borderRadius: '4px', marginTop: '20px', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.377)', }}>
            <div className="card-body text-center" style={{ marginTop: '10px' }}>
                {/* <div className="mt-0 mb-0">
                    <img src={'http://localhost:3000/get-uploads/' + endUser.image}
                        alt="avatar" className="rounded-circle img-fluid" style={{ width:'100px' }} />
                </div>
                <h4 className="mb-1">{endUser.username}</h4>
                <p className="text-muted mb-4">Role : Counsellor </p> */}

                <div className="my-5">

                    {(() => {

                        if (chat) {
                            return (<div style={{ height: '100vh' }}>
                                <ChatEngineWrapper>
                                <Socket
                                    projectID={'f6aff6c0-ca83-4900-abfb-df2dd6c44a93'}
                                    userName={"student"}
                                    userSecret={"student"}
                                />
                                
                                <ChatFeed activeChat={"189779"} />
                            </ChatEngineWrapper>
                            </div>)
                        }
                        return null;
                    })()}


                    {/* <Button onClick={() => {
                        // axios.post('http://localhost:3000/carete-chat', { username1: user.username, username2: endUser.username }).then(response => {
                        //     const responseStatus = response.status;
                        //     console.log(response);
                        //     if (responseStatus === 200 | responseStatus === 201) {
                        //         openchatSet(true);
                        //     }openchatSet(false);
                        // }).catch(error => { // Handle any errors
                        //     openchatSet(false);

                        // });
                    }} variant="contained" color="warning">
                        Message now
                    </Button> */}
                </div>


            </div>
        </div>
    )
}



export default ChatWindow