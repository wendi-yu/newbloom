// Import the express module
import express from 'express';
import { router } from '#routes/router.js';
// Create an instance of the express application
const app = express();
// Attach the router
app.use('/', router)
// Specify a port number for the server
const port = 3000;
// Start the server and listen to the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});