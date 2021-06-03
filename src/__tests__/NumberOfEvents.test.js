import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents />);
  });

  test("render of number of events", () => {
    expect(NumberOfEventsWrapper).toHaveLength(1);
  });

  test('check input default value is equal to 32', () => {
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(32);
  });

  test('check input value is between to 32', () => {
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(32);
  });

  test("change state when the number of events changes", () => {
    NumberOfEventsWrapper.setState({
      numberOfEvents: 4,
    });
    const eventObject = { target: { value: 8 } };
    NumberOfEventsWrapper.find(".NumberOfEvents input").simulate(
      "change",
      eventObject
    );
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(8);
  });
});