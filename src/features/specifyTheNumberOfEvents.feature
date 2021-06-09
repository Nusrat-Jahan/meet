Feature: Specify number of events

  Scenario: When user hasn’t specified a number, 32 is the default number
    Given the page has fully loaded the events
    When the user loads the list of events without specifying number of events
    Then the user should see 32 events by default

  Scenario: User can change the number of events they want to see
    Given the page has fully loaded the events
    When the user inputs the number of events they want to see per page
    Then the user should see number of events as per user input