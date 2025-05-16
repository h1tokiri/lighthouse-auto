-- Drop existing tables if they exist
DROP TABLE IF EXISTS SavedVehicles CASCADE;
DROP TABLE IF EXISTS Vehicles CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS VehiclePhotos CASCADE;

-- Create Users table
CREATE TABLE Users (
    ID SERIAL PRIMARY KEY,
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
    ID SERIAL PRIMARY KEY,
    UserID INT REFERENCES Users(ID) ON DELETE CASCADE,
    Make VARCHAR(100) NOT NULL,
    Model VARCHAR(100) NOT NULL,
    Year INT NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    VIN VARCHAR(50) UNIQUE NOT NULL,
    Mileage INT NOT NULL,
    Color VARCHAR(50) NOT NULL,
    Transmission VARCHAR(50),
    BodyStyle VARCHAR(100),
    EngineCylinders INT,
    Condition VARCHAR(50),
    Description TEXT,
    ListingAddress TEXT,
    CreatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create SavedVehicles table
CREATE TABLE SavedVehicles (
    ID SERIAL PRIMARY KEY,
    UserID INT REFERENCES Users(ID) ON DELETE CASCADE,
    VehicleID INT REFERENCES Vehicles(ID) ON DELETE CASCADE
);

-- Create VehiclePhotos table
CREATE TABLE VehiclePhotos (
  ID SERIAL PRIMARY KEY,
  VehicleID INT REFERENCES Vehicles(ID) ON DELETE CASCADE,
  PhotoUrl VARCHAR(255) NOT NULL,
  Caption TEXT,
  UploadedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  IsPrimary BOOLEAN DEFAULT FALSE
);
