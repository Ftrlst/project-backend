USE dbms_note;
USE dbnotes;

CREATE TABLE user
(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(30),
    email VARCHAR(30),
    password INT(7)
);

DROP TABLE username;
SHOW TABLES;

DESC user;

SELECT * FROM user