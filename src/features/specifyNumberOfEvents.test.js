import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
// Scenario 1
  test('When the user has not specified a number, 30 is the default number', ({ given, when, then }) => {
    given('User searches for events in city', () => {
       
    });
    let AppWrapper;
    when('User doesn\'t specify number of events', () => {
      AppWrapper = mount(<App />);
    });

    then('Default number of events returned/displayed is 30', () => {
      AppWrapper.update();
      expect(AppWrapper.state('numberOfEvents')).toEqual(30);
    });
  });

// Scenario 2
  test('User can change the number of events they want to see', ({ given, when, then }) => {
    given('User opens search results', async () => {
      AppWrapper = await mount(<App />);
    });
    let AppWrapper;
    when('User specifies number of events they want displayed/returned', () => {
      AppWrapper.update();
      AppWrapper.find('.numberOfEvents').simulate('change', { target: 1 });
    });

    then('The specific number of events returned/displayed is changed to the user\'s preference', () => {
      expect(AppWrapper.find('.EventList')).toHaveLength(1);
    });
  });

});