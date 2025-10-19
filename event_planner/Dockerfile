FROM node:22-alpine

#Creates a directory in the container's root directory called event_planner and sets it as the working directory
WORKDIR /event_planner

#Copy all the web app files from the current directory on the host machine (the directory containing the dockerfile) to the /event_planner directory in the container
COPY . /event_planner

#Install the dependencies specified in our package.json file
RUN npm install

# node docker base image doesn't expose any ports by default so we can expose port 3000 here (though when running through our docker compose file the port is already exposed and mapped to a host machine port there)
EXPOSE 3000

#Run the npm start command to start the web app
CMD ["npm", "start"]
