USE dbms_pdam;

CREATE DATABASE dbpelanggan;

USE dbpelanggan;

CREATE TABLE pelanggan_pdam
(
	id INT NOT NULL,
    nama VARCHAR(30) NOT NULL,
    meterterakhir INT NOT NULL,
    norumah INT NOT NULL,
    notelepon INT(12) NOT NULL
);

SHOW TABLES;

DESC pelanggan_pdam;

SELECT * FROM pelanggan_pdam;