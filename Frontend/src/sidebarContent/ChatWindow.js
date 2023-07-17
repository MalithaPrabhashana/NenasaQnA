import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import axios from 'axios';

function ChatWindow({ user, endUser, openchatSet, openchat }) {

    // const user="student"

    return (
        <div className="card" style={{ borderRadius: '4px', marginTop: '20px', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.377)', }}>
            <div className="card-body text-center" style={{ marginTop: '10px' }}>
                <div className="mt-0 mb-0">
                    <img src={'http://localhost:3000/get-uploads/' + endUser.image}
                        alt="avatar" className="rounded-circle img-fluid" style={{ width: (openchat===false)?'200px':'100px' }} />
                </div>
                <h4 className="mb-1">{endUser.username}</h4>
                <p className="text-muted mb-4">Role : Counsellor </p>

                {(openchat===false)?
                <div className="my-5">
                    <Button onClick={() => {
                        axios.post('http://localhost:3000/carete-chat', { username1: user.username, username2: endUser.username }).then(response => {
                            const responseStatus = response.status;
                            console.log(response);
                            if (responseStatus === 200 | responseStatus === 201) {
                                openchatSet(true);
                            }
                        }).catch(error => { // Handle any errors
                            openchatSet(false);

                        });
                    }} variant="contained" color="warning">
                        Message now
                    </Button>
                </div>:null}


            </div>
        </div>
    )
}



export default ChatWindow