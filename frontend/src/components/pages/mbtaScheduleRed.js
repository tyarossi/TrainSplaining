import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function RedStops(){
    const [Stops, setStops] = useState([]);

    useEffect(()=> { 
        async function fetchData() {
            const result = await axios('https://api-v3.mbta.com/schedules?filter[route]=Red',);
            setStops(result.data.data);
        }
        fetchData();

        const interval = setInterval(fetchData, 300000); // 300000 ms = 5 minutes
        return () => clearInterval(interval); // Cleanup interval on component unmount
        }, []);

        return(
            <div>
                {Stops.map(stop =>(
                    <Card
                        body
                        outline
                        color = "success"
                        className ="mx-1 my-2"
                        style = {{width: "35rem"}}
                    >
                        <Card.Body>
                            <Card.Title>Red Line Arrival and Departure Times</Card.Title>
                            <Card.Text>{stop.attributes.arrival_time}<br/>{stop.attributes.departure_time}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}

                <h1>Stops</h1>
                {Stops.map(stop => (
                    <div key ={stop.id}>
                        <h3>{stop.attributes.drop_off_type}</h3>
                        <p>{stop.attributes.stop_sequence}</p>
                    </div>
                ))}
            </div>
        )
    
    }
export default RedStops;