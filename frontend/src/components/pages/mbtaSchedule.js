import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function MbtaSchedule() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setSchedules([]); // Clear schedules before fetching new data
      const result = await axios(
        'https://api-v3.mbta.com/schedules?filter[route]=Red&filter[stop]',
      );
      setSchedules(result.data.data);
    }

    fetchData();
    const interval = setInterval(fetchData, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      {schedules.map(schedule => (
        <Card
          body
          outline
          color="success"
          className="mx-1 my-2"
          style={{ width: "30rem" }}
          key={schedule.id}
        >
          <Card.Body>
            <Card.Title>Schedule</Card.Title>
            <Card.Text>
              <div>Route: {schedule.relationships.route.data.id}</div>
              <div>Departure Time: {schedule.attributes.departure_time}</div>
              <div>Arrival Time: {schedule.attributes.arrival_time}</div>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default MbtaSchedule;