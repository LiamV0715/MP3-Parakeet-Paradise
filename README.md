# Parakeet Paradise
## Description
Parakeet Paradise is an interactive, parakeet-themed web game where players can compete in mini-games like surfing and fishing. Players can track their progress on dynamic leaderboards and customize their bird characters. Whether you’re competing for the biggest fish or pulling off the best surfing tricks, this game brings a fun, colorful experience for all ages.

---

## Inspiration
I wanted to make a framework to which I can keep adding minigames, and start my own browser game website from the code here! Now, with Parakeet Paradise in hand, I can add any game ideas to the list of buttons on the main menu, while tracking the running player records through what I already know about database management.

### Yeah, but why parakeets?
Growing up, I had both cats and some parakeets, and I think cats are becoming overdone in my project history.

---

## How to Use
### Running Your Own Instance
To run the project on your machine, git clone the repository down to your coding folder. Then, open two seperate terminals on the cloned repository and run: "cd backend" and "cd frontend" in each terminal respectively. Run "npm init -y" followed by "npm install --legacy-peer-deps" in each the frontend and backend terminal to install the two node module packages.

---

### Sign Up / Log In:
The website should always open to the login/register route when new users open the URL. Logging in allows you to set a username and password, track your high scores and pick your parakeet color! Once registered or logged in, users are redirected to the main menu.

### Main Menu

From the main menu, you can:
#### Go Surfing!: 
Play the surfing mini-game, where your parakeet catches waves and racks up points based on coins collected, obstacles avoided and flips performed at the ending "trick opportunity"!
#### Go Fishing!: 
Play the fishing mini-game, where you must act quick to catch a big one! Fish weight varies randomly on a bell curve, and different weights give different catches.
#### Scoreboards: 
View your standings on three leaderboards:
1. All Around Parakeet Crown (combined surfing and fishing scores)
2. Biggest Fish (highest fish weight caught)
3. Best Shred (highest surfing score)

---

## Technologies Used
### Front End:

React with JSX for the user interface and routing (react-router-dom v6)
SCSS for styling and animations
Axios for API calls to communicate with the back end
Webpack for module bundling

### Back End:

Node.js with Express for the server
Mongoose for MongoDB integration
Passport-JWT for user authentication
CORS to enable secure cross-origin requests
### Database:

MongoDB Atlas with Mongoose ORM to store users, surfing, and fishing scores in separate collections
JWT for secure token-based authentication

---

## Bugs and Unfinished Features
Immediate Fish Spawning in Fishing Game: After restarting the fishing mini-game, there's a chance that the fish appears instantly, which goes from funny to frustrating when it happens consecutively.
Leaderboard Crowns/Portrait: Addin a crown to the conditionally rendered scoreboards proved more time consuming then expected, let alone making/positioning the correct bird color as a portrait.
Persistent User Session: The user is indefinetely logged in. It may be better to make the token expire after a set time to decrease risk of overloading the database.
Responsive Design: Some UI elements may not scale properly on smaller screens. The first post-deployment updates will focus on making the game fully responsive, especially the menu bird and background videos.
