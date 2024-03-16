# Event Planner Web App
A group project revolving around the create of an web application for planning events. 
It features account creation, logging in, creating events, viewing others' events, and viewing and managing your own events.
It also includes some additional security measures such as OAuth login using google, password hashing with Argon2, and prepared statements to prevent SQL Injection.

The following commands are required to create and connect to the database:
    sql_start
    mysql --host=127.0.0.1
    create database EventManagement
    use EventManagement
    source Event_Management_System.sql

These commands start the server:
    npm install
    sql_start
    npm start
