-- Drop existing tables if they exist
DROP TABLE IF EXISTS Listings CASCADE;
DROP TABLE IF EXISTS Vehicles CASCADE;
DROP TABLE IF EXISTS Users CASCADE;

-- Create Users table
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PhoneNumber VARCHAR(20),
    UserName VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Address TEXT
);

-- Create Vehicles table
CREATE TABLE Vehicles (
    VehicleID SERIAL PRIMARY KEY,
    Make VARCHAR(100) NOT NULL,
    Model VARCHAR(100) NOT NULL,
    Year INT NOT NULL,
    VIN VARCHAR(50) UNIQUE NOT NULL,
    Mileage INT NOT NULL,
    Color VARCHAR(50),
    Transmission VARCHAR(50),
    BodyStyle VARCHAR(100),
    EngineCylinders INT NOT NULL,
    Condition VARCHAR(50)
);

-- Create Listings table
CREATE TABLE Listings (
    ListingID SERIAL PRIMARY KEY,
    UserID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    VehicleID INT REFERENCES Vehicles(VehicleID) ON DELETE CASCADE,
    Price DECIMAL(10,2) NOT NULL,
    DatePosted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Description TEXT,
    ImageURL VARCHAR(255),
    ContactEmail VARCHAR(255),
    ContactPhoneNumber VARCHAR(20),
    ListingAddress TEXT
);
