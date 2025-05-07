import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from "../Ticket";
import getUserInfo from "../../utilities/decodeJwt";

const PRIMARY_COLOR = "#D6D6D6";
const SECONDARY_COLOR = '#404040';
const BUTTON_COLOR = '#80276C';


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
let cardStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
    background: SECONDARY_COLOR,
    width: "35rem",
};

const Wallet = () => {
    const [user, setUser] = useState({});
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
    const [newTicket, setNewTicket] = useState({
        line: '',
        departure: '',
        arrival: '',
    });
    const [selectedRoutes, setSelectedRoutes] = useState("Blue");
    const [allStops, setAllStops] = useState([]);

    // Example options for dropdowns
    const [lines, setLines] = useState(['Red', 'Blue', 'Green-B', 'Green-C', 'Green-D', 'Green-E', 'Orange']);

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = getUserInfo(); // Assuming this decodes the JWT
            setUser(userInfo);
        };

        const fetchTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:8096/Ticket/tickets/${user.id}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch tickets, please create a ticket first');
                }
                setTickets(response.data);
            } catch (err) {
                setError('');
            }
        };

        fetchUser();
        fetchTickets();
    }, [user.id]);

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

    const handleCreateTicket = async () => {
        try {
            const response = await axios.post(`http://localhost:8096/Ticket/createTickets`, {
                userId: user.id,
                ...newTicket
            });
            setTickets([...tickets, response.data]); // Add the new ticket to the list
            setShowPopup(false); // Close the popup
            setNewTicket({ line: '', departure: '', arrival: '',}); // Reset the form
        } catch (err) {
            alert('Failed to create ticket.');
        }
    };

    if (!user) {
        return <div><h4>Log in to view this page.</h4></div>;
    }

    return (
        <div style={realStyling}>
            <h3>Wallet</h3>
            <h4 style={realStyling}>Welcome, {user.username}:{user.id}</h4>
            {error && <p>{error}</p>}
            <button onClick={() => setShowPopup(true)} style={realStyling}>Create New Ticket</button> {/* Button to open popup */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '20px' }}>
                {tickets.map((ticket) => (
                    <Ticket key={ticket.id} {...ticket} />
                ))}
            </div>

            {/* Popup for creating a new ticket */}
            {showPopup && (
                <div style={{
                    color: PRIMARY_COLOR,
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: SECONDARY_COLOR,
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    zIndex: 1000
                }}>
                    <h4 style={realStyling}>Create New Ticket</h4>
                    <label style={realStyling}>
                        Line:
                        <select
                            value={newTicket.line}
                            style={realStyling}
                            onChange={(e) => {
                                setNewTicket({ ...newTicket, line: e.target.value });
                                setSelectedRoutes(e.target.value);
                            }}
                        >
                            <option value="" disabled>Select a line</option>
                            {lines.map((line) => (
                                <option key={line} value={line}>{line}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Departure:
                        <select
                            value={newTicket.departure}
                            style={realStyling}
                            onChange={(e) => setNewTicket({ ...newTicket, departure: e.target.value })}
                        >
                            <option value="" disabled>Select a departure station</option>
                            {allStops.map((stop) => (
                                <option key={stop.id} value={stop.attributes.name}>{stop.attributes.name}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Arrival:
                        <select
                            value={newTicket.arrival}
                            style={realStyling}
                            onChange={(e) => setNewTicket({ ...newTicket, arrival: e.target.value })}
                        >
                            <option value="" disabled>Select an arrival station</option>
                            {allStops.map((stop) => (
                                <option key={stop.id} value={stop.attributes.name}>{stop.attributes.name}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <button style={{ marginRight: '150px' }} onClick={handleCreateTicket}>Submit</button>
                    <button onClick={() => setShowPopup(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};


export default Wallet;