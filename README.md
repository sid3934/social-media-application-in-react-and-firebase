# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Very thankful to [Pedro](https://www.youtube.com/watch?v=f55qeKGgB_M&list=PPSV&ab_channel=PedroTech) whose teaching of React made this project possible.

### Brief write up on the file structure
The components folder contains the navigation bar JS and CSS files.

Config filder contains the code for Firebase including authorisation and connection with the Firebase DB.

Pages folder has 2 sub folders: create-post & main and a login page.

Login page has login component that redirects to the main page. 

main folder has a main JS file that returns a Post component with props. main folder has another js file for post that has the code for everything appearing on the social media post.

create-post folder contains a createPost js file that returns a component called createForm exported from create-form JS file. It has code to create a social media post.
