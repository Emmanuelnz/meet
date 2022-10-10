Feature: Show/Hide an event's details

# Scenario 1
Scenario: An element is collapsed by default
Given Main page was opened
When User views featured city
Then The current events from the city are collapsed

# Scenario 2
Scenario: User can expand an event to see its details
Given User clicks on events button
When User selects specific event
Then Event's details are displayed

# Scenario 3
Scenario: User can collapse an event to hide its details
Given The event's details are being viewed
When User closes/collapses event's details
Then Event's details are hidden