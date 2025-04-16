import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

const PRIMARY_COLOR = "#D6D6D6"; //text
const SECONDARY_COLOR = '#404040'; //background
const BUTTON_COLOR = '#80276C';
///merge push

function MBTASchedule(){
    const [Stops, setStops] = useState([]);
    const [selectedRoutes, setSelectedRoutes] = useState("Blue");
    const [showGreenSubmenu, setShowGreenSubmenu] = useState(false);

    useEffect(()=> { 
        async function fetchData(route) {
            try {
                const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

                const result = await axios(
                    `https://api-v3.mbta.com/schedules?filter[route]=${route}&&filter[date]=${today}`
                );
                setStops(result.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } 
        fetchData(selectedRoutes); // Fetch data for the selected route

        const interval = setInterval(() => fetchData(selectedRoutes), 300000); // Refresh every 5 minutes
        return () => clearInterval(interval); // Cleanup interval on component unmount
        }, [selectedRoutes]);

        return(
            <div>
                {
                    <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {selectedRoutes} Line
                    </Dropdown.Toggle>
    
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSelectedRoutes("Blue")}>Blue</Dropdown.Item>
                        <Dropdown.Item
                            onMouseEnter={() => setShowGreenSubmenu(true)}
                            onMouseLeave={() => setShowGreenSubmenu(false)}
                        >
                            Green
                            {showGreenSubmenu && (
                                <Dropdown.Menu show>
                                    <Dropdown.Item onClick={() => setSelectedRoutes("Green-B")}>Green-B</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedRoutes("Green-C")}>Green-C</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedRoutes("Green-D")}>Green-D</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedRoutes("Green-E")}>Green-E</Dropdown.Item>
                                </Dropdown.Menu>
                            )}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedRoutes("Red")}>Red</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedRoutes("Orange")}>Orange</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
    
                }

                <h1>Route: {selectedRoutes} Line</h1>
                {Stops.map(stop =>(
                    <Card
                        body
                        outline
                        color = "success"
                        className ="mx-1 my-2"
                        style = {{width: "35rem"}}
                    >
                        <Card.Body>
                            <Card.Title>Line Arrival and Departure Times</Card.Title>
                            <Card.Text>
                                Arrival: {stop.attributes.arrival_time || "Not Available"}<br/>
                                Departure: {stop.attributes.departure_time || "Not Available"}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}

            <h1 style={realStyling}>Stops</h1>
            {Stops.map(stop => (
                <div key ={stop.id} style={realStyling}>
                    <h3 style={realStyling}>Drop Off Type: {stop.attributes.drop_off_type}</h3>
                    <p style={realStyling}>Stop Sequence: {stop.attributes.stop_sequence}</p>
                </div>
            ))}
        </div>
    )

}
export default MBTASchedule;