# Slaydle

A wordle version of the beloved card game, Slay the Spire. Given hints through-out each guess, try to find what the card of the day is with the least amount of guesses.

## Structure

This project was made using the NextJS framework, it fetches the current time by using the free time api, [timeapi.io](https://timeapi.io/), and then uses the date (mm/dd/yy) as a seed to an RNG to get the next daily card.

Just like Wordle, it saves user data in local storage, which consists of the user's guesses, the time difference from their location and the location fetched from the API, and if they have already figured out what the daily card is.

## Packages Used

- downshift - for making an accessible combo-box to help users input their guesses.
- tailwindcss - A quick way to add styles to your application.
- react-flip-toolkit - used to animate the list of guesses.
- seedrandom - the RNG used to pick out the card of the day.