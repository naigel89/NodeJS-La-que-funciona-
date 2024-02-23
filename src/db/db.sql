CREATE DATABASE IF NOT EXISTS pesaoDeNarices;

use pesaoDeNarices;

CREATE TABLE users(
    id int auto_increment primary KEY,
    nameuser VARCHAR(255) not null,
    password VARCHAR(255) not null
);

DESCRIBE users