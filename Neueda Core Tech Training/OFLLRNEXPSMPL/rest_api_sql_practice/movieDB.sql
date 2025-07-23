CREATE DATABASE IF NOT EXISTS myMovie;
USE myMovie;
CREATE TABLE IF NOT EXISTS movies(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    yearOfRoadshow INT
);
INSERT INTO movies(title, yearOfRoadshow) VALUES('A Better Tomorrow', 1986);
