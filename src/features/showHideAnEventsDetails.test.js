import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
// Scenario 1
  test('An element is collapsed by default', ({ given, when, then }) => {
    given('Main page was opened', () => {

    });
    let AppWrapper;
    when('User views featured city', () => {
      AppWrapper = mount(<App />);
    });

    then('The current events from the city are collapsed', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
    });
  });

// Scenario 2
  test('User can expand an event to see its details', ({ given, when, then }) => {
    let AppWrapper;
    given('User clicks on events button', () => {
      AppWrapper = mount (<App />)
    });

    when('User selects specific event', () => {
      AppWrapper.update();
      AppWrapper.find('.event .event-showDtls-btn').at(0).simulate('click');
    });

    then('Event\'s details are displayed', () => {
      expect(AppWrapper.find('.event .event-about-title')).toHaveLength(1);
    });
  });
  
// Scenario 3
  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let AppWrapper;
    given('The event\'s details are being viewed', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.event .event-showDtls-btn').at(0).simulate('click');
    });

    when('User closes/collapses event\'s details', () => {
      AppWrapper.update();
      AppWrapper.find('.event .event-hideDtls-btn').at(0).simulate('click');
    });

    then('Event\'s details are hidden', () => {
      expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
    });
  });

});