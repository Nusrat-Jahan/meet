import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount, shallow } from "enzyme";
import App from "../App";
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature("./src/features/specifyTheNumberOfEvents.feature");

defineFeature(feature, (test) => {

  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    let Appwrapper;
    let NumberOfEventsWrapper;
    given('the page has fully loaded the events', () => {
      Appwrapper = mount(<App />);
    });

    when('the user loads the list of events without specifying number of events', () => {
      NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
    });

    then('the user should see 32 events by default', () => {
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;
    let NumberOfEventsWrapper;
    given('the page has fully loaded the events', () => {
      AppWrapper = mount(<App />);
    });

    when('the user inputs the number of events they want to see per page', () => {
      const numberOfEvents = {
        target: { value: 10 },
      };
      AppWrapper.find(".NumberOfEvents input").simulate("change", numberOfEvents);
    });

    then('the user should see number of events as per user input', () => {
      NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(10);
    });
  });

});