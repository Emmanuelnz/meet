import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

  test('render number input', () => {
    expect(NumberOfEventsWrapper.find('.event-number')).toHaveLength(1);
  });

  test('render default number is 30', () => {
    expect(NumberOfEventsWrapper.find('.event-number').prop('value')).toBe(30);
  });

  test('render change the number of events', () => {
    NumberOfEventsWrapper.setState({
      numberOfEvents: 30
    });
    const Event = { target: { value: 6 } };
    NumberOfEventsWrapper.find('.event-number').simulate('change', Event);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(6);
  });

});