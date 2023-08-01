import React, { useEffect, useState } from "react";
import { useRef } from "react";

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
import { Navigate, useNavigate } from "react-router-dom";
import { Nav, Form } from "react-bootstrap";
import { Button as BootstrapButton } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'



function NenasaHeader(props) {
  // Add question modal variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [avatarImgLink, setAvatarImgLink] = useState("");
  const Close = <CloseIcon />;
  const logoutNavigate = useNavigate();
  const homeNavigate = useNavigate();
  const questionInput = useRef('');
  const [activeNavItem, setActiveNavItem] = useState(5);
  const [searchQuestionsList, setSearchQuestionsList] = useState("");
  const [gotsearchQuestionsList, setGotSearchQuestionsList] = useState([]);
  const [questionSubject, setQuestionSubject] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");

  

  const handleNavItemClick = (navItem) => {
    props.select(navItem);
    setActiveNavItem(navItem);
    showNavbar();
  };



  // Add a question
  const handleSubmit = async () => {
    if (question !== "") {
      axios.post('http://localhost:3000/questions/', {
        'question': question,
        'imgLink': inputUrl,
        'subjectName': questionSubject,
        'questionTitle': questionTitle
      }, {
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



  // Search questions
  const searchQuestions = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setSearchQuestionsList(event.target.elements.searchInput.value);
  };


  useEffect(() => {
    if (searchQuestionsList !== "") {
      axios.post('http://localhost:3000/questions/filter', { search: searchQuestionsList }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.status === 200 || response.status === 201) {
          setGotSearchQuestionsList(response.data.questions);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [searchQuestionsList])


  useEffect(() => {
    props.getFilteredQuestionData(gotsearchQuestionsList);
  }, [gotsearchQuestionsList])


  useEffect(() => {
    props.searchedKeyword(searchQuestionsList);
  }, [searchQuestionsList])




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
          localStorage.setItem('role', response.data.user[0]['role']);
          localStorage.setItem('username', response.data.user[0]['username']);
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
        <nav className="nHeader_icons" ref={navRef}>
          <div
            className={`nHeader_icon ${activeNavItem === 5 ? 'active' : ''}`}
            onClick={() => handleNavItemClick(5)}
          >
            <Nav.Link>Home</Nav.Link>
          </div>

          <div
            className={`nHeader_icon ${activeNavItem === 6 ? 'active' : ''}`}
            onClick={() => handleNavItemClick(6)}
          >{
            (() => {
              if (localStorage.getItem('role') && localStorage.getItem('role') === '0') {
                return (
                  <Nav.Link>My Questions</Nav.Link>
                );
              } else if (localStorage.getItem('role') && localStorage.getItem('role') === '1')  { return (
                <Nav.Link>Verified Questions</Nav.Link>
              );
            }else {
              return null;
            }
            })()
          }
            
          </div>
          {
            (() => {
              if (localStorage.getItem('role') && localStorage.getItem('role') === '0') {
                return (
                  <div
                    className={`nHeader_icon ${activeNavItem === 7 ? 'active' : ''}`}
                    onClick={() => handleNavItemClick(7)}
                  >
                    <Nav.Link>Chat</Nav.Link>
                  </div>
                );
              } else if(localStorage.getItem('role') && localStorage.getItem('role') === '3') {
                return (
                  <div
                    className={`nHeader_icon ${activeNavItem === 7 ? 'active' : ''}`}
                    onClick={() => handleNavItemClick(7)}
                  >
                    <Nav.Link>Clients</Nav.Link>
                  </div>
                );
              }
            })()
          }


          <div className={`nHeader_icon ${activeNavItem === 8 ? 'active' : ''}`} onClick={() => showNavbar()}>
            <Nav.Link>Notifications</Nav.Link>
          </div>

          <Button onClick={showNavbar} className="nav-btn nav-close-btn">
            <CloseIcon />
          </Button>

          <Form className="d-flex" onSubmit={searchQuestions}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-1 mt-2"
              aria-label="Search"
              id="searchInput"
              onChange={(e) => e.target.value === "" ? handleNavItemClick(5) : ""}
            />
            <BootstrapButton className="mt-2" variant="outline-primary" type="submit" onClick={() => { props.select(10) }}>
              Search
            </BootstrapButton>
          </Form>
        </nav>
        {/* --------Navbar Main icons end---------- */}



        <div>
          <Button onClick={showNavbar} className="nav-btn nav-menu-btn">
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
                <Avatar className="avatar" sx={{ width: 32, height: 32 }}><img alt="Avatar" src={"http://localhost:3000/get-uploads/" + avatarImgLink} style={{ width: 40, height: 40 }} /></Avatar>
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
            <MenuItem onClick={() => { props.select(9) }}>My account</MenuItem>
            {/* </Link> */}

            <Divider />

            {/* <MenuItem onClick={handleClose}>
              <ListItemIcon className="avatar-list-icon">
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem> */}
            <MenuItem onClick={logOutHandle}>
              <ListItemIcon className="avatar-list-icon">
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          {/* --------Avatar Icon and menu list ending---------- */}

          <Button onClick={() => setIsModalOpen(true)} className="addQuestion">Ask a Question</Button>
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
          <h5 className="model-question-title">Ask a Question</h5>
          {/* <h5>Share Link</h5> */}
        </div>
        <div className="modal_info">

        </div>
        <div className="modal_Field">
          <TextField id="outlined-basic" 
                label="Title" 
                variant="outlined"
                type="text"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)} 
                style={{
                  marginBottom: "10px"
                }}
                placeholder="Enter the question title Here"
              />

          <div className="modal-question">
            <ReactQuill className="modal-quill"
                value={question}
                placeholder="Start your question with 'What', 'How', 'Why', etc."
                onChange={(content, delta, source, editor) => {
                    // Update the state with the new value from ReactQuill
                    setQuestion(content);
                }}
                ref={questionInput}
            />
          </div>
        

            <div style={{ display: "flex", flexDirection: "column" }} className="imageLinkQuestion">
              
              <TextField id="outlined-basic" 
                label="Image Link" 
                variant="outlined" 
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)} 
                style={{
                  marginTop: "8px",
                  marginBottom: "5px"
                }}
                placeholder="Optional: include a link that gives context"
              />
              

              {inputUrl !== "" && (
                <img
                  style={{
                    height: "25vh",
                    objectFit: "contain",
                  }}
                  src={inputUrl}
                  alt="displayimage"
                />
              )}
            </div>

            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Related Subject</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Related Subject"
                    onChange={(e) => {
                      setQuestionSubject(e.target.value);
                    }}
                  >
                    <MenuItem value="maths">Combined Mathematics</MenuItem>
                    <MenuItem value="biology">Biology</MenuItem>
                    <MenuItem value="physics">Physics</MenuItem>
                    <MenuItem value="chemistry">Chemistry</MenuItem>
                    <MenuItem value="ict">ICT</MenuItem>
                  </Select>
              </FormControl>
             
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
