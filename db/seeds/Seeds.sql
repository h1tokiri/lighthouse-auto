-- Insert Users
INSERT INTO Users (FirstName, LastName, Email, PhoneNumber, UserName, Password, Address) VALUES
('John', 'Doe', 'john@example.com', '123-456-7890', 'johndoe', 'password123', '123 Elm St'),
('Jane', 'Smith', 'jane@example.com', '987-654-3210', 'janesmith', 'securepass', '456 Oak Ave'),
('Bob', 'Johnson', 'bob@example.com', '555-123-4567', 'bobbyJ', 'bobpass', '789 Pine Rd'),
('Alice', 'Williams', 'alice@example.com', '444-987-6543', 'aliceW', 'alicepass', '321 Birch Ln'),
('Charlie', 'Brown', 'charlie@example.com', '222-333-4444', 'charlieB', 'charliepass', '654 Maple Dr');

-- Insert Vehicles
INSERT INTO Vehicles (UserID, Make, Model, Year, Price, VIN, Mileage, Color, Transmission, BodyStyle, EngineCylinders, Condition, Description, ListingAddress) VALUES
(1, 'Toyota', 'Camry', 2015, 12999.99, '1HGCM82633A123456', 80000, 'Blue', 'Automatic', 'Sedan', 4, 'Used', 'Great condition, low mileage', '123 Elm St'),
(2, 'Honda', 'Civic', 2018, 15999.99, '1HGFA16526L098765', 60000, 'Red', 'Automatic', 'Sedan', 4, 'Used', 'Sporty and fuel-efficient', '456 Oak Ave'),
(3, 'Ford', 'F-150', 2020, 32999.99, '2FTRX18W1YKA12345', 45000, 'Black', 'Automatic', 'Truck', 6, 'Used', 'Powerful engine, towing package', '789 Pine Rd'),
(4, 'Chevrolet', 'Silverado', 2019, 29999.99, '3GCPKSE71DG123456', 70000, 'White', 'Automatic', 'Truck', 6, 'Used', 'Spacious and rugged', '321 Birch Ln'),
(5, 'BMW', '3 Series', 2017, 25999.99, 'WBA8D9C56HA123456', 50000, 'Gray', 'Automatic', 'Sedan', 4, 'Used', 'Luxury feel, smooth ride', '654 Maple Dr'),
(1, 'Mercedes', 'C-Class', 2016, 28999.99, 'WDDGF56X08F123456', 55000, 'Silver', 'Automatic', 'Sedan', 4, 'Used', 'Luxury interior, reliable', '123 Elm St'),
(2, 'Jeep', 'Wrangler', 2021, 39999.99, '1C4HJXFG8MW123456', 20000, 'Green', 'Manual', 'SUV', 6, 'New', 'Off-road ready, rugged design', '456 Oak Ave'),
(3, 'Tesla', 'Model S', 2022, 69999.99, '5YJSA1E2XHF123456', 15000, 'White', 'Automatic', 'Sedan', 0, 'New', 'Electric, high performance', '789 Pine Rd'),
(4, 'Hyundai', 'Elantra', 2014, 8999.99, 'KMHDH4AE3DU123456', 90000, 'Blue', 'Automatic', 'Sedan', 4, 'Used', 'Reliable and fuel-efficient', '321 Birch Ln'),
(5, 'Mazda', 'CX-5', 2019, 23999.99, 'JM3KE2DY5G1234567', 65000, 'Red', 'Automatic', 'SUV', 4, 'Used', 'Compact SUV, great features', '654 Maple Dr');

-- Insert SavedVehicles (users saving vehicles)
INSERT INTO SavedVehicles (UserID, VehicleID) VALUES
(1, 3), (2, 5), (3, 1), (4, 8), (5, 2), (1, 7), (3, 9), (2, 4), (4, 10), (5, 6);

-- Insert VehiclePhotos (multiple images per vehicle)
INSERT INTO VehiclePhotos (VehicleID, PhotoUrl, Caption, IsPrimary) VALUES
(1, 'https://cloudinary.com/photo1.jpg', 'Front View', TRUE),
(1, 'https://cloudinary.com/photo2.jpg', 'Interior', FALSE),
(2, 'https://cloudinary.com/photo3.jpg', 'Side View', TRUE),
(2, 'https://cloudinary.com/photo4.jpg', 'Back View', FALSE),
(3, 'https://cloudinary.com/photo5.jpg', 'Truck Bed', TRUE),
(4, 'https://cloudinary.com/photo6.jpg', 'Front View', TRUE),
(5, 'https://cloudinary.com/photo7.jpg', 'Luxury Interior', TRUE),
(6, 'https://cloudinary.com/photo8.jpg', 'Side Profile', TRUE),
(7, 'https://cloudinary.com/photo9.jpg', 'Off-road Test', TRUE),
(8, 'https://cloudinary.com/photo10.jpg', 'Electric Dashboard', TRUE);
