Feature: Specify number of events

# Scenario 1
Scenario: When the user has not specified a number, 30 is the default number
Given User searches for events in city
When User doesn't specify number of events
Then Default number of events returned/displayed is 30

# Scenario 2
Scenario: User can change the number of events they want to see
Given User opens search results
When User specifies number of events they want displayed/returned
Then The specific number of events returned/displayed is changed to the user's preference