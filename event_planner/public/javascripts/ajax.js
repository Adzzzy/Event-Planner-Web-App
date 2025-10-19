//Create events_list and user_avls globally so that they don't need to be retrieved from db again unless getEvents() is called again
let events_list = [];
let user_avls = [];

/* Could instead have the form method as post and the action as /signup to automatically send it to that route with the post parameters.
However this will allow us to easily trigger javascript to let the user know the result of the attempt */
function signup(event) {

    //This is important to prevent the default form submission which submit as a GET request with the form information visible as URL params, reloading the page and interrupting the ajax request
    event.preventDefault(); //Could alternatively have the form button be of type "button" instead of type submit, and trigger this function with button onclick attribute instead of form onsubmit


    var givenName = document.getElementsByClassName("signupFirstName")[0].value;
    var familyName = document.getElementsByClassName("signupLastName")[0].value;
    var email = document.getElementsByClassName("signupEmail")[0].value;
    var username = document.getElementsByClassName("signupUsername")[0].value;
    var password = document.getElementsByClassName("signupPassword")[0].value;

    //1
    var xhttp = new XMLHttpRequest();

    //4
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Signup Successful");
            window.location.href = '/events.html';

        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Signup Failed");
        }
    };

    //2
    xhttp.open("POST", "/signup", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    //3
    xhttp.send(JSON.stringify({ 'givenName': givenName, 'familyName': familyName, 'email': email, 'username': username, 'password': password }));
}

function login(event) {
    
    //The event object stores associated data for the submit event that triggered this function.
    //As function was triggered by a form submit event, prevent the default form submission behaviour, which would interrupt the ajax request by reloading the page.
    event.preventDefault(); 
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;

    //1
    var xhttp = new XMLHttpRequest();

    //4
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Login Successful");
            window.location.href = '/events.html';
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Login Failed");
        }
    };

    //2
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    //3
    xhttp.send(JSON.stringify({ 'username': username, 'password': password }));
}

function logout() {

    try {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        });
    } catch (err) { }

    //1
    var xhttp = new XMLHttpRequest();

    //4
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Logged Out");
            window.location.href = "index.html";  //should change to function
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Logout Failed");
        }
    };

    //2
    xhttp.open("POST", "/logout", true);

    //3
    xhttp.send();
}

function onSignIn(CredentialResponse) {

    var id_token = CredentialResponse.credential;

    let xhttp = new XMLHttpRequest();

    //4
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Login Successful");
            window.location.href = '/events.html';
            //loginGoogle();
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Login Failed");
        }
    };

    //2
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    //3
    xhttp.send(JSON.stringify({ token: id_token }));

}

function login_check() {

    var xhttp = new XMLHttpRequest();

    //4
    xhttp.onreadystatechange = function () {
        let sess = this.responseText;

        if (sess != "") {
            window.location.href = '/events.html';
        }
    };

    //2
    xhttp.open("GET", "/logincheck", true);

    //3
    xhttp.send();
}

/* 
function loginGoogle() {

    //1
    var xhttp = new XMLHttpRequest();

    //4
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    alert("Login Successful");
                    window.location.href = '/events.html';

                } else if (this.readyState == 4 && this.status >= 400) {
                    alert("Login Failed");
                }
            };
        }
    };

    //2
    xhttp.open("POST", "/loggedin", true);

    //3
    xhttp.send();
}*/

function eventCreate1() {

    var eventName = document.getElementsByClassName("eventName")[0].value;
    var eventStartDate = document.getElementsByClassName("eventStartDate")[0].value;
    var eventEndDate = document.getElementsByClassName("eventEndDate")[0].value;
    var eventStreetNo = document.getElementsByClassName("eventStreetNo")[0].value;
    var eventStreetName = document.getElementsByClassName("eventStreet")[0].value;
    var eventSuburb = document.getElementsByClassName("eventSuburb")[0].value;
    var eventPostcode = document.getElementsByClassName("eventPostcode")[0].value;

    var eventStartTime = document.getElementsByClassName("eventStartTime")[0].value;
    var eventEndTime = document.getElementsByClassName("eventEndTime")[0].value;

    //Start and end times are optional as the user may be unsure and can finalize them later. Convert to null instead of "" as the database can accept a null value for these.
    if (eventStartTime == "") {
        eventStartTime = null;
    }
    if (eventEndTime == "") {
        eventEndTime = null;
    }

    //1
    var xhttp = new XMLHttpRequest();
    //4
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Event Created");
            window.location.href = '/events.html';
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Could not create Event :(");
            window.location.href = '/login.html';
        }
    };

    //2
    xhttp.open("POST", "/createEvent", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify({ 'eventName': eventName, 'startDate': eventStartDate, 'startTime': eventStartTime, 'endDate': eventEndDate, 'endTime': eventEndTime, 'AddressStreetNo': eventStreetNo, 'AddressStreetName': eventStreetName, 'AddressSuburb': eventSuburb, 'AddressPostcode': eventPostcode }));
}

function addEvent() {

    for (let event of events_list) {

        //First check if event end date has already passed, and if so, skip this event and continue to the next iteration of the for loop
        currentDate = new Date();
        eventEndDate = new Date(event.endDate);
        if (eventEndDate < currentDate) {
            continue;
        }

        let eventName = event.eventName;

        let eventHostName = event.givenName + " " + event.familyName;

        let startDate = event.startDate.split("T00:00:00.000Z");
        let endDate = event.endDate.split("T00:00:00.000Z");

        //format dates as dd/mm/yyyy instead of yyyy-mm-dd
        startDate = new Date(startDate[0]);
        endDate = new Date(endDate[0]);

        startDate = startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear();
        endDate = endDate.getDate() + "/" + (endDate.getMonth() + 1) + "/" + endDate.getFullYear();

        var starttime = "";
        var endtime = "";

        if (event.startTime != null) {
            //Remove the seconds from the time
            starttime= event.startTime.toString().substring(0, 5);
            //Format the string to place after date
            starttime = ", " + starttime;
        }
        if (event.endTime != null) {
            endtime= event.endTime.toString().substring(0, 5);
            endtime = ", " + endtime;
        }

        let address = event.AddressStreetNo + " " + event.AddressStreetName + ", " + event.AddressSuburb + " " + event.AddressPostcode;
        let date = event.startDate;

        let list = document.querySelector(".list");
        let card = document.createElement("div");
        card.classList.add("card");


        let nextevent = document.createElement("div");
        nextevent.classList.add("nextevent");


        let eHeading = document.createElement("h3");
        eHeading.innerText = eventName;

        let pHost = document.createElement("p");
        pHost.innerText = "Host: " + eventHostName;

        let p1 = document.createElement("pre");
        p1.innerText = "Location: " + address + "           Start: " + startDate + starttime + "    End: " + endDate + endtime;
        p1.style.whiteSpace = "pre-wrap"; //Allow the pre to maintain its spacing but also still wrap to next line if needed.

        let inpdiv = document.createElement("div");
        let inp1 = document.createElement("input");
        let inp2 = document.createElement("input");
        let lb1 = document.createElement("label");
        let lb2 = document.createElement("label");

        inp1.classList.add("startTimeInput");
        inp2.classList.add("endTimeInput");

        inp1.id = "startTimeInput" + event.eventID;
        inp2.id = "endTimeInput" + event.eventID;

        inp1.type = "time";
        inp2.type = "time";

        //Iterate over the sql rows containing availabilities for the current user. If one's eventID matches the current event being created, set the starting value of the input to show the availability previously set.
        for (let avl of user_avls) {
            if (avl.eventID == event.eventID) {
                //The event ID matches so set the values to match that availability start and end time. substring to only keep the HH:MM from HH:MM:SS
                inp1.value = avl.availabilityStart.toString().substring(0,5);
                inp2.value = avl.availabilityEnd.toString().substring(0,5);
            }
        }

        /* Makes the time input include seconds as well. Not necessary as MySQL time type can handle HH:MM and adds :00 for seconds automatically
        inp1.setAttribute("step", 1);
        inp2.setAttribute("step", 1);
        */

        lb1.setAttribute("for", "starttime");
        lb2.setAttribute("for", "endtime");

        lb1.innerText = "Start Time:";
        lb2.innerText = "End Time:";

        let btn = document.createElement("button");
        btn.classList.add("setAvl");
        btn.innerText = "Set Availability";

        card.setAttribute("card-event-id", event.eventID);
        btn.setAttribute("card-event-id", event.eventID);
        btn.setAttribute("onclick", "setAvailability(this)");

        inpdiv.appendChild(lb1);
        inpdiv.appendChild(inp1);
        inpdiv.appendChild(lb2);
        inpdiv.appendChild(inp2);
        inpdiv.appendChild(btn);

        nextevent.appendChild(eHeading);
        nextevent.appendChild(pHost);
        nextevent.appendChild(p1);
        nextevent.appendChild(inpdiv);
        card.appendChild(nextevent);
        list.appendChild(card);

    }
}

function resetEvents() {

    let list = document.querySelector(".list");
    let img = document.createElement("img");

    if (length < 1) {
        img.classList.add("nothing");
        img.src = "/images/nothingtosee.jpg";
        list.appendChild(img);
    }

    while (list.children.length > 0) {
        list.children[0].remove();
    }
}

function getEvents() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = async function () { //callback function is made async so it can await for data promised in the getUserAvailability function. Although there isn't an explicit return value in getUserAvailability(), (it modifies a global variable), as it is labelled async it automatically resolves the promise when function execution is complete.
        if (this.readyState == 4 && this.status == 200) {
            events_list = JSON.parse(this.responseText);
            await getUserAvailability(); //Await keyword means that function will continue but will pause the function once it reaches a line that needs user_avls, continuing with the other functions in the mean time.
            resetEvents();
            addEvent();
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Please log in!");
            window.location.href = '/login.html';
        }
    };
    xhttp.open("GET", "/events");
    xhttp.send();
}

function setAvailability(param) {

    var eventID = param.getAttribute("card-event-id");
    var startTime = document.getElementById("startTimeInput" + eventID).value;
    var endTime = document.getElementById("endTimeInput" + eventID).value;

    //1
    var xhttp = new XMLHttpRequest();
    //4
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Availability Set!");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Could Not Set Availability!");
        }
    };

    //2
    xhttp.open("POST", "/setavailability", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify({ 'eventID': eventID, 'availabilityStart': startTime, 'availabilityEnd': endTime }));
}

function finaliseTime(param) {

    var eventID = param.getAttribute("card-event-id");
    var finalStartTime = document.getElementById("startTimeInput" + eventID).value;
    var finalEndTime = document.getElementById("endTimeInput" + eventID).value;

    //1
    var xhttp = new XMLHttpRequest();
    //4
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Event Finalised!");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Could Not Finalise Event!");
        }
    };

    //2
    xhttp.open("POST", "/finaliseTime", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify({ 'eventID': eventID, 'startTime': finalStartTime, 'endTime': finalEndTime }));
}

let my_events = []; //Declare globally

function getMyEvents() {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            let eventslist = document.querySelector(".card");

            let img = document.createElement("img");


            my_events = JSON.parse(this.responseText);
            var length = my_events.length;

            if (length < 1) {
                img.classList.add("nothing");
                img.src = "images/nothingtosee.jpg";
                eventslist.appendChild(img);
            }

            //sort events by date
            my_events.sort(function (a, b) {
                var c = new Date(a.startDate);
                var d = new Date(b.startDate);
                return c - d;
            });

            //Check if event end date has already passed, and if so, remove the event from my_events. Filter function doesn't work in place like the sort function, so overwrite my_events.
            my_events = my_events.filter(function (event) {
                eventEndDate = new Date(event.endDate);
                currentDate = new Date();
                return  eventEndDate > currentDate; //Event end date needs to be greater than the current date
            });

            length = my_events.length;

            // let divcard = document.createElement('DIV');

            let classdiv = document.createElement('DIV');
            classdiv.classList.add("nextevent");
            //classdiv.setAttribute("card-event-id", my_events[0].eventID);
            //classdiv.setAttribute("onclick", "sendIDNEXT(this);");
            //document.getElementByClassName("nextevent").style.font-size = "30px";

            let heading = document.createElement('h3');
            heading.classList.add("headingclass");
            heading.style.font = "bold 40px";
            //document.getElementByClassName("heading").style.font-weight = "bold";
            //document.getElementByClassName("heading").style.font-size = "40px";
            heading.innerText = "Next Upcoming Event:";
            let brk = document.createElement('br');

            let para = document.createElement('p');
            para.innerText = my_events[0].eventName;
            para.style.font = "bold 25px Roboto ";

            let pref = document.createElement('pre');
            pref.innerText = "Location: " + my_events[0].AddressStreetNo + " " + my_events[0].AddressStreetName + ", " + my_events[0].AddressSuburb + " " + my_events[0].AddressPostcode;
            pref.style.font = "20px Roboto ";
            pref.style.whiteSpace = "pre-wrap"; //Allow the pre to maintain its spacing but also still wrap to next line if needed.

            let datePre = document.createElement('pre');

            var startdate = my_events[0].startDate.split("T00:00:00.000Z");
            var enddate = my_events[0].endDate.split("T00:00:00.000Z");

            //format dates as dd/mm/yyyy instead of yyyy-mm-dd
            startdate = new Date(startdate[0]);
            enddate = new Date(enddate[0]);

            let startWeekday = startdate.toString().split(' ')[0] //get weekday
            let endWeekday = enddate.toString().split(' ')[0]

            startdate = startWeekday + ", " + startdate.getDate() + "/" + (startdate.getMonth() + 1) + "/" + startdate.getFullYear();
            enddate = endWeekday + ", " + enddate.getDate() + "/" + (enddate.getMonth() + 1) + "/" + enddate.getFullYear();

            var starttime = "";
            var endtime = "";

            if (my_events[0].startTime != null) {
                starttime= my_events[0].startTime.toString().substring(0, 5);
                starttime = " at " + starttime;
            }
            if (my_events[0].endTime != null) {
                endtime= my_events[0].endTime.toString().substring(0, 5);
                endtime = " at " + endtime;
            }
            
            datePre.innerText = "Start: " + startdate + starttime + "       End: " + enddate + endtime;
            datePre.style.font = "20px Roboto ";
            datePre.style.whiteSpace = "pre-wrap"; //Allow the pre to maintain its spacing but also still wrap to next line if needed.

            classdiv.appendChild(heading);
            //classdiv.appendChild(brk);
            classdiv.appendChild(para);
            classdiv.appendChild(pref);
            classdiv.appendChild(datePre);

            document.getElementsByClassName("card")[0].appendChild(classdiv);


            for (var i = 0; i < length; i++) {

                let inpdiv = document.createElement("div");
                let inp1 = document.createElement("input");
                let inp2 = document.createElement("input");
                let lb1 = document.createElement("label");
                let lb2 = document.createElement("label");

                //inp1.classList.add(my_events[i].eventID);
                inp1.classList.add("startTimeInput");
                //inp1.setAttribute("time", "10");
                //inp1.setAttribute("onchange", "getTime(this)");

                //inp2.classList.add(my_events[i].eventID);
                inp2.classList.add("endTimeInput");

                inp1.id = "startTimeInput" + my_events[i].eventID;
                inp2.id = "endTimeInput" + my_events[i].eventID;

                inp1.type = "time";
                inp2.type = "time";

                if (my_events[i].startTime != null) {
                    inp1.value = my_events[i].startTime.toString().substring(0,5);
                }
                if (my_events[i].endTime != null) {
                    inp2.value = my_events[i].endTime.toString().substring(0,5);
                }

                /* Makes the time input include seconds as well. Not necessary as MySQL time type can handle HH:MM and adds :00 for seconds automatically
                inp1.setAttribute("step", 1);
                inp2.setAttribute("step", 1);
                */

                lb1.setAttribute("for", "fstarttime");
                lb2.setAttribute("for", "fendtime");
                lb1.innerText = "Start Time:";
                lb2.innerText = "End Time:";

                let btn = document.createElement("button");
                btn.classList.add("setTime");
                btn.innerText = "Set Times";

                btn.setAttribute("card-event-id", my_events[i].eventID);
                btn.setAttribute("onclick", "finaliseTime(this)");

                inpdiv.appendChild(lb1);
                inpdiv.appendChild(inp1);
                inpdiv.appendChild(lb2);
                inpdiv.appendChild(inp2);
                inpdiv.appendChild(btn);

                let para2 = document.createElement('p');
                para2.innerText = "Finalise time for event:";
                para2.style.font = "20px Roboto  ";


                let divcard = document.createElement('DIV');
                divcard.classList.add("card");
                divcard.classList.add(my_events[i].eventID);
                let classdiv = document.createElement('DIV');
                let classevt = my_events[i].eventID;
                classdiv.classList.add(classevt);

                let buttondiv = document.createElement('div');


                let button = document.createElement('btn');
                button.innerText = "VIEW AVAILABILITIES";
                buttondiv.appendChild(button);

                button.style.marginBottom = "10px";

                button.classList.add("btn");
                /*button.classList.add ("signup"); */

                button.setAttribute("card-event-id", my_events[i].eventID);
                button.setAttribute("onclick", 'getEventAvailability(this.getAttribute("card-event-id"));'); 

                //divcard.setAttribute("card-event-id", my_events[i].eventID);
                //divcard.setAttribute("onclick", "sendID(this);");

                let para = document.createElement('p');
                para.innerText = my_events[i].eventName;
                para.style.font = "25px Roboto ";
                para.style.marginTop = "5px"

                //prepare the date strings
                startdate = my_events[i].startDate.split("T00:00:00.000Z");
                enddate = my_events[i].endDate.split("T00:00:00.000Z");

                startdate = new Date(startdate[0]);
                enddate = new Date(enddate[0]);
                //if the enddate is on the same day as the startdate, it doesn't need to be included
                if (startdate.getTime() === enddate.getTime()) {
                    enddate = "";
                }
                //otherwise it startdate will be followed by " to enddate"
                else {
                    enddate = enddate.getDate() + "/" + (enddate.getMonth() + 1) + "/" + enddate.getFullYear(); //format as dd/mm/yyyy instead of yyyy-mm-dd
                    enddate = " until " + enddate;
                }
                startdate = startdate.getDate() + "/" + (startdate.getMonth() + 1) + "/" + startdate.getFullYear(); //format as dd/mm/yyyy instead of yyyy-mm-dd

                let pref = document.createElement('pre');
                pref.innerText = "Location: " + my_events[i].AddressStreetNo + " " + my_events[i].AddressStreetName + ", " + my_events[i].AddressSuburb + " " + my_events[i].AddressPostcode + "           Date: " + startdate + enddate;
                pref.style.font = "20px Roboto ";
                pref.style.whiteSpace = "pre-wrap"; //Allow the pre to maintain its spacing but also still wrap to next line if needed.


                //classdiv.appendChild(brk);
                classdiv.appendChild(para);
                classdiv.appendChild(pref);
                classdiv.appendChild(buttondiv);
                classdiv.appendChild(para2);
                classdiv.appendChild(inpdiv);

                divcard.appendChild(classdiv);


                document.getElementsByClassName("secondcard")[0].appendChild(divcard);

            }
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Please log in!");
            window.location.href = '/login.html';
        }


    };

    xhttp.open("GET", '/eventsuser');
    xhttp.send();

}

/*
function sendID(div) {

    var eventID = div.getAttribute("card-event-id");

    var xhttp = new XMLHttpRequest();

    //4
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            getEventAvailability();

        }
    };

    //2
    xhttp.open("POST", "/sendid", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    //3
    xhttp.send(JSON.stringify({ "eventid": eventID }));
}*/

//Get all availabilities for the currently logged in user. Called by the addEvent() function when populating the event page so that the user can also see the availabilities they've set for each event.
async function getUserAvailability() {

    //Fetch api will be used along with async/await because async xhttp (ajax) doesn't support promises and await, which will be required so callers of getUserAvailability wait for data to return first.
    try {
        const response = await fetch('/availabilityuser'); // Fetch the user availability data asynchronously
        if (response.ok) { // Check if the request was successful. Response.ok in fetch api means a 2XX status code
            user_avls = await response.json(); //save response to global user_avls variable
        } 
        else {
            console.error('Error fetching user availability:'); //if the response code isn't a success code (200 - 299) don't save the response
        }

    } catch (error) { //If there is an error with the fetch api don't save the response
        console.error('Error fetching user availability:', error);
        return [];
    }

    /* Synchronous xhttp call works too but not recommended as it pauses the main thread instead of being able to do other things in the meantime, as is the case with fetch while waiting for the promise it creates.
    //Will use synchronous xhttp request in this case (instead of AJAX) so when this function is called, the calling function always waits for the response
    //1
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "/availabilityuser", false); //Set async to false so the addEvent() function waits for the availabilities to come back instead of continuing and trying to reference a non-existent variable.

    xhttp.send();

    if (xhttp.readyState == 4 && xhttp.status == 200) {

        user_avls = JSON.parse(xhttp.responseText);

        return user_avls;
    }
    else if (xhttp.readyState == 4 && xhttp.status >= 400) {
        return [];
    }
    */
}

//Gets the availabilities for a particular event so the host can see availabilities of attendees.
function getEventAvailability(eventID) {

    //1
    var xhttp = new XMLHttpRequest();

    //4
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            const avl = JSON.parse(this.responseText);
            const length = avl.length;

            if (avl[0] != undefined) {

                //First make sure to delete the old availabilities div before trying to create a new one
                let divcard = document.getElementById("availabilities" + eventID);
                if (divcard != null) {
                    hideDiv(divcard);
                }

                divcard = document.createElement('DIV');
                divcard.setAttribute("onclick", "hideDiv(this);");
                //carddiv.onclick = hideDiv(this);
                divcard.classList.add("card");

                divcard.id = "availabilities" + eventID;

                //allows elements within the div to be given an absolute position relative to the div
                divcard.style.position = "relative";

                let para = document.createElement('p');
                para.innerText = "Availabilities";
                para.style.font = "20px Roboto ";

                divcard.appendChild(para);

                for (let i = 0; i < length; i++) {

                    let para1 = document.createElement('p');
                    //let button = document.createElement('btn');
                    //button.innerText = "GO BACK";
                    let avlStart = avl[i].availabilityStart.toString().substring(0, 5); //substring to extract the HH:MM from HH:MM:SS
                    let avlEnd = avl[i].availabilityEnd.toString().substring(0, 5);

                    para1.innerText = avl[i].givenName + " " + avl[i].familyName + ": " + avlStart + " to " + avlEnd;
                    
                    divcard.appendChild(para1);
                }

                let span = document.createElement('span');
                span.innerText = "Click anywhere to close";
                span.style.font = "italic 15px Roboto";
                span.style.opacity = "0.6";
                //position to bottom right corner of the div
                span.style.position = "absolute";
                span.style.bottom = "6px"; //6px from the bottom edge of the parent div
                span.style.right = "20px"; //20px from the right edge of the parent div
                divcard.appendChild(span);

                document.getElementsByClassName(eventID)[0].appendChild(divcard);
            }
        }

    };

    //2
    xhttp.open("GET", "/availabilityevent?eventid=" + eventID, true); //Add url parameter for the eventID

    //3
    xhttp.send();
}

function hideDiv(param) {

    param.remove();

    /*
    if (param.style.display === "none") {
        param.style.display = "block";

    } else {
        param.style.display = "none";
    }*/
}

