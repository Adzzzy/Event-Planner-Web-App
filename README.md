# Event Planner Web App
A group project revolving around the creation of a web application for planning events. 
It features account creation, logging in, creating events, viewing others' events, and viewing and managing your own events.
A search functionality is provided for finding events, as well as options for sorting events by various event attributes.
Additionally, users may set the times they are available for events, with these being viewable by the event host, who may use them to reschedule events to a more suitable time.

The web application is built using Node.js for server-side scripting, integrating with the HTML, JavaScript, and CSS used for client-side operations. Vue.js and Bootstrap are also used to enhance JavaScript and CSS capabilities, respectively.
Further, Asynchronous JavaScript and XML (AJAX) is taken advantage of on the client-side for the creation and handling of asynchronous HTTP requests to the server.
The server itself is created and handled using the HTTP module of Node.js, with routing, redirection, middleware, and caching being handled with the Express.js framework.
A database is also used for the web app, utilising MySQL for database management as well as the handling of connections and SQL queries initiated by the server.

Some additional security measures are also incorporated, such as login with OAuth 2.0 & OpenID Connect using Google Identity Services, password hashing with Argon2id, prepared statements to prevent SQL Injection, and sanitisation of displayed user inputs for the preclusion of Cross-Site Scripting (XSS).

## Usage
### Running using Docker Compose
The web application can be hosted using Docker Compose to build containers for each of the required services through the Docker Compose configuration file I've created for it.

**Download the project files**
- If you have git installed, clone the repository to your device using the command `git clone https://github.com/Adzzzy/Event-Planner-Web-App`
- Alternatively, from the GitHub repository page press the green "code" button and choose "Download ZIP". Make sure to unzip the folder.

**Get Docker Desktop**
- Head to https://www.docker.com/products/docker-desktop/ and click on _Download Docker Desktop_, making sure to choose the right download for your device.
- Open Docker Desktop and make sure it's running. (The bottom left corner of the Docker Desktop window indicates the status of the Docker Engine).

**Start the web app**
- Open up any terminal or shell. On Windows, Mac, or Linux simply search "Terminal" and open it up. You could also search for "Command Prompt" or "PowerShell" instead on Windows.
- Navigate to the location where you've stored the web app. Do this using the "cd" command.  E.g. if the files are in your downloads folder: `cd C:\Users\<UserName>\Downloads\Event-Planner-Web-App`. The correct directory will contain the "docker-compose.yml" file.
  - Alternatively, navigate to the directory in the file explorer, then right-click within the folder while holding Shift, and select "Open in Terminal" or "Open PowerShell window here". 
- From here, start the web app with the following command:

     ```console
     docker compose up
     ```
     - Include `--build` on the end to rebuild when making changes.

**Access the website**
- To view and interact with the site, head to: http://localhost:3000

Note: If the website has trouble connecting to the database, make sure that in the "app.js" file, "host" is set to "db", i.e. `host: 'db',` and not something else.

---------------------------------------------------------------------------------------------------------------------------------------

### Manual Set-up
If you'd rather set up your environment manually for the development and running of Node.js apps along with a MySQL server, you can do so with the following steps:

**Get Node.js**
- Head to https://nodejs.org/en/download and download the installer compatible with your operating system.
- Run the Node.js installer. It is recommended to keep the default settings for the install for less set-up later.

**Download the project files**
- If you have git installed, clone the repository to your device using the command `git clone https://github.com/Adzzzy/Event-Planner-Web-App`
- Alternatively, from the GitHub repository page press the green "code" button and choose "Download ZIP". Make sure to unzip the folder.

**Get MySQL**
- Head to https://dev.mysql.com/downloads/mysql/ to download the installer for MySQL.
- Follow the installer instructions. The "Typical" setup type is sufficient for this project.
- Unless otherwise preferred, leave the default configurations. A password will be required for the root account, remember it for later.
  - Note: The password can be altered later with the query: `ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPassword';`

**Start MySQL**
- Connect to MySQL by opening a terminal, navigating to the "bin" folder of the installation for MySQL, and typing `./mysql -u root -p`. Alternatively, on Windows just search for and open the MySQL Command Line Client.
- In the case of an error message resembling `Can't connect to MySQL server on 'localhost:3306'`, manually start the service first by typing `./mysqld` to start the MySQL daemon. Or:
  -  Using the task manager's "Services" tab or `net start <ServiceName>` on Windows.
  -  `./mysql.server` on Mac.
  -  `sudo systemctl start mysql` on Linux.

**Initialise the database**
- Create the database using the Event_Management_System.sql file from the "database" folder among the downloaded files of this repository.
  - Type the following command: `source /full/path/to/Event_Management_System.sql`.
  - Alternatively, copy and paste the contents of Event_Management_System.sql into the command line instead.
- Optional: Repeat the above step with the "testdata.sql" file to populate the database with some sample data.

**Set up the Node app**
- Open the "app.js" file from inside the "event_planner" directory of this repository.
- Find the section specifying the connection details for the database, beginning with `var dbConnectionPool = mysql.createPool({`. Set the host to `host: 'localhost',` and the password to the root password you created when configuring MySQL, e.g. `password: 'password'`.
- Open a terminal within the "event_planner" directory (right-click within the folder while holding Shift, and select "Open in Terminal").
  - Type `npm install` to install the node packages needed for the app.
 
**Start the Node app**
- Start the web app with the following command:

     ```console
     npm start
     ```

**Access the website**
- View and interact with the site in your web browser at: http://localhost:3000
