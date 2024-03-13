USE dbms_note;

CREATE DATABASE dbnotes;

USE dbnotes;

CREATE TABLE note
(
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    content TEXT,
    penulis INT,
    FOREIGN KEY (penulis) REFERENCES user (id)
);

SHOW TABLES;

DESC note;

SELECT * FROM note;

DROP TABLE note;
SHOW TABLES;

DROP TABLE catatan;
SHOW TABLES;