import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const PRIMARY_COLOR = "#dddddd";
const SECONDARY_COLOR = '#404040';

let realStyling = {
  color: PRIMARY_COLOR,
  fontWeight: "bold",
  textDecoration: "none",
  background: SECONDARY_COLOR,
};
let cardStyling = {
  color: PRIMARY_COLOR,
  fontWeight: "bold",
  textDecoration: "none",
  background: SECONDARY_COLOR,
  width: "30rem",
}

function Alerts() {
  const [alerts, setAlerts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/alerts?filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE',
      );
      setAlerts(result.data.data);
    }
    fetchData();
}, []);


return (
  <div
  style={realStyling}>
    {alerts.map(alert => (
      <Card
      // body
      // outline
      // color="success"
      // className="mx-1 my-2"
      style={cardStyling}
    >
      <Card.Body
      style={cardStyling}>
      <Card.Title
      style={cardStyling}>Alert</Card.Title>
      <Card.Text
      style={cardStyling}>{alert.attributes.header}{alert.attributes.description}</Card.Text>
      </Card.Body>
    </Card>
    ))}


      <h1
      style={realStyling}>Alerts!</h1>
    {alerts.map(alert => (
      <div key={alert.id}
      style={realStyling}>
        <h3
        style={realStyling}>{alert.attributes.header}</h3>
        <p
        style={realStyling}>{alert.attributes.description}</p>
      </div>
    ))}
  </div>
);
}


export default Alerts;