# Mravel: AI Travel Assistant

**Introducing Mravel!**

**MindsDB + Travel => MRAVEL**

Mravel is an AI-powered Travel Assistant that helps you explore destinations, find the best cuisines, discover attractions, plan itineraries, and even suggest accommodations. This repository houses the codebase for the Mravel application, which is built using JavaScript and integrates with MindsDB which powers all the underlying Machine Learning models.

![Mravel Cover](https://github.com/Rutam21/Mravel/assets/47860497/9fee87de-de7f-4c39-8ed1-1497a8c2b689)

## Features

Mravel comes with a range of features to enhance your travel planning and exploration experience:

### 1. Explore Destinations
Use Mravel to discover exciting travel destinations based on your preferences. Input criteria such as country, interest, season, and budget to get personalized destination recommendations.

### 2. Best Cuisines
Looking for the most delicious local cuisines? Mravel can recommend the best cuisines for your chosen destination. Just input the destination, and Mravel will guide you to the most mouthwatering dishes.

### 3. Top Attractions
Explore the top attractions of a location effortlessly. Mravel provides information about the must-visit spots and landmarks in your chosen destination.

### 4. Itinerary Planning
Planning an itinerary has never been easier. Mravel assists you in creating a well-structured itinerary for your trip, suggesting activities and attractions based on your preferences.

### 5. Accommodation Recommendations
Find the perfect place to stay during your travels. Mravel suggests accommodation options that match your destination and lodging preferences.

### 6. PDF Generation
Mravel allows you to generate PDF documents containing the information you need for your travel plans. This feature comes in handy when you want to have a tangible reference during your trip.

## Getting Started

Follow these steps to get started with the Mravel AI Travel Assistant:

**Clone the Repository:** Fork the Mravel repository and then clone it to your local machine using the following command:

```bash
git clone https://github.com/your-username/mravel.git
```

**Install Dependencies:** Navigate to the project directory and install the necessary dependencies:

```bash
cd mravel
npm install
```

**Set up Environment Variables:** Create a .env file in the Mravel base directory. Add the following variables:

```bash
MINDSDB_USERNAME="YOUR_MINDSDB_USERNAME"
MINDSDB_PASSWORD="YOUR_MINDSDB_PASSWORD"
OPENAI_DESTINATION_MODEL="MODEL NAME FOR THE DESTINATION PICKER"
OPENAI_ITINERARY_MODEL="MODEL NAME FOR THE ITINERARY PICKER"
OPENAI_ACCOMODATION_MODEL="MODEL NAME FOR THE ACCOMMODATION PICKER"
OPENAI_CUISINE_MODEL="MODEL NAME FOR THE CUISINE PICKER"
OPENAI_ATTRACTIONS_MODEL="MODEL NAME FOR THE ATTRACTIONS PICKER"
```

**Run the Application:** Start the Mravel application by running the development server:

```bash
npm start
```

The application will be accessible at http://localhost:3000.

Explore Features: Interact with the Mravel AI Travel Assistant through the user interface. Enter criteria, click buttons, and explore various features.

## Deployment
The Live App is accessible at https://mravel.co/.

