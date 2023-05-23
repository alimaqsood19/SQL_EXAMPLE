CREATE DATABASE library_db;

USE library_db;

CREATE TABLE libraries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(255),
    address varchar(255)
);

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  publication_year INT,
  library_id INT,
  FOREIGN KEY (library_id) REFERENCES libraries(id) ON DELETE CASCADE
);


SELECT * FROM libraries;
SELECT * FROM libraries WHERE name = "Calgary";

INSERT INTO libraries (name, address)
VALUES ("Vancouver", "99 Robson St");

UPDATE libraries 
SET name = "Sauga"
WHERE id = 1;

DELETE FROM libraries WHERE id = 1;