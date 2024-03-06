CREATE DATABASE IF NOT EXISTS fablog;
USE fablog;

CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO roles (name) VALUES ('admin'), ('editor');

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT NOT NULL,
    publication_date DATE NOT NULL,
    content TEXT NOT NULL,
    img_url TEXT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(id)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;