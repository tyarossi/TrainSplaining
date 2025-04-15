import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

const PRIMARY_COLOR = "#D6D6D6"; //text
const SECONDARY_COLOR = '#404040'; //background
const BUTTON_COLOR = '#80276C';


function MBTASchedule(){
    const [Stops, setStops] = useState([]);
    const [selectedRoutes, setSelectedRoutes] = useState("Blue");
    const [showGreenSubmenu, setShowGreenSubmenu] = useState(false);


    let realStyling = {
        color: PRIMARY_COLOR,
        fontWeight: "bold",
        textDecoration: "none",
        background: SECONDARY_COLOR,
    };
    let blueStyling = {
        color: PRIMARY_COLOR,
        fontWeight: "bold",
        textDecoration: "none",
        background: "#003DA5",
    };
    let greenStyling = {
        color: PRIMARY_COLOR,
        fontWeight: "bold",
        textDecoration: "none",
        background: "#00843D",
    };
    let redStyling = {
        color: PRIMARY_COLOR,
        fontWeight: "bold",
        textDecoration: "none",
        background: "#DA291C",
    };
    let orangeStyling = {
        color: PRIMARY_COLOR,
        fontWeight: "bold",
        textDecoration: "none",
        background: "#ED8B00",
    };
    let buttonStyling = {
        background: BUTTON_COLOR,
        borderStyle: "none",
        color: '#FFFFFF',
    };
    let cardStyling = {
        color: PRIMARY_COLOR,
        fontWeight: "bold",
        textDecoration: "none",
        background: SECONDARY_COLOR,
        width: "35rem",
        };

    useEffect(()=> { 
        async function fetchData(route) {
            try {
                const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

                const result = await axios(
                    `https://api-v3.mbta.com/schedules?filter[route]=${route}&&filter[date]=${today}`
                );
                setStops(result.data.data);
            }   
            catch(error) {
                console.error("Error fetching data:", error);
            }
        } 
        fetchData(selectedRoutes); // Fetch data for the selected route

        const interval = setInterval(fetchData, 300000); // 300000 ms = 5 minutes
        return () => clearInterval(interval); // Cleanup interval on component unmount
        }, [selectedRoutes]);

        return(
            <div style={realStyling}>
                {
                    <Dropdown style={realStyling}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic" 
                    style={buttonStyling}>
                        {selectedRoutes} Line
                    </Dropdown.Toggle>
    
                    <Dropdown.Menu
                    style={realStyling}>
                        <Dropdown.Item onClick={() => setSelectedRoutes("Blue")}
                            style={blueStyling}>Blue</Dropdown.Item>
                        <Dropdown.Item
                            onMouseEnter={() => setShowGreenSubmenu(true)}
                            onMouseLeave={() => setShowGreenSubmenu(false)}
                            style={greenStyling}
                        >
                            Green
                            {showGreenSubmenu && (
                                <Dropdown.Menu show style={realStyling}>
                                    <Dropdown.Item onClick={() => setSelectedRoutes("Green-B")} style={greenStyling}>Green-B</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedRoutes("Green-C")} style={greenStyling}>Green-C</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedRoutes("Green-D")} style={greenStyling}>Green-D</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedRoutes("Green-E")} style={greenStyling}>Green-E</Dropdown.Item>
                                </Dropdown.Menu>
                            )}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedRoutes("Red")} style={redStyling}>Red</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedRoutes("Orange")} style={orangeStyling}>Orange</Dropdown.Item>
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
                        style = {cardStyling}
                    >
                        <Card.Body style={realStyling}>
                            <Card.Title style={realStyling}>Line Arrival and Departure Times</Card.Title>
                            <Card.Text style={realStyling}>
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