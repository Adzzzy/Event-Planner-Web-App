var express = require('express');
var router = express.Router();
var path = require('path');

var argon2 = require('argon2');

const CLIENT_ID = '969440842699-0ckc8mvqtsrss89glnbgh349te6a9le8.apps.googleusercontent.com';
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

/* GET home page. */
/* router.get('/', function (req, res, next) {
  res.sendFile('index.html');
}); */

// ###### Login Redirect ######
router.post('/loggedin', function (req, res, next) {

  res.redirect("login.html");

});

// ###### Login Page ######
/* router.get('/loginpage', function (req, res, next) {
  res.sendFile(path.resolve('public/login.html'));
}); */

// ###### Sign Up Page ######
/* router.get('/register', function (req, res, next) {
  res.sendFile(path.resolve('public/register.html'));
}); */

// ###### Login Status ######
router.get('/logincheck', function (req, res, next) {
  res.send(req.session.user);
});


// ###### Sign Up ######
router.post('/signup', function (req, res, next) {

  if ('email' in req.body && 'username' in req.body && 'givenName' in req.body && 'familyName' in req.body && 'password' in req.body) {

    if (req.body.email == "" || req.body.username == "" || req.body.password == "" || req.body.givenName == "" || req.body.familyName == "" || Object.keys(req.body.password).length < 6) {
      console.log("Invalid input");
      res.sendStatus(400);
      return;
    }
    req.pool.getConnection(async function (err, connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      let hash = null;
      try {
        hash = await argon2.hash(req.body.password);
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      let query = "INSERT INTO users (username, email,password,givenName,familyName) VALUES(?,?,?,?,?);";
      connection.query(query, [req.body.username, req.body.email, hash, req.body.givenName, req.body.familyName], function (err, rows, fields) {
        if (err) {
          console.log(err);
          res.sendStatus(403);
          return;
        }
        let query = "SELECT userID,username,email FROM users WHERE userID = LAST_INSERT_ID();";
        connection.query(query, [req.body.username, req.body.password], function (err, rows, fields) {
          connection.release();
          if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
          }
          if (rows.length > 0) {
            console.log('success');
            req.session.user = rows[0];
            res.sendStatus(200);
          } else {
            console.log('bad login');
            res.sendStatus(401);
          }
        });
      });
    });
  } else {
    console.log('bad request');
    res.sendStatus(400);
  }


});

// ###### Login ######
router.post('/login', async function (req, res, next) {  // note use of async; you may need to move this to an inner function

  req.session.loggedin = false;
  if ('username' in req.body && 'password' in req.body) {

    req.pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      let query = "SELECT userID,username,email,password,givenName,familyName,homeStreetNo,homeStreetName,homeSuburb,homePostcode,isAdmin FROM users WHERE username = ?;";
      connection.query(query, [req.body.username], async function (err, rows, fields) {
        connection.release();
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        if (rows.length > 0) {

          try {
            if (await argon2.verify(rows[0].password, req.body.password)) {
              console.log('success');
              req.session.user = rows[0];
              req.session.loggedin = true;
              res.sendStatus(200);

            } else {
              console.log('bad password');
              res.sendStatus(401);
            }

          } catch (err) {
            console.log('bad verify');
            res.sendStatus(401);
          }

        } else {
          console.log('bad user');
          res.sendStatus(401);
        }

      });

    });

  } else if ('token' in req.body) {

    let email = null;

    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      email = payload['email'];
      // If request specified a G Suite domain:
      // const domain = payload['hd'];
    }

    verify().then(function () {
      req.pool.getConnection(function (err, connection) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        let query = "SELECT userID,username,email,password,givenName,familyName,homeStreetNo,homeStreetName,homeSuburb,homePostcode,isAdmin FROM users WHERE email = ?;";
        connection.query(query, [email], async function (err, rows, fields) {
          connection.release();
          if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
          }
          if (rows.length > 0) {

            console.log('success');
            req.session.user = rows[0];
            req.session.loggedin = true;
            res.sendStatus(200);

          } else {
            console.log('bad login');
            res.sendStatus(401);
          }

        });

      });

    }).catch(function () {
      res.sendStatus(401);
    });

  } else {
    console.log('bad request');
    res.sendStatus(400);

  }

});


// ###### Logout ######
router.post('/logout', function (req, res, next) {
  if ('user' in req.session) {
    delete req.session.user;
    res.end();
  } else {
    console.log("User is not logged in");
    res.sendStatus(403);
    return;
  }

});


router.post('/createEvent', function (req, res, next) {

  if (!('user' in req.session)) {
    console.log("User is not logged in");
    res.sendStatus(403);
    return;
  }
  //important to note that this only checks for the existence of these keys in the body, they could still be empty "" or null
  if ('eventName' in req.body && 'startDate' in req.body && 'startTime' in req.body && 'endDate' in req.body && 'endTime' in req.body && 'AddressStreetNo' in req.body && 'AddressStreetName' in req.body && 'AddressSuburb' in req.body && 'AddressPostcode' in req.body) {

    req.pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      let userid = req.session.user.userID;
      let query = "INSERT INTO events (eventHost,eventName, startDate, startTime, endDate, endTime, AddressStreetNo,AddressStreetName,AddressSuburb,AddressPostcode) VALUES(?,?,?,?,?,?,?,?,?,?);";
      connection.query(query, [userid, req.body.eventName, req.body.startDate, req.body.startTime, req.body.endDate, req.body.endTime, req.body.AddressStreetNo, req.body.AddressStreetName, req.body.AddressSuburb, req.body.AddressPostcode], function (err, rows, fields) {
        connection.release();
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        } else {
          console.log('event created');
          res.sendStatus(200);
        }

      });

    });

  } else {
    console.log('bad request');
    res.sendStatus(400);

  }
});

router.get('/eventsuser', function (req, res, next) {

  if (!('user' in req.session)) {
    console.log("User is not logged in");
    res.sendStatus(403);
    return;
  }

  req.pool.getConnection(function (error, connection) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }

    let id = req.session.user.userID;

    let query = "SELECT * FROM events where eventHost=?;";
    connection.query(query, [id], function (error, rows, fields) {
      connection.release(); // release connection
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });

  });

});

// ### Get Events ###
router.get('/events', function (req, res, next) {

  if (!('user' in req.session)) {
    console.log("User is not logged in");
    res.sendStatus(403);
    return;
  }

  req.pool.getConnection(function (error, connection) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }

    let query = `SELECT eventID,eventHost,eventName,startDate,startTime,endDate,endTime,AddressStreetNo,AddressStreetName,AddressSuburb,AddressPostcode,eventLink,username,givenName,familyName
    FROM events INNER JOIN users ON events.eventHost = users.userID;`;
    connection.query(query, function (error, rows, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      res.send(rows);
    });

  });

});


router.post('/setavailability', function (req, res, next) {

  if ('eventID' in req.body && 'availabilityStart' in req.body && 'availabilityEnd' in req.body) {

    req.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }

      let userID = req.session.user.userID;
      let eventID = parseInt(req.body.eventID);

      //First check to see if availability is already set for this event by this user
      let query = "SELECT * FROM availability WHERE userID = ? AND eventID = ?;";
      connection.query(query,[userID, eventID], function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        }

        //if availability has already been set before, update the values
        if (rows.length > 0) {
          let query = "UPDATE availability SET availabilityStart = ?, availabilityEnd = ? WHERE userID = ? AND eventID = ?;";
          connection.query(query,[req.body.availabilityStart, req.body.availabilityEnd, userID, eventID ], function (error, rows, fields) {
            connection.release();
            if (error) {
              console.log(error);
              res.sendStatus(500);
              return;
            }
            else {
              console.log('availability updated');
              res.sendStatus(200);
            }
          });
        }
        //otherwise insert into the table instead
        else {
          let query = "INSERT INTO availability (userID, eventID, availabilityStart, availabilityEnd) VALUES (?, ?, ?, ?);";
          connection.query(query,[userID, eventID, req.body.availabilityStart, req.body.availabilityEnd ], function (error, rows, fields) {
            connection.release();
            if (error) {
              console.log(error);
              res.sendStatus(500);
              return;
            }
            else {
              console.log('availability added');
              res.sendStatus(200);
            }
          });
        }
      });
    });
  }
  else {
    console.log('bad request');
    res.sendStatus(400);
  }
});

router.post('/finaliseTime', function (req, res, next) {

  if ('startTime' in req.body && 'endTime' in req.body && 'eventID' in req.body) {

    req.pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      let eventID = parseInt(req.body.eventID);
      let query = "UPDATE events SET startTime = ?, endTime = ? WHERE eventID = ?;";
      connection.query(query, [req.body.startTime, req.body.endTime,eventID], function (err, rows, fields) {
        connection.release();
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        } else {
          console.log('event created');
          res.sendStatus(200);
        }
      });
    });
  } else {
    console.log('bad request');
    res.sendStatus(400);
  }
});

router.get('/availabilityuser', function (req, res, next) {

  if (!('user' in req.session)) {
    console.log("User is not logged in");
    res.sendStatus(403);
    return;
  }

  req.pool.getConnection(function (error, connection) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }

    let id = req.session.user.userID;

    let query = "SELECT * FROM availability where userID=?;";
    connection.query(query, [id], function (error, rows, fields) {
      connection.release(); // release connection
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });

  });

});

router.get('/availabilityevent', function (req, res, next) {

  //Read the eventid url arg of the GET request
  evID = req.query.eventid;

  req.pool.getConnection(function (error, connection) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }

    let query = `SELECT availability.userID,eventID,availabilityStart,availabilityEnd,username,givenName,familyName
    FROM availability INNER JOIN users ON availability.userID = users.userID WHERE eventID=?;`;
    connection.query(query, [evID], function (error, rows, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });

  });

});

/*
let evID = null;

router.post('/sendid', function (req, res, next) {
  {
    evID = req.body.eventid;
    res.send();
  }

});*/

module.exports = router;