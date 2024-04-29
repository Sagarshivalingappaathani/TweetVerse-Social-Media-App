-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS TweetVerse;

-- Switch to the specified database
USE TweetVerse;

-- Create the Users table 
CREATE TABLE IF NOT EXISTS Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    displayname VARCHAR(255),
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    dob DATE,
    bio TEXT,
    password VARCHAR(255) NOT NULL,
    profile_path VARCHAR(255) DEFAULT 'Uploads\profile_photos\Default_Profile_photo.png',
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Posts table
CREATE TABLE IF NOT EXISTS Posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    content TEXT NOT NULL,
    media_url VARCHAR(255),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create the Likes table
CREATE TABLE IF NOT EXISTS Likes (
    user_id INT,
    post_id INT,
    PRIMARY KEY (user_id, post_id),
    liked_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

-- Create the Comments table
CREATE TABLE IF NOT EXISTS Comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    post_id INT,
    content TEXT,
    commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

-- HashTag  Table
CREATE TABLE IF NOT EXISTS HashTag (
    hashTag_id INT AUTO_INCREMENT PRIMARY KEY,
    hashTag_name VARCHAR(255),
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

-- Create the Follows table
CREATE TABLE IF NOT EXISTS Follows (
    follower_id INT NOT NULL,
    following_id INT NOT NULL,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES Users(user_id),
    FOREIGN KEY (following_id) REFERENCES Users(user_id)
);

-- Create the Bookmarks table
CREATE TABLE IF NOT EXISTS Bookmarks (
    user_id INT,
    post_id INT,
    PRIMARY KEY (user_id, post_id),
    saved_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

-- Createing the Triggers
CREATE TRIGGER delete_likes_on_post_delete
BEFORE DELETE ON Posts
FOR EACH ROW
DELETE FROM Likes WHERE post_id = OLD.post_id;

CREATE TRIGGER delete_comments_on_post_delete
BEFORE DELETE ON Posts
FOR EACH ROW
DELETE FROM Comments WHERE post_id = OLD.post_id;

CREATE TRIGGER delete_hashtags_on_post_delete
BEFORE DELETE ON Posts
FOR EACH ROW
DELETE FROM HashTag WHERE post_id = OLD.post_id;


CREATE TRIGGER delete_bookmarks_on_post_delete
BEFORE DELETE ON Posts
FOR EACH ROW
DELETE FROM Bookmarks WHERE post_id = OLD.post_id;
