import 'bootstrap/dist/css/bootstrap.css';


import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine';

function ChatWindow({ user, endUser, chat }) {



    return (
        <div className="card" style={{ borderRadius: '4px', marginTop: '20px', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.377)', }}>
            <div className="card-body text-center" style={{ marginTop: '10px' }}>
                {/* <div className="mt-0 mb-0">
                    <img src={'http://localhost:3000/get-uploads/' + endUser.image}
                        alt="avatar" className="rounded-circle img-fluid" style={{ width:'100px' }} />
                </div>
                <h4 className="mb-1">{endUser.username}</h4>
                <p className="text-muted mb-4">Role : Counsellor </p> */}

                <div >

                    {(() => {

                        if (chat) {
                        return (<div style={{ height:'70vh',width:'100%', backgroundColor: 'white' ,borderRadius:'8px',position:'sticky',bottom:'0px'}}>
                            <ChatEngineWrapper >
                                <Socket
                                    projectID={'f6aff6c0-ca83-4900-abfb-df2dd6c44a93'}
                                    userName={user.username}
                                    userSecret={user.username}
                                />
                                
                               
                              
                               <ChatFeed activeChat={chat.id}/>
                            
                            </ChatEngineWrapper>
                        </div>)
                        }
                        return null;
                    })()}


                </div>


            </div>
        </div>
    )
}



export default ChatWindow