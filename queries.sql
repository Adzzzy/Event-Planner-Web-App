INSERT INTO events (eventHost,eventName, startDate,endDate,AddressStreetNo,AddressStreetName,AddressSuburb,AddressPostcode) VALUES(?,?,?,?,?,?,?,?);

SELECT * FROM events where eventHost=?;

SELECT * FROM events;

INSERT INTO availability (userID, eventID, availabilityStart, availabilityEnd) VALUES (?, ?, ?, ?);

INSERT INTO events (startTime, endTime) VALUES(?,?,?) WHERE eventID = ?;