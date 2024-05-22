# Milestone 2 - Class Questions

This workspace contains a NextJS application - a framework for building web applications easily with Javascript.

`pages/` - contains all the pages of your application as React components, making use of the Page Router feature from NextJS.

`pages/api/` - contains all the backend code for your application, including your authentication (or how your users sign in) and where you can store your data.

Most of the styling and layouts have been taken care of already using Bulma CSS. But some criticial functionality has not yet been implemented...

## Getting Started

### Initialize your dev environment

```
npm install
npm run dev
```

This will launch a web server running on `https://localhost:3000`

Important files:
* `pages/api/*` - this folder will contain the code for your API routes
* Within each endpoint is a description of what that endpoint is supposed to do, and how it should behave.
* `tests/*.test.mjs` contain integration tests that test the behavior of each API to confirm it matches the description.
* `tests/database.test.mjs` contains unit tests for the `services/database.mjs` module which should store the provided data and then return it.

## 1. Adding Core Functionality

Start by setting up the core bits of the application
* Navigation and Pages
* Authentication

### 1a. Navigation
Search for `CS5356 TODO 1a` to see the tasks

Important files:
* `components/` contains smaller components that are included in Pages
* `pages/_app.js` contains the root HTML page where Bulma and other CSS can be installed. All your pages will appear as child elements of this root HTML page.
* `pages/` contains all the various Pages used in the app

The app should have 3 separate pages
* `/` - containing the landing page, provided for you
* `/app/home` - containing the page the Instructor sees to manage class codes
* `/app/[classId]` - containing the page that users can see to use questions

**Landing Page** : The landing page shouldn't need any edits.
**Instructor Home Page**: This is where you'll be able to create a class code and view codes that you have created.
**Class Home Page**: This is where all users (signed-in and anonymous) can create and view questions.

Note - Each of these pages requires making API calls to your backend to save data from forms. Its helpful to get started on the pages though right until you have to implement the `fetch()` API calls. Go to Step 2 if you want to start on the backend step first.

### 1b. Authentication

Search for `CS5356 TODO 1b` to see the tasks

A common tool used for Authentication in a NextJS application is NextAuth (or soon-to-be Auth.js). It provides some core functionality, such as allowing us to use tokens that represent a user's identity, secured behind cookies.

NextAuth has already been installed in the project, your task is to integrate it by configuring it and then using it to get the user's identity - to display it on the page or check if the user is signed in.

Add authentication using NextAuth by editing `pages/api/auth/[...nextauth].js` and following the instructions at the top of the file. 

Run the tests using `npm run test-login`. Make sure the server is running in one terminal session and run the tests in a separate terminal.

## 2. Managing Data
Next - you can start by building out the data model, and then connecting your data model to an API via NextJS.

### 2a. Get the data model to work
Implement the methods in `services/database.mjs` according to the unit tests in `tests/database.test.js`.

You can run `npm run test-db` to run the unit tests for the functions in the `database` module. Once this is complete, you'll be ready to connect this data model to an API.

### 2b. Connect the data model to the API
Implement the `/api/class-code` APIs in `pages/api/` using the NextJS Pages Router. You can run `npm run test-class-codes` to run the integration tests for those APIs until you get a :green_check:

Implement the `/api/class-codes/:class-code/questions` APIs in `pages/api/`. You can run `npm run test-class-questions` to run the integration tests for those APIs until you get a :green_check:

### 3. Connect the app to the backend

We'll shift our focus back to the `pages/` folder, where we'll be able to add in new pages to support our application.

** 3a. Instructor Home Page** Now that your API is available, update the component to create a class code using the POST API, and view a list of class codes using the GET API.

** 3b. Class Questions Page** Update the form to submit a POST request to create a question, and fetch the latest questions with a GET request.

## Testing

### ESLint & Prettier
This project also contains a linter, which you can use with your VSCode if you want by installing the ESLint plugin so you can get fast feedback about your code.

You can also manually run the linter using `npm run lint` from either the `frontend/` or `backend/` directories

Linters can sometimes catch useful errors, and they help write consistent-looking code according to a styleguide.

Prettier is also installed to automatically format your code - this also helps in writing consistent looking code.

### Jasmine Tests

All the tests should be passing for full credit. These will be run automatically for your Github Pull Requests.

## Deploying

This project will be graded by running it locally - we won't be deploying this to a hosting provider for this milestone. We'll cover why in class.