# cushon-test

This work is still in progress and changes/improvements may occur before the interview!

## Installation

Ensure you have node 20+ installed!

### Frontend

cd ./frontend

npm install

### Backend

cd ./backend

npm install


## Running

Both the frontend and backend need to be running in order for the application to work. See below instructions

### Frontend

make sure you are in directory: ./frontend

npm run dev (check logs to see port used. Should be http://localhost:5173)

### Backend

make sure you are in directory: ./backend

node server.js (should be running on localhost:5000)


## Testing

npm run test (tests written in vitest which is very similar to Jest and react-testing-library)

npm run cy:open (using Cypress. This will install Cypress first time if you dont already have it)


## Tech stack

React 18
Typescript
Vite
react-query
react-testing-library
Cypress
MUI

## Notes and possible improvements

I will be suggesting possible designs for meeting future scenarios during the interview via this link: https://www.figma.com/design/TpwMztXg4bI7ZuWdiKEs3S/Cushon?node-id=0-1&node-type=canvas&t=194a1EPPmJVx3okA-0

I will discuss the below during the interview. Having said that, I did wish to spend more time on the task but came across issues during testing which were taking up too much time so took mitigating action. For example, I used Cypress to cover test cases where it would have been possible using RTL but had issues with certain mocks. 

• What you have done and why.
• The specific decisions you made about your solution.
• Any assumptions you have made in the solution you have presented.
• Any enhancements you considered but decided not to cover.