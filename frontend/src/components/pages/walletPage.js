import Box from 'react-bootstrap/Stack';
import React, { useState, } from 'react';

function wallet  (){
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState("");
    const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/tickets`;
    const userId = getUserInfo().id; // Assuming you have a way to get the user's ID

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`${url}/${userId}`);
                setTickets(response.data.tickets); // Adjust according to your API response structure
            } catch (error) {
                setError("Failed to fetch tickets. Please try again later.");
            }
        };
        fetchTickets();
    }, []);

    return (
    <Box>
        <div className="mx-2">
        <h4>hello</h4>
        </div>
    </Box>
    )
}
export default wallet;