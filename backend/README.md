# Backend

This server utilizes NodeJS and ExpressJS. To run this server:
* In a terminal, navigate to the backend root directory
* call `npm run dev` for a running developement node monitor (nodemon)
* or call `npm run start` to run a production version

# Requirements
* NodeJS (and npm)
* MySQL

# Current API Calls
## Appointments
* GET /appointments : Retrieve all appointments in database
* POST /appointments : Create a new appointment
* DEL /appointments : Delete all appointments in database
* GET /appointments/:appointment_id : Retrieve specific appointment based on appointment_id
* PUT /appointments/:appointment_id : Update specific appointment based on appointment_id
* DEL /appointments/appointment_id : Delete specific appointment based on appointment_id

## Schedule
* GET /schedules : Retrieve all schedules in database
* POST /schedules : Create a new schedule
* DEL /schedules : Delete all schedules from database
* GET /schedules/:schedule_id : Retrieve specific schedule based on schedule_id
* PUT /schedules/:schedule_id : Update specific schedule based on schedule_id
* DEL /schedules/:schedule_id : Delete specific schedule based on schedule_id

## Student
* GET /students : Retrieve all students in database
* POST /students : Create a new student
* DEL /students : Delete all students from database
* GET /students/:student_id : Retrieve specific student based on student_id
* PUT /students/:student_id : Update specific student based on student_id
* DEL /students/:student_id : Delete specific student based on student_id
* GET /students/:student_id/history : Retrieve the history of specific student
* GET /students/:session_key/appointments : Retrieve student's appointments based on the used session key

## Faculty
* GET /faculties : Retrieve all faculties in database
* POST /faculties : Create a new faculties
* DEL /faculties : Delete all faculties from database
* GET /faculty/:sesion_key : Retrieve specific faculty based on session key
* GET /faculty/:session_key/zoom : Retrieve specific faculty's zoom based on session key
* GET /faculty/:session_key/appointments : Retrieve all of specific faculty's appointments
* GET /faculty/:session_key/appointments/today : Retrieve specific faculty's appointments for today
* GET /faculty/:session_key/appointments/active : Retrieve specific faculty's active appointments
* GET /faculty/:session_key/schedule : Retrieve specific faculty's scheduke based on session key
* PUT /faculty/:f_id : Update specific faculty based on faculty id
* DEL /faculty/:f_id : Delete specific faculty based on faculty id
