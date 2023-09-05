const MindsDB = require("mindsdb-js-sdk").default;
const logger = require("../logger");
const lb = require("./loadbalancer");

const Destinations = [
  process.env.OPENAI_DESTINATION_MODEL1,
  process.env.OPENAI_DESTINATION_MODEL2,
  process.env.OPENAI_DESTINATION_MODEL3,
  process.env.OPENAI_DESTINATION_MODEL4,
];

const Itinerary = [
  process.env.OPENAI_ITINERARY_MODEL1,
  process.env.OPENAI_ITINERARY_MODEL2,
  process.env.OPENAI_ITINERARY_MODEL3,
  process.env.OPENAI_ITINERARY_MODEL4,
];
const Accommodation = [
  process.env.OPENAI_ACCOMODATION_MODEL1,
  process.env.OPENAI_ACCOMODATION_MODEL2,
  process.env.OPENAI_ACCOMODATION_MODEL3,
  process.env.OPENAI_ACCOMODATION_MODEL4,
];

const Cuisines = [
  process.env.OPENAI_CUISINE_MODEL1,
  process.env.OPENAI_CUISINE_MODEL2,
  process.env.OPENAI_CUISINE_MODEL3,
  process.env.OPENAI_CUISINE_MODEL4,
];
const Spots = [
  process.env.OPENAI_ATTRACTIONS_MODEL1,
  process.env.OPENAI_ATTRACTIONS_MODEL2,
  process.env.OPENAI_ATTRACTIONS_MODEL3,
  process.env.OPENAI_ATTRACTIONS_MODEL4,
];

let destinationModelName;
let itineraryModelName;
let accomodationModelName;
let exploreModelName;
let output;


async function connectToMindsDB() {
  try {
    await MindsDB.connect({
      user: process.env.MINDSDB_USERNAME,
      password: process.env.MINDSDB_PASSWORD,
    });
    logger.info("Connected to MindsDB Cloud");
  } catch (error) {
    logger.error("Error connecting to MindsDB Cloud:", error);
    throw error;
  }
}

async function curateDestination(inputCountry, inputInterest, inputSeason, inputBudget) {
  let retries = 3; // Maximum number of retries
  destinationModelName= await lb.getRandomOption(Destinations);
  while (retries > 0) {
    try {
      const escapedCountry = inputCountry.replace(/"/g, "");
      const text = `SELECT destination FROM ${destinationModelName} where country="${escapedCountry}" AND interests="${inputInterest}" AND travel_dates="${inputSeason}" AND budget="${inputBudget}"`;
      const destinationResponse = await MindsDB.SQL.runQuery(text);
      if (!destinationResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return (destinationResponse);
    } catch (error) {
      logger.error("Error curating destination:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function generateItinerary(inputDestination,inputDuration) {
  let retries = 3; // Maximum number of retries
  itineraryModelName= await lb.getRandomOption(Itinerary);
  while (retries > 0) {
    try {
      const escapedDestination = inputDestination.replace(/"/g, "");
      const text = `SELECT itinerary FROM ${itineraryModelName} where destination="${escapedDestination}" AND duration="${inputDuration}"`;
      const itineraryResponse = await MindsDB.SQL.runQuery(text);
      if (!itineraryResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return (itineraryResponse);
    } catch (error) {
      logger.error("Error generating Itinerary:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function selectAccomodation(inputDestination,inputType) {
  let retries = 3; // Maximum number of retries
  accomodationModelName= await lb.getRandomOption(Accommodation);
  while (retries > 0) {
    try {
      const escapedDestination = inputDestination.replace(/"/g, "");
      const text = `SELECT hotel FROM ${accomodationModelName} where destination="${escapedDestination}" AND type="${inputType}"`;
      const accomodationResponse = await MindsDB.SQL.runQuery(text);
      if (!accomodationResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return (accomodationResponse);
    } catch (error) {
      logger.error("Error finding the best accomodations:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function exploreOptions(inputDestination,choice) {
  let retries = 3; // Maximum number of retries

  if (choice === "cuisines") {
    exploreModelName = await lb.getRandomOption(Cuisines);
    output="cuisine";
  } else if (choice === "attractions") {
    exploreModelName = await lb.getRandomOption(Spots);
    output="spot";
  }

  while (retries > 0) {
    try {
      const escapedDestination = inputDestination.replace(/"/g, "");
      const text = `SELECT ${output} FROM ${exploreModelName} where destination="${escapedDestination}"`;
      const exploreResponse = await MindsDB.SQL.runQuery(text);
      if (!exploreResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return (exploreResponse);
    } catch (error) {
      logger.error("Error exploring the best options:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

module.exports = {
    connectToMindsDB,
    curateDestination,
    generateItinerary,
    selectAccomodation,
    exploreOptions
  };