import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import {Container, Button} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import { TfiAlignJustify } from "react-icons/tfi";


// Here, we display our Navbar
export default function Navbar() {
  // We are pulling in the user's info but not using it for now.
  // Warning disabled: 
  // eslint-disable-next-line
  const [user, setUser] = useState({})

  useEffect(() => {
  setUser(getUserInfo())
  }, [])
  
  // if (!user) return null   - for now, let's show the bar even not logged in.
  // we have an issue with getUserInfo() returning null after a few minutes
  // it seems.
  return (
    <ReactNavbar bg="dark" variant="dark">
    <Container>
      <Nav className="me-auto">
        <NavDropdown title={<TfiAlignJustify size={30} />} >
          <NavDropdown.Item href="/privateUserProfile">Purchase Tickets</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Ticket Wallet</NavDropdown.Item>
          <NavDropdown.Item href="/DatabaseConnectionTest">Schedule</NavDropdown.Item>
          <NavDropdown.Item href="/privateUserProfile">Profile</NavDropdown.Item>
        {/* <Nav.Link href="/TailwindConnectionTest">Tailwind Connection Test</Nav.Link> */}
        </NavDropdown>
      </Nav>
    </Container>
  </ReactNavbar>

  );
}