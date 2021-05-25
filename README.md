# Meet App
![Meet App]()

## Project Objective:

To build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. This application uses the Google Calendar API to fetch upcoming events.

## Features & Requirements:
## Key Features and User stories
### Feature 1: Filter events by city
### User story
* As a user
* I should be able to “filter events by city”
* So that I can see the list of events that take place in that city
### Scenarios
#### Scenario 1: When the user hasn’t searched for a city, show upcoming events from all cities.
* Given the user hasn’t searched for any city
* When the user opens the app
* Then the user should see a list of all upcoming events
#### Scenario 2: User should see a list of suggestions when they search for a city.
* Given the main page is open
* When the user starts typing in the city textbox
* Then the user should see a list of city suggestions that match what they’ve typed.

#### Scenario 3: User can select a city from the suggested list.
* Given the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
* When the user selects a city (e.g. “Berlin, Germany”) from the list
* Then their city should be changed to that city (i.e. “Berlin, Germany”) and the user should receive a list of upcoming events in that city.




## Technical requirements:

* The application may be hosted online - [Visit MyFlix](https://myflix-movie-app.netlify.app/)

## How to Run

To run this project locally, run the following command, then navigate to the localhost port stated in your terminal.

```
parcel src/index.html
```