require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mindsdb = require("./api/mindsdb");
const logger = require("./logger");

const app = express();

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the static files in public directory
app.use(express.static("public"));

// Connect to MindsDB and start the server when connection is established
mindsdb
  .connectToMindsDB()
  .then(() => {
    app.listen(3000, () => {
      logger.info("Server listening on port 3000");
    });
  })
  .catch((err) => {
    logger.error("Error connecting to MindsDB: ", err);
  });

// Route for the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/destinations", async (req, res) => {
  const inputCountry = req.body.inputCountry;
  const inputInterest = req.body.inputInterest;
  const inputSeason = req.body.inputSeason;
  const inputBudget = req.body.inputBudget;

  try {
    // Call a function from mindsdb.js
    const destination = await mindsdb.curateDestination(
      inputCountry,
      inputInterest,
      inputSeason,
      inputBudget
    );
    res.status(200).send(destination);
  } catch (error) {
    logger.error("Error curating destinations: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while curating destinations." });
  }
});

app.post("/itinerary", async (req, res) => {
  const inputDestination = req.body.inputDestination;
  const inputDuration = req.body.inputDuration;

  try {
    // Call a function from mindsdb.js
    const itinerary = await mindsdb.generateItinerary(
      inputDestination,
      inputDuration
    );
    res.status(200).send(itinerary);
  } catch (error) {
    logger.error("Error generating Itinerary: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while generating Itinerary." });
  }
});

app.post("/accomodation", async (req, res) => {
  const inputDestination = req.body.inputDestination;
  const inputType = req.body.inputType;

  try {
    // Call a function from mindsdb.js
    const accomodation = await mindsdb.selectAccomodation(
      inputDestination,
      inputType
    );
    res.status(200).send(accomodation);
  } catch (error) {
    logger.error("Error finding the best accomodation: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while finding the best accomodation." });
  }
});

app.post("/explore", async (req, res) => {
  const inputDestination = req.body.inputDestination;
  const choice = req.body.selectedChoice;

  try {
    // Call a function from mindsdb.js
    const exploration = await mindsdb.exploreOptions(
      inputDestination,
      choice
    );
    res.status(200).send(exploration);
  } catch (error) {
    logger.error("Error exploring the best options: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while exploring the best options." });
  }
});

