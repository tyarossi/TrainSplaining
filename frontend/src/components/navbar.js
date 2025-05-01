import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import {Container, Button} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import { TfiAlignJustify } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import '../css/Navbar.css';

const PRIMARY_COLOR = "#D6D6D6";
const SECONDARY_COLOR = '#404040';
const BUTTON_COLOR = '#80276C';

// Here, we display our Navbar
export default function Navbar() {
  // We are pulling in the user's info but not using it for now.
  // Warning disabled: 
  // eslint-disable-next-line
  const [user, setUser] = useState({})
  const [alerts, setAlerts] = useState([]);

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

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const response = await fetch('https://api-v3.mbta.com/alerts?filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE&filter%5Broute%5D=Blue%2C%20Red%2C%20Green-B%2C%20Green-C%2C%20Green-D%2C%20Green-E%2C%20Orange');
        const data = await response.json();

        const filter = data.data.filter(alert => {
          const affectedRoutes = alert.attributes.informed_entity.map(entity => entity.route);
          return affectedRoutes.some(route => ['Blue', 'Red', 'Green-B', 'Green-C', 'Green-D', 'Green-E', 'Orange'].includes(route));
        });

        setAlerts(filter.map(alert => alert.attributes.header));
      } catch (error) {
        console.error("Error fetching alerts:", error);
        setAlerts(["Jesus, the T works properly for once."])
      }
    }
      fetchAlerts();
    }, []);
  
  // if (!user) return null   - for now, let's show the bar even not logged in.
  // we have an issue with getUserInfo() returning null after a few minutes
  // it seems.
  return (
    <ReactNavbar bg="dark" variant="dark" style={realStyling}>
    <Container style={{ display: "flex", justifyContent: "space-between" }}>
      <Nav className="me-auto" style={{ display: "flex", justifyContent: "space-between" }}>
        <NavDropdown title={<TfiAlignJustify size={30} />} style={{ display: "flex", justifyContent: "space-between" }}>
          <NavDropdown.Item href="/wallet" style={realStyling}>Ticket Wallet</NavDropdown.Item>
          <NavDropdown.Item href="/mbtaSchedule" style={realStyling}>Schedule</NavDropdown.Item>
          <NavDropdown.Item href="/mbtaAlerts" style={realStyling}>Alerts</NavDropdown.Item>
          <NavDropdown.Item href="/privateUserProfile" style={realStyling}>{<CgProfile />}Profile</NavDropdown.Item>
        {/* <Nav.Link href="/TailwindConnect  ionTest">Tailwind Connection Test</Nav.Link> */}
        </NavDropdown>
      </Nav>
      <div className = "sideScrollerAlerts">
        <div className = "alerts">
          {
            alerts.length > 0 ? alerts.map((alert, index) => (
              <span key = {index} className="alertText">
                {alert}
              </span>
            ))
          : <span className = "alertItem"> THE T FINALLY WORKS AS IT SHOULD </span>}
        </div>
      </div>
    </Container>
  </ReactNavbar>

  );
}