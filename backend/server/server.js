const express = require("express");
const app = express();
const cors = require('cors');
const loginRoute = require('./routes/userLogin');
const getAllUsersRoute = require('./routes/userGetAllUsers');
const registerRoute = require('./routes/userSignUp');
const getUserByIdRoute = require('./routes/userGetUserById');
const dbConnection = require('./config/db.config');
const editUser = require('./routes/userEditUser');
const deleteUser = require('./routes/userDeleteAll');
const ticketsRoutes = require('./routes/ticketsRoutes'); // Import the tickets routes
const createTicket = require('./routes/createTicket'); // Import the route
const deleteTicket = require('./routes/deleteTicket'); // Import the delete ticket route

require('dotenv').config();
const SERVER_PORT = 8096;

dbConnection();
app.use(cors({ origin: '*' }));
app.use(express.json());

// User-related routes
app.use('/user', loginRoute);
app.use('/user', registerRoute);
app.use('/user', getAllUsersRoute);
app.use('/user', getUserByIdRoute);
app.use('/user', editUser);
app.use('/user', deleteUser);

// Ticket-related routes
app.use('/Ticket', createTicket); // Add the tickets routes
app.use('/Ticket', deleteTicket); // Add the delete ticket route
app.use('/Ticket', ticketsRoutes); // Add the get all tickets routes

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
});