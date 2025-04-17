import Box from 'react-bootstrap/Stack';
import getUserInfo from "../../utilities/decodeJwt";
import React, { useState, useEffect } from 'react';
import Ticket from "../Ticket";


const PRIMARY_COLOR = "#D6D6D6";
const SECONDARY_COLOR = '#404040';
const BUTTON_COLOR = '#80276C';

const Wallet = () => {
    const [user, setUser] = useState({})
    const [bgColor, setBgColor] = useState(SECONDARY_COLOR);
    const [bgText, setBgText] = useState(PRIMARY_COLOR);

    const ticketCount = 2; // You can change this dynamically
    const tickets = Array.from({ length: ticketCount });

      
    const gridstyle = {
        display: 'grid',gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        padding: '20px',}


    let testStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
    background: bgColor,
    };
    
    let backgroundStyling = { background: bgColor };
    


    useEffect(() => {
    const obj = getUserInfo();
    setUser(obj);
    setBgColor(SECONDARY_COLOR);
    setBgText(PRIMARY_COLOR);
    }, []);


    if (!user) return (<div><h4>Log in to view this page.</h4></div>)
    
    // const [tickets, setTickets] = useState([]);
    // const [error, setError] = useState("");
    // const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/tickets`;
    // const userId = getUserInfo().id; // Assuming you have a way to get the user's ID

    // useEffect(() => {
    //     const fetchTickets = async () => {
    //         try {
    //             const response = await axios.get(`${url}/${userId}`);
    //             setTickets(response.data.tickets); // Adjust according to your API response structure
    //         } catch (error) {
    //             setError("Failed to fetch tickets. Please try again later.");
    //         }
    //     };
    //     fetchTickets();
    // }, []);

    return (
        <>
            <section className="vh-100" style={testStyling}>
                <div class="container"
                style={backgroundStyling}>
                
                    <div class="col-md-12 text-center" style={testStyling}>
                    <h3>Wallet</h3>
                    <div class="col-sm-12 text-left">
                        <h6>Username: {user.username}</h6>
                        <h6>Email: {user.email}</h6>
                    </div>
                    </div>
                    <div className="mx-2">
                        <h4>hello</h4>
                    </div>
                    <div style={gridstyle} display="flex" flexDirection="row" justifyContent="space-around" alignItems="center"   >
                    {tickets.map((_, index) => (
          <Ticket key={index} />
        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
export default Wallet;