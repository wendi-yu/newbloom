// Import the express module
import express from 'express';
import { router } from '#routes/router';
import { loginRouter } from '#routes/loginRouter';
import { isAuthorized } from '#middleware/auth';
// Create an instance of the express application
const app = express();

// parse request bodies as JSON
app.use(express.json());

// These routes won't be checked for auth
app.use('/', loginRouter);
// Attach auth guard - all attached routes after this will require auth
app.use(isAuthorized);
// Attach the router
app.use('/', router);
// Specify a port number for the server
const port = 3000;
// Start the server and listen to the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});