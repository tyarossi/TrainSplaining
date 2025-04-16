import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

function MBTASchedule(){
    const [Stops, setStops] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState("Blue");  

    useEffect(()=> { 
        async function fetchData(route) {
            try {
                const result = await axios(`https://api-v3.mbta.com/schedules?filter[route]=${route}`);
                setStops(result.data.data);
            }   
            catch(error) {
                console.error("Error fetching data:", error);
            }
        } 
        fetchData(selectedRoute); // Fetch data for the selected route

        const interval = setInterval(fetchData, 300000); // 300000 ms = 5 minutes
        return () => clearInterval(interval); // Cleanup interval on component unmount
        }, [selectedRoute]);

        return(
            <div>
                {
                    <Dropdown>
                        <Dropdown.Toggle variant = "primary" id = "dropdown-basic">
                            Select Route
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSelectedRoute("Blue")}>Blue</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedRoute("Green")}>Green</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedRoute("Red")}>Red</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedRoute("Orange")}>Orange</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }
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
                                {stop.attributes.direction_id ? <p>Outbound</p> : <p>Inbound</p>}
                                Arrival: {stop.attributes.arrival_time || "Not Available"}<br/>
                                Departure: {stop.attributes.departure_time || "Not Available"}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}

                <h1>Stops</h1>
                {Stops.map(stop => (
                    <div key ={stop.id}>
                        <h3>Drop Off Type: {stop.attributes.drop_off_type}</h3>
                        <p>Stop Sequence: {stop.attributes.stop_sequence}</p>
                    </div>
                ))}
            </div>
        )
    
    }
export default MBTASchedule;