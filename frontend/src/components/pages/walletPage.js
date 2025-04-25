import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from "../Ticket";
import getUserInfo from "../../utilities/decodeJwt";

const PRIMARY_COLOR = "#D6D6D6";
const SECONDARY_COLOR = '#404040';

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

    // Example options for dropdowns
    const lines = ['Red Line', 'Blue Line', 'Green Line', 'Orange Line', 'Purple Line'];
    const stations = ['Alewife', 'Davis', 'Porter', 'Harvard', 'Central', 'Kendall/MIT', 'South Station'];

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = getUserInfo(); // Assuming this decodes the JWT
            setUser(userInfo);
        };

        const fetchTickets = async () => {
            try {
                const response = await axios.get(`/api/tickets/${user.id}`);
                setTickets(response.data);
            } catch (err) {
                setError('Failed to fetch tickets. Please buy a ticket.');
            }
        };

        fetchUser();
        fetchTickets();
    }, [user.id]);

    const handleCreateTicket = async () => {
        try {
            const response = await axios.post('/api/tickets', {
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
        <div>
            <h3>Wallet</h3>
            {error && <p>{error}</p>}
            <button onClick={() => setShowPopup(true)}>Create New Ticket</button> {/* Button to open popup */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '20px' }}>
                {tickets.map((ticket) => (
                    <Ticket key={ticket.id} {...ticket} />
                ))}
            </div>

            {/* Popup for creating a new ticket */}
            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    zIndex: 1000
                }}>
                    <h4>Create New Ticket</h4>
                    <label>
                        Line:
                        <select
                            value={newTicket.line}
                            onChange={(e) => setNewTicket({ ...newTicket, line: e.target.value })}
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
                            onChange={(e) => setNewTicket({ ...newTicket, departure: e.target.value })}
                        >
                            <option value="" disabled>Select a departure station</option>
                            {stations.map((station) => (
                                <option key={station} value={station}>{station}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Arrival:
                        <select
                            value={newTicket.arrival}
                            onChange={(e) => setNewTicket({ ...newTicket, arrival: e.target.value })}
                        >
                            <option value="" disabled>Select an arrival station</option>
                            {stations.map((station) => (
                                <option key={station} value={station}>{station}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <button onClick={handleCreateTicket}>Submit</button>
                    <button onClick={() => setShowPopup(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Wallet;