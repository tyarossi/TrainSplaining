import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import {Container, Button} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import { TfiAlignJustify } from "react-icons/tfi";

const PRIMARY_COLOR = "#D6D6D6";
const SECONDARY_COLOR = '#404040';
const BUTTON_COLOR = '#80276C';

// Here, we display our Navbar
export default function Navbar() {
  // We are pulling in the user's info but not using it for now.
  // Warning disabled: 
  // eslint-disable-next-line
  const [user, setUser] = useState({})

  let realStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
    background: SECONDARY_COLOR,
  };
  let buttonStyling = {
    background: BUTTON_COLOR,
    borderStyle: "none",
    color: '#FFFFFF',
  };
  useEffect(() => {
  setUser(getUserInfo())
  }, [])
  
  // if (!user) return null   - for now, let's show the bar even not logged in.
  // we have an issue with getUserInfo() returning null after a few minutes
  // it seems.
  return (
    <ReactNavbar style={realStyling}>
    <Container style={buttonStyling}> 
      <Nav className="me-auto" style={realStyling}>
        <NavDropdown title={<TfiAlignJustify size={30} style={realStyling}/>} style={realStyling}>
          <NavDropdown.Item href="/privateUserProfile" style={realStyling}>Purchase Tickets</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3" style={realStyling}>Ticket Wallet</NavDropdown.Item>
          <NavDropdown.Item href="/mbtaSchedule" style={realStyling}>Schedule</NavDropdown.Item>
          <NavDropdown.Item href="/privateUserProfile" style={realStyling}>Profile</NavDropdown.Item>
        {/* <Nav.Link href="/TailwindConnect  ionTest">Tailwind Connection Test</Nav.Link> */}
        </NavDropdown>
      </Nav>
    </Container>
  </ReactNavbar>

  );
}