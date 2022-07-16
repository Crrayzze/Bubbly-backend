CREATE DATABASE bubblyUsers;
USE bubblyUsers;

CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    userId text,
    email text,
    password text,
    emailCheck boolean,
    disabled boolean
);

--
-- id : Unique user ID number
-- userId : random UUID with user id defined when creating the account by the API used to check the email
-- email : User email
-- password : User password
-- emailCheck : User account verified or not (default: false)
-- disabled : User account disabled or not (default: false)
--