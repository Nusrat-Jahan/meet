Feature: Show and hide event details

Scenario: An event element is collapsed by default.
Given the page has fully loaded the events
When the user looks at the main screen
Then the user sees events with the "Title", "Date", "Location", and "Show Details" displayed

Scenario: User can expand an event to see its details.
Given the user wants to show all the event information
When the user clicks on "Show Details"
Then the event unfolds to show Title, Date, Location, link to "See Details on Google Calendar" and Description

Scenario:  User can collapse an event to hide its details.
Given the user wants to hide the event information
And all the event information is displayed
When the user selects "Hide Details"
Then the event collapses