-- Test data for the EventManagement database
USE `EventManagement`;

INSERT INTO `users` VALUES
(1,'Adzzy','adammy1000@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$y8Kut87pDZhT2LDUK9Lb2g$oNItPH60+d12mUYqrAgd/3t56cxWuZwNsVgXG8Bb8xo','Adam','Rebes',NULL,NULL,NULL,NULL,NULL),
(2,'Vimmy','vim@mail.com','$argon2id$v=19$m=4096,t=3,p=1$uKslrW/wpsjESwj0siJx3w$rxbNWM8I+bJRvbt/7aHBycKQkXLUjL3m1NifgpxLQII','Vim','Johnson',NULL,NULL,NULL,NULL,NULL),
(3,'Bobby','bob@mail.com','$argon2id$v=19$m=4096,t=3,p=1$RyUDOM9l2tU2oYGKc32bng$5uULjeJ7AcLJQFOKyvwG7gowb0kqpfZg3UojigBZHF4','Bob','Jenkins',NULL,NULL,NULL,NULL,NULL);

INSERT INTO `events` VALUES
(1,1,'Birthday Bash','2031-09-11','17:00:00','2031-09-12','14:00:00',56,'Happy Street','Cherry Grove','5242',NULL),
(2,2,'Rock Climbing','2029-11-12','11:00:00','2029-11-12','16:00:00',128,'Hindley Street','Adelaide','5000',NULL),
(3,3,'Hill Hike','2028-02-22','15:00:00','2028-02-22','21:00:00',1,'Summit Road','Mt Barker','5251',NULL),
(4,2,'Star Wars Marathon','2034-07-14','18:30:00','2034-07-16','12:00:00',432,'Electric Avenue','Rocky Downs','1983',NULL),
(5,2,'Melbourne Trip','2035-10-10','04:00:00','2035-10-13','22:30:00',1,'James Schofield Drive','Adelaide Airport','5950',NULL),
(6,1,'Japan Trip','2030-12-27','07:00:00','2031-01-10','19:45:00',1,'James Schofield Drive','Adelaide Airport','5950',NULL),
(7,1,'Beach Day','2035-01-06','14:30:00','2035-01-06','21:30:00',1,'Norman Road',' Aldinga Beach','5173',NULL),
(8,3,'New Year\'s Party','2039-12-31','19:00:00','2040-01-01','06:00:00',125,'North Terrace','Adelaide','5000',NULL),(9,3,'Solar Eclipse Viewing','2028-07-22','12:00:00','2028-07-22',NULL,266,'Mount Lofty Summit Road','Crafers','5152',NULL);

INSERT INTO `availability` VALUES
(1,1,'17:00:00','14:00:00'),
(2,1,'20:15:00','06:45:00'),
(3,1,'21:30:00','08:00:00'),
(1,2,'11:30:00','15:00:00'),
(3,2,'13:30:00','15:30:00'),
(1,3,'15:30:00','20:15:00'),
(2,3,'17:30:00','21:00:00'),
(3,3,'15:00:00','21:00:00'),
(1,4,'19:15:00','10:45:00'),
(3,4,'23:00:00','08:00:00'),
(1,5,'04:30:00','22:30:00'),
(2,5,'04:00:00','22:30:00'),
(3,5,'04:45:00','22:00:00'),
(1,6,'07:00:00','19:45:00'),
(2,6,'07:00:00','19:45:00'),
(3,6,'07:30:00','19:30:00'),
(2,7,'14:30:00','18:00:00'),
(3,7,'17:45:00','20:00:00'),
(1,8,'20:45:00','04:00:00'),
(2,8,'19:30:00','02:00:00'),
(1,9,'12:00:00','13:00:00'),
(2,9,'12:15:00','12:45:00'),
(3,9,'11:00:00','15:00:00');

-- Set AUTO_INCREMENT to start from next available index instead of 1

ALTER TABLE `users` AUTO_INCREMENT=4;

ALTER TABLE `events` AUTO_INCREMENT=10;