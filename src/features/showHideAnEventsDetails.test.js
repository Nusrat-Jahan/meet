import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import App from "../App";
import { mockData } from '../mock-data';
import Event from "../Event";
import EventList from "../EventList";
import { extractLocations } from "../api";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");


defineFeature(feature, test => {
  let EventWrapper;
  let EventListWrapper;
  let AppWrapper;

  test('An event element is collapsed by default.', ({ given, when, then }) => {
    given('the page has fully loaded the events', () => {
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);

    });

    when('the user looks at the main screen', () => {
      AppWrapper = mount(<App />);
    });

    then('the user sees events with the "Title", "Date", "Location", and "Show Details" displayed', () => {
      AppWrapper.update();
      expect(AppWrapper.find(".eventDetails")).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details.', ({ given, when, then }) => {
    given('the user wants to show all the event information', () => {
      AppWrapper = mount(<App />);
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);
    });

    when('the user clicks on "Show Details"', () => {
      EventWrapper.find(".show-hide-btn").simulate("click");
    });

    then('the event unfolds to show Title, Date, Location, link to "See Details on Google Calendar" and Description', () => {
      expect(EventWrapper.find(".event-details")).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details.', ({ given, and, when, then }) => {
    given('the user wants to hide the event information', () => {
      AppWrapper = mount(<App />);
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);
      EventWrapper.find(".show-hide-btn").simulate("click");
    });

    and('all the event information is displayed', () => {
      AppWrapper = mount(<App />);
    });

    when('the user selects "Hide Details"', () => {
      EventWrapper.find(".show-hide-btn").simulate("click");
    });

    then('the event collapses', () => {
      expect(EventWrapper.find(".event-details")).toHaveLength(0);
    });
  });

});