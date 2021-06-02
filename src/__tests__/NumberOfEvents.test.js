import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
    <NumberOfEvents updateEvents={() => { }} />);
  });

  test("render of number of events", () => {
    expect(NumberOfEventsWrapper).toHaveLength(1);
  });

  test("change state when the number of events changes", () => {
    NumberOfEventsWrapper.setState({
      numberOfEvents: 1,
    });
    const eventObject = { target: { value: 2 } };
    NumberOfEventsWrapper.find(".NumberOfEvents input").simulate(
      "change",
      eventObject
    );
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(2);
  });
});