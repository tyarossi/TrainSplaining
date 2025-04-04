import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import {Container, Button} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';


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
      <Nav className="me-auto" style={{paddingRight: '10px'}}>
        <NavDropdown title="Schedule" id="basic-nav-dropdown">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic" style={{width: '100%'}}>
              Schedules
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/mbtaSchedule?Blue">Blue Line</Dropdown.Item>
              <Dropdown.Item href="/mbtaSchedule?Red">Red Line</Dropdown.Item>
              <Dropdown.Item href="/mbtaSchedule?Green">Green Line</Dropdown.Item>
              <Dropdown.Item href="/mbtaSchedule?Orange">Orange Line</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/privateUserProfile">Purchase Tickets</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Station Tickets</NavDropdown.Item>
          <NavDropdown.Item href="/">Start</NavDropdown.Item>
          <NavDropdown.Item href="/home">Home</NavDropdown.Item>
          <NavDropdown.Item href="/privateUserProfile">Profile</NavDropdown.Item>
          <NavDropdown.Item href="/mbtaAlerts">Alerts</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/TailwindConnectionTest">Tailwind Connection Test</Nav.Link>
      </Nav>
    </Container>
  </ReactNavbar>

  );
}