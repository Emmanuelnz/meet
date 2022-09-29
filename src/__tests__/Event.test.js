import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let event, EventWrapper;
  beforeAll(() => {
    event = mockData[0];

    EventWrapper = shallow(<Event event={event} />);
  });

  test('render event item title', () => {
    expect(EventWrapper.find('.event-summary-title')).toHaveLength(1);
  });

  test('render correct event title', () => {
    expect(EventWrapper.find('.event-summary-title').text()).toBe(
      event.summary
    );
  });

  test('render event item info', () => {
    expect(EventWrapper.find('.event-info')).toHaveLength(1);
  });

  test('render correct event info', () => {
    expect(EventWrapper.find('.event-info').text()).toContain(
      event.start.dateTime
    );
    expect(EventWrapper.find('.event-info').text()).toContain(
      event.start.timeZone
    );
    expect(EventWrapper.find('.event-info').text()).toContain(event.location);
  });

  test('render event item details button', () => {
    expect(EventWrapper.find('.event-showDtls-btn')).toHaveLength(1);
  });

  test('render event collapsed by default', () => {
    expect(EventWrapper.state('show')).toBe(false);
  });

  test('render click to expand event details', () => {
    EventWrapper.setState({
      show: false
    });
    EventWrapper.find('.event-showDtls-btn').simulate('click');
    expect(EventWrapper.state('show')).toBe(true);
  });

  test('render click to collapse event details', () => {
    EventWrapper.setState({
      show: true
    });
    EventWrapper.find('.event-hideDtls-btn').simulate('click');
    expect(EventWrapper.state('show')).toBe(false);
  });

  test('if event is collapsed, then expand on click', () => {
    EventWrapper.setState({
      show: true
    });
    expect(EventWrapper.find('.event-description').text()).toContain(
      event.description
    );
    expect(EventWrapper.find('.event-hideDtls-btn')).toHaveLength(1);
  });

  test('if event is expanded, then collapse after click', () => {
    EventWrapper.setState({
      show: false
    });
    expect(EventWrapper.find('.event-description')).toHaveLength(0);
  });
  
});