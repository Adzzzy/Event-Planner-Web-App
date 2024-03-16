let events_list = [];

function signup() {

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

function login() {

    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;

    //1
    var xhttp = new XMLHttpRequest();

    //4
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Login Successful");
            window.location.ref = '/events.html';
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

function onSignIn(googleUser) {

    var id_token = googleUser.getAuthResponse().id_token;

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
}

function eventCreate1() {

    var eventName = document.getElementsByClassName("eventName")[0].value;
    var eventStartDate = document.getElementsByClassName("eventStartDate")[0].value;
    var eventEndDate = document.getElementsByClassName("eventEndDate")[0].value;
    var eventStreetNo = document.getElementsByClassName("eventStreetNo")[0].value;
    var eventStreetName = document.getElementsByClassName("eventStreet")[0].value;
    var eventSuburb = document.getElementsByClassName("eventSuburb")[0].value;
    var eventPostcode = document.getElementsByClassName("eventPostcode")[0].value;

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

    xhttp.send(JSON.stringify({ 'eventName': eventName, 'startDate': eventStartDate, 'endDate': eventEndDate, 'AddressStreetNo': eventStreetNo, 'AddressStreetName': eventStreetName, 'AddressSuburb': eventSuburb, 'AddressPostcode': eventPostcode }));
}

function addEvent() {

    for (let event of events_list) {
        let eventName = event.eventName;

        let startDate = event.startDate.split("T00:00:00.000Z");
        let endDate = event.endDate.split("T00:00:00.000Z");

        startDate = startDate[0];
        endDate = endDate[0];

        let address = event.AddressStreetNo + " " + event.AddressStreetName + ", " + event.AddressSuburb + " " + event.AddressPostcode;
        let date = event.startDate;

        let list = document.querySelector(".list");
        let card = document.createElement("div");
        card.classList.add("card");


        let nextevent = document.createElement("div");
        nextevent.classList.add("nextevent");


        let p = document.createElement("p");
        p.innerHTML = eventName;

        let p1 = document.createElement("pre");
        p1.innerHTML = "Location: " + address + "           Start: " + startDate + "    End: " + endDate;

        let inpdiv = document.createElement("div");
        let inp1 = document.createElement("input");
        let inp2 = document.createElement("input");
        let lb1 = document.createElement("label");
        let lb2 = document.createElement("label");

        inp1.id = "starttime";
        inp2.id = "endtime";
        inp1.type = "time";
        inp2.type = "time";
        inp1.setAttribute("step", 1);
        inp2.setAttribute("step", 1);

        lb1.setAttribute("for", "starttime");
        lb2.setAttribute("for", "endtime");

        lb1.innerHTML = "Start Time";
        lb2.innerHTML = "End Time";

        let btn = document.createElement("button");
        btn.id = ("btn");
        btn.innerHTML = "Set Times";

        card.setAttribute("card-event-id", event.eventID);
        btn.setAttribute("card-event-id", event.eventID);
        btn.setAttribute("onclick", "setAvailability(this)");

        inpdiv.appendChild(lb1);
        inpdiv.appendChild(inp1);
        inpdiv.appendChild(lb2);
        inpdiv.appendChild(inp2);
        inpdiv.appendChild(btn);

        nextevent.appendChild(p);
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

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            events_list = JSON.parse(this.responseText);
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

    var startTime = document.querySelector("#starttime").value;
    var endTime = document.querySelector("#endtime").value;
    var eventID = param.getAttribute("card-event-id");

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

    var finalStartTime = document.querySelector("#fstarttime").value;
    var finalEndTime = document.querySelector("#fendtime").value;
    var eventID = param.getAttribute("card-event-id");

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

let my_events = [];

function getMyEvents() {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            let eventslist = document.querySelector(".card");

            let img = document.createElement("img");


            my_events = JSON.parse(this.responseText);
            const length = my_events.length;

            if (length < 1) {
                img.classList.add("nothing");
                img.src = "images/nothingtosee.jpg";
                eventslist.appendChild(img);
            }

            my_events.sort(function (a, b) {
                var c = new Date(a.startDate);
                var d = new Date(b.startDate);
                return c - d;
            });

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
            heading.innerHTML = "Next Upcoming Event:";
            let brk = document.createElement('br');

            let para = document.createElement('p');
            para.innerHTML = my_events[0].eventName;
            para.style.font = "bold 20px Roboto ";

            let pref = document.createElement('pre');
            pref.innerHTML = "Location : " + my_events[0].AddressStreetNo + " " + my_events[0].AddressStreetName + " " + my_events[0].AddressSuburb + " " + my_events[0].AddressPostcode;
            pref.style.font = "20px Roboto ";

            let para2 = document.createElement('p');

            var startdate = my_events[0].startDate.split("T00:00:00.000Z");
            var enddate = my_events[0].endDate.split("T00:00:00.000Z");


            para2.innerHTML = startdate[0] + " to " + enddate[0];
            para2.style.font = "20px Roboto ";

            classdiv.appendChild(heading);
            classdiv.appendChild(brk);
            classdiv.appendChild(para);
            classdiv.appendChild(pref);
            classdiv.appendChild(para2);

            document.getElementsByClassName("card")[0].appendChild(classdiv);


            for (var i = 0; i < length; i++) {

                let inpdiv = document.createElement("div");
                let inp1 = document.createElement("input");
                let inp2 = document.createElement("input");
                let lb1 = document.createElement("label");
                let lb2 = document.createElement("label");

                //inp1.classList.add(my_events[i].eventID);
                //inp1.classList.add("fstarttime");
                inp1.id = "fstarttime";
                //inp1.setAttribute("time", "10");
                //inp1.setAttribute("onchange", "getTime(this)");

                inp2.id = "fendtime";

                //inp2.classList.add(my_events[i].eventID);
                //inp2.classList.add("fendtime");

                inp1.type = "time";
                inp2.type = "time";
                inp1.setAttribute("step", 1);
                inp2.setAttribute("step", 1);

                lb1.setAttribute("for", "fstarttime");
                lb2.setAttribute("for", "fendtime");
                lb1.innerHTML = "Start Time";
                lb2.innerHTML = "End Time";

                let btn = document.createElement("button");
                btn.id = ("btn");
                btn.innerHTML = "Set Times";

                btn.setAttribute("card-event-id", my_events[i].eventID);
                btn.setAttribute("onclick", "finaliseTime(this)");

                inpdiv.appendChild(lb1);
                inpdiv.appendChild(inp1);
                inpdiv.appendChild(lb2);
                inpdiv.appendChild(inp2);
                inpdiv.appendChild(btn);

                let para2 = document.createElement('p');
                para2.innerHTML = "Finalise time for event:";
                para2.style.font = "20px Roboto  ";


                let divcard = document.createElement('DIV');
                divcard.classList.add("card");
                divcard.classList.add(my_events[i].eventID);
                let classdiv = document.createElement('DIV');
                let classevt = my_events[i].eventID;
                classdiv.classList.add(classevt);

                let buttondiv = document.createElement('div');


                let button = document.createElement('btn');
                button.innerHTML = "VIEW AVAILABILITIES";
                buttondiv.appendChild(button);
                button.id = ("avl");
                button.style.margin = "10px";

                /*  button.classList.add ("btn");
                 button.classList.add ("signup"); */

                button.setAttribute("card-event-id", my_events[i].eventID);
                button.setAttribute("onclick", "sendID(this);");

                //divcard.setAttribute("card-event-id", my_events[i].eventID);
                //divcard.setAttribute("onclick", "sendID(this);");

                let para = document.createElement('p');
                para.innerHTML = my_events[i].eventName;
                para.style.font = "20px Roboto ";

                let pref = document.createElement('pre');
                pref.innerHTML = "Location = " + my_events[i].AddressStreetNo + " " + my_events[i].AddressStreetName + " " + my_events[i].AddressSuburb + " " + my_events[i].AddressPostcode;
                pref.style.font = "20px Roboto ";



                classdiv.appendChild(brk);
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


function sendID(div) {

    var eventID = div.getAttribute("card-event-id");

    var xhttp = new XMLHttpRequest();

    //4
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            getAvailability();

        }
    };

    //2
    xhttp.open("POST", "/sendid", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    //3
    xhttp.send(JSON.stringify({ "eventid": eventID }));
}



function getAvailability() {

    var xhttp = new XMLHttpRequest();

    //4
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            const avl = JSON.parse(this.responseText);
            const length = avl.length;

            if (avl[0] != undefined) {

                let divcard = document.createElement('DIV');
                divcard.setAttribute("onclick", "hideDiv(this);");
                //carddiv.onclick = hideDiv(this);
                divcard.classList.add("card");

                let para = document.createElement('p');
                para.innerHTML = "Availabilities";
                para.style.font = "20px Roboto ";

                divcard.appendChild(para);



                for (let i = 0; i < length; i++) {

                    let para1 = document.createElement('p');
                    //let button = document.createElement('btn');
                    //button.innerHTML = "GO BACK";
                    para1.innerHTML = avl[i].availabilityStart + " to " + avl[i].availabilityEnd;
                    divcard.appendChild(para1);
                }

                document.getElementsByClassName("secondcard")[0].appendChild(divcard);
            }
        }

    };

    //2
    xhttp.open("GET", "/getavailability", true);

    //3
    xhttp.send();
}

function hideDiv(param) {

    if (param.style.display === "none") {
        param.style.display = "block";

    } else {
        param.style.display = "none";
    }
}

