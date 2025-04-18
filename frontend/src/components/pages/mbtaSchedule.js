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
    const [selectedStops, setSelectedStops] = useState("All");
    const [allStops, setAllStops] = useState([]); // State to store all stops for the selected route


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

    useEffect(() => {
        async function fetchData(route) {
            try {
                const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
                const stopFilter = selectedStops !== "All" ? `&filter[stop]=${selectedStops.id}` : "";
                const result = await axios(
                    `https://api-v3.mbta.com/schedules?filter[route]=${route}&filter[date]=${today}${stopFilter}&include=stop`
                );
                setStops(result.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData(selectedRoutes); // Fetch data for the selected route

        const interval = setInterval(() => fetchData(selectedRoutes), 300000); // Refresh every 5 minutes
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [selectedRoutes, selectedStops]);

    useEffect(() => {
        async function fetchStops(route) {
            try {
                const result = await axios(
                    `https://api-v3.mbta.com/stops?filter[route]=${route}`
                );
                setAllStops(result.data.data); // Store all stops for the selected route
            } catch (error) {
                console.error("Error fetching stops:", error);
            }
        }

        fetchStops(selectedRoutes); // Fetch stops whenever the selected route changes
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
                        <Dropdown>
                            <Dropdown.Menu show align = "end" style={realStyling}>
                                <Dropdown.Item onClick={() => setSelectedRoutes("Green-B")} style={greenStyling}>Green-B</Dropdown.Item>
                                <Dropdown.Item onClick={() => setSelectedRoutes("Green-C")} style={greenStyling}>Green-C</Dropdown.Item>
                                <Dropdown.Item onClick={() => setSelectedRoutes("Green-D")} style={greenStyling}>Green-D</Dropdown.Item>
                                <Dropdown.Item onClick={() => setSelectedRoutes("Green-E")} style={greenStyling}>Green-E</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        )}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedRoutes("Red")} style={redStyling}>Red</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedRoutes("Orange")} style={orangeStyling}>Orange</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            }
            {
            //Separate Dropdown for Stops
            <Dropdown>
                <Dropdown.Toggle align="end" variant="secondary" id="dropdown-basic">
                    {selectedStops === "All" ? "All Stops" : `Stop: ${selectedStops.attributes?.name}`}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSelectedStops("All")}>All Stops</Dropdown.Item>
                    {allStops.map(stop => (
                        <Dropdown.Item
                            key={stop.id}
                            onClick={() => setSelectedStops(stop)}
                        >
                            {stop.attributes.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            }

            {///<div style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0", borderRadius: "5px" }}>
                //<h3>API Call:</h3>
               //<p>
               ///{`https://api-v3.mbta.com/schedules?filter[route]=${selectedRoutes}&filter[date]=${new Date().toISOString().split("T")[0]}${selectedStops !== "All" ? `&filter[stop]=${selectedStops}` : ""}&include=stop`}
                //</p>
            //</div>
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