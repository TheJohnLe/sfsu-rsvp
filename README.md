# iAssist

Welcome to the prototype of an RSVP web app to help students remotely connect with an advisor. The system uses Unix Epoch Time to maintain timestamps and appointment times.

This app allows students to be able to:
* browse for available appointments with specific dates and timeslots
* manage scheduled appointments
* join a Zoom session of the appointment

Advisors are able to:
* Manage their weekly schedule
* Manage their Zoom link
* Manage scheduled appointments made by seeking students
* Give a post-session review of the appointment and add it to the history of the student

# Software Requirements
The following is required before running the machine:
* NodeJS (and npm)
* MySQL
See below in **Software Frameworks** for details.

# Installation
- Create SQL database from your machine.
 - Clone the repo.
 - Update backend/config/db.config.js to your specified SQL database.
 - Load database/iassist-tables.sql and run the query to create the tables.
 - (Optional) database/iassist-sample-data.sql includes a sample set of data.
 (Note: timestamps are outdated, update the Epoch timestamps accordingly)
 - Open a terminal, navigate to the *backend* directory, call ```npm run dev``` for a running development node monitor (nodemon) or ```npm run start``` to run production version. By default, the backend server will run at port 5000 or the next available port.
 - Open another terminal, navigate to the *frontend* directory, call ```npm run start```. By default, the frontend server will run at 3000 or the next available port.

# Software Frameworks

StackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**

## React

Runs the frontend webpages, maintaining user-action and outputting information to the user. Currently uses the Component structure. State-changes should be part of future-implementation.
Homepage: https://reactjs.org/

## NodeJS

Runs the backend server to take care of data routing and protocols.
Homepage: https://nodejs.dev/

## Express

Minimal and flexible NodeJS framework that provides a robust set of features for web and mobile development.
This extra framework is already in the backend packages.json, so no external installation is required.
Homepage: https://expressjs.com/

## MySQL

Stores and manages data. Allows requesting queries from the backend. If you don't like managing your databases using your Terminal/Command Prompt, I suggest using MySQL Workspace to navigate and manage your database workspace.
Homepage: https://www.mysql.com/

