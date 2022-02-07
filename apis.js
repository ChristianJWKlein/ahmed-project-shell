/**
 * Key components of an API
 *   1. Request (provided by the client/user)
 *      - types of requests can be: GET, POST, PUT... etc.
 *   2. Response (provided by the backend)
 *      - always returns a response code: 200s are successful
 *      - 400s failed due to client error
 *      - 500s failed due to server error
 */

// Importing the database file
const databaseHandler = require("./databases");

// Importing the Express package (aka module/library/framework)
const express = require("express");

// Initialize Express
const api = express();
const port = 3000;

/***
Connect to Firestore
Create API points to:
Read a whole collection
Read a single doc
Add a doc to a collection
Update a doc
 */

// Call the GET method to handle GET API requests
// Specify in a string, the endpoint of the API.
// An endpoint is the path of the URL that allows us to access the API
api.get("/users", async function (request, response) {
  const users = await databaseHandler.readUserDocuments();
  response.send(users);
});

// Listen to the API port
api.listen(port, function () {
  console.log(`API is now connected and listening at port: ${port}`);
});
