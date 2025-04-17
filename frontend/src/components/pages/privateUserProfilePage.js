import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";

const PRIMARY_COLOR = "#D6D6D6";
const SECONDARY_COLOR = '#404040';
const BUTTON_COLOR = '#80276C';

//link to service
//http://localhost:8096/privateUserProfile

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bgColor, setBgColor] = useState(SECONDARY_COLOR);
  const [bgText, setBgText] = useState(PRIMARY_COLOR);
  const navigate = useNavigate();


  // handle logout button
  const handleLogout = (async) => {
    localStorage.clear();
    navigate("/");
  };
  let testStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
    background: bgColor,
  };
  let labelStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
  };
  let backgroundStyling = { background: bgColor };
  let buttonStyling = {
    background: BUTTON_COLOR,
    borderStyle: "none",
    color: '#FFFFFF',
  };

  useEffect(() => {
    const obj = getUserInfo();
    setUser(obj);
    setBgColor(SECONDARY_COLOR);
    setBgText(PRIMARY_COLOR);
  }, []);



  // 	<span><b>{<FollowerCount username = {username}/>}</b></span>&nbsp;
  // <span><b>{<FollowingCount username = {username}/>}</b></span>;
  if (!user) return (<div><h4>Log in to view this page.</h4></div>)
  return (
    <>
      <section className="vh-100" style={testStyling}>
        <div class="container"
          style={backgroundStyling}>
          <div class="col-md-12 text-center"
          style={labelStyling}>
            <h3>User Profile
            </h3>
            <div class="col-sm-12 text-left">
              <h6>Username: {user.username}</h6>
              <h6>Email: {user.email}</h6>
            </div>
            <div class="col-md-12 text-center">
                <h3>Payment Info</h3>
            </div>
            <div class="col-sm-12 text-left">
              {/* atm, we're lacking the proper variables for this object, treat the following info as placeholders until then */}
              <a href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ">Add new payment info</a>
              <h4>Credit Card Info</h4>
              <h6>Card Number: **** **** **** 1234</h6> 
              <h6>Expiration Date: 06/04</h6>
              <h6>Address: 352 Lafayette St, Salem, MA 01970</h6>
              <Button className="deleteCardBtn" variant="danger" style={buttonStyling}>Delete Card</Button>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>  
                  <Modal.Title>Delete Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this card?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose} style={buttonStyling}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose} style={buttonStyling}>
                    Yes
                  </Button>
                </Modal.Footer> 
              </Modal>
            </div>
            <div class="col-md-12 text-center">
              <>
                <Button 
                className="me-2" 
                onClick={handleShow}
                style={buttonStyling}>
                
                  Log Out
                </Button>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  style={backgroundStyling}
                >
                  <Modal.Header closeButton
                  style={testStyling}>
                    <Modal.Title 
                    style={testStyling}
                    >Log Out</Modal.Title>
                  </Modal.Header>
                  <Modal.Body
                  style={testStyling}>Are you sure you want to Log Out?</Modal.Body>
                  <Modal.Footer
                  style={testStyling}>
                    <Button variant="secondary" onClick={handleClose} style={buttonStyling}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleLogout} style={buttonStyling}>
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export default PrivateUserProfile;
