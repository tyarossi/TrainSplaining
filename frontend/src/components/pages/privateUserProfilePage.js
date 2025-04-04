import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";


//link to service
//http://localhost:8096/privateUserProfile

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();


  // handle logout button
  const handleLogout = (async) => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    setUser(getUserInfo())
  }, []);


  // 	<span><b>{<FollowerCount username = {username}/>}</b></span>&nbsp;
  // <span><b>{<FollowingCount username = {username}/>}</b></span>;
  if (!user) return (<div><h4>Log in to view this page.</h4></div>)
  return (
    <div class="container">
      <div class="col-md-12 text-center">
        <h3>User Profile</h3>
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
          <Button className="deleteCardBtn" variant="danger">Delete Card</Button>
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
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Yes
              </Button>
            </Modal.Footer> 
          </Modal>
        </div>
        <div class="col-md-12 text-center">
          <>
            <Button className="me-2" onClick={handleShow}>
              Log Out
            </Button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Log Out</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
};

export default PrivateUserProfile;
