import React, { useEffect, useState } from "react";
import { useRef } from "react";
import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import {
  AssignmentTurnedInOutlined,
  NotificationsOutlined,
  PeopleAltOutlined,
  Search,
  ExpandMore
} from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, Button, Input, Menu, MenuItem } from "@material-ui/core";
import "./css/NenasaHeader.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';


function NenasaHeader(props) {
  // Add question modal variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [avatarImgLink, setAvatarImgLink] = useState("");
  const Close = <CloseIcon />;
  const logoutNavigate = useNavigate();
  const questionInput = useRef('');


  // Add a question
  const handleSubmit  = async () => {
    if (question !== "" ) {
      axios.post('http://localhost:3000/questions/', {'question': question}, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
              questionInput.current.value = '';
              setIsModalOpen(false);
            }
        }).catch((error) => {
            console.log(error);
        });
    }
  }

  const logOutHandle = () => {
    localStorage.removeItem('token');
    localStorage.clear();
    logoutNavigate('/');
  }

  //Navigation bar toggle function
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  }

  // Avatar list popup variables
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const myDetailsUrl = 'http://localhost:3000/user/get-details';
  
    axios
      .post(myDetailsUrl, {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setAvatarImgLink(response.data.user[0]['image']);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  

  return (
    <div className="nHeader">
      <div className="nHeader-content">
        <div className="nHeader_logo">
          <img
            src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
            alt="logo"
          />
        </div>


        {/* --------Navbar Main icons start---------- */}
        <nav className="nHeader_icons" ref={ navRef }>
          <div className="nHeader_icon" onClick={()=>{props.select(5)}}>
            <Tooltip title="Home">
                <HomeIcon />
            </Tooltip>

          </div>

          {/* <div className="nHeader_icon">
            <Tooltip title="Following">
              <FeaturedPlayListOutlinedIcon />
            </Tooltip>
          </div> */}

          <div className="nHeader_icon" onClick={()=>{props.select(6)}}>
            <Tooltip title="My Questions">
              <AssignmentTurnedInOutlined />
            </Tooltip>
          </div>

          <div className="nHeader_icon" onClick={()=>{props.select(7)}}>
            <Tooltip title="My Chats"  >
              <PeopleAltOutlined />
            </Tooltip>
          </div>

          <div className="nHeader_icon">
            <Tooltip title="Notifications">
              <NotificationsOutlined />
            </Tooltip>
          </div>

          <Button onClick={ showNavbar } className="nav-btn nav-close-btn">
            <CloseIcon />
          </Button>

          
          <div className="nHeader_input">
            <Search />
            <input type="text" placeholder="Search questions" />
          </div>
        </nav>
      {/* --------Navbar Main icons end---------- */}



        <div>
          <Button onClick={ showNavbar } className="nav-btn nav-menu-btn">
            <MenuIcon />
          </Button>
        </div>

        <div className="nHeader_Rem">

      {/* --------Avatar Icon and menu list starting---------- */}          
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}><img src={"http://localhost:3000/get-uploads/"+avatarImgLink} style={{width: 40, height: 40}} /></Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                  position: 'absolute',
                  top: '20px'
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >

            {/* <Link to="/editProfile" > */}
              <MenuItem onClick={()=>{props.select(9)}}>My account</MenuItem>
            {/* </Link> */}

            <Divider />

            <MenuItem onClick={handleClose}>
              <ListItemIcon className="avatar-list-icon">
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={logOutHandle}>
              <ListItemIcon className="avatar-list-icon">
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
      {/* --------Avatar Icon and menu list ending---------- */}    

          <Button onClick={() => setIsModalOpen(true)} className="addQuestion">Add Question</Button>
        </div>
      </div>


      {/* --------Add question modal start---------- */}
      <Modal
        open={isModalOpen}
        closeIcon={Close}
        onClose={() => setIsModalOpen(false)}
        closeOnEsc
        center
        closeOnOverlayClick={false}
        styles={{
          overlay: {
            height: "auto",
          },
        }}
      >
        <div className="modal_title">
          <h5>Add Question</h5>
          <h5>Share Link</h5>
        </div>
        <div className="modal_info">
          <Avatar className="avatar" />
          <div className="modal_scope">
            <PeopleAltOutlined />
            <p>Public</p>
            <ExpandMore />
          </div>
        </div>
        <div className="modal_Field">


        {/* <ReactQuill
        value={question}
        placeholder="Start your question with 'What', 'How', 'Why', etc."
      /> */}
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            type="text"
            placeholder="Start your question with 'What', 'How', 'Why', etc. "
            ref={questionInput}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              style={{
                margin: "5px 0",
                border: "1px solid lightgray",
                padding: "10px",
                width: "100%"
              }}
              placeholder="Optional: include a link that gives context"
            />
            {inputUrl !== "" && (
              <img
                style={{
                  height: "40vh",
                  objectFit: "contain",
                }}
                src={inputUrl}
                alt="displayimage"
              />
            )}
          </div>
        </div>
        <div className="modal_buttons">
          <button className="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
          <button onClick={handleSubmit} type="submit" className="add">
            Add Question
          </button>
        </div>
      </Modal>
      {/* --------Add question modal end---------- */}


    </div>
  );
}

export default NenasaHeader;
