-- Insert Users
INSERT INTO Users (FirstName, LastName, Email, PhoneNumber, UserName, Password, Address)
VALUES
('Andrew', 'Smith', 'andrew@example.com', '555-1234', 'andrewsmith', 'securepass1', '123 Maple St'),
('Sophia', 'Johnson', 'sophia@example.com', '555-5678', 'sophiajohnson', 'securepass2', '456 Oak Ave'),
('Michael', 'Brown', 'michael@example.com', '555-9101', 'michaelbrown', 'securepass3', '789 Pine Rd'),
('Emily', 'Davis', 'emily@example.com', '555-1111', 'emilydavis', 'securepass4', '234 Birch Ln'),
('Daniel', 'Wilson', 'daniel@example.com', '555-2222', 'danielwilson', 'securepass5', '567 Cedar Blvd');

-- Insert Vehicles
INSERT INTO Vehicles (Make, Model, Year, VIN, Mileage, Color, Transmission, BodyStyle, EngineCylinders, Condition)
VALUES
('Toyota', 'Camry', 2021, '1HGCM82633A123456', 30000, 'Blue', 'Automatic', 'Sedan', 4, 'Good'),
('Honda', 'Civic', 2019, 'JH4DA9350KS123789', 45000, 'Red', 'Manual', 'Coupe', 4, 'Fair'),
('Ford', 'F-150', 2022, '3GCPWBEK1JG123012', 15000, 'Black', 'Automatic', 'Truck', 6, 'Excellent'),
('Chevrolet', 'Malibu', 2020, '1G1ZD5ST1JF123789', 28000, 'Silver', 'Automatic', 'Sedan', 4, 'Good'),
('BMW', 'X5', 2023, '5UXCR6C07J1234567', 5000, 'White', 'Automatic', 'SUV', 6, 'New');

-- Insert Listings (20 total, ensuring users have multiple listings)
INSERT INTO Listings (UserID, VehicleID, Price, DatePosted, Description, ImageURL, ContactEmail, ContactPhoneNumber, ListingAddress)
VALUES
(1, 1, 25000.00, '2025-05-01', 'Well-maintained Toyota Camry, perfect for daily driving.', 'https://source.unsplash.com/800x600/?car,toyota', 'andrew@example.com', '555-1234', '123 Maple St'),
(2, 2, 18000.00, '2025-05-02', 'Sporty Honda Civic with manual transmission.', 'https://source.unsplash.com/800x600/?car,honda', 'sophia@example.com', '555-5678', '456 Oak Ave'),
(3, 3, 40000.00, '2025-05-03', 'Powerful Ford F-150 with low mileage.', 'https://source.unsplash.com/800x600/?car,ford', 'michael@example.com', '555-9101', '789 Pine Rd'),
(4, 4, 22000.00, '2025-05-04', 'Chevrolet Malibu, great condition and fuel efficiency.', 'https://source.unsplash.com/800x600/?car,chevrolet', 'emily@example.com', '555-1111', '234 Birch Ln'),
(5, 5, 60000.00, '2025-05-05', 'Luxury BMW X5 with top-tier features.', 'https://source.unsplash.com/800x600/?car,bmw', 'daniel@example.com', '555-2222', '567 Cedar Blvd'),
(1, 3, 41000.00, '2025-05-06', 'Another listing for Ford F-150.', 'https://source.unsplash.com/800x600/?car,ford', 'andrew@example.com', '555-1234', '123 Maple St'),
(2, 4, 23000.00, '2025-05-07', 'Another listing for Chevrolet Malibu.', 'https://source.unsplash.com/800x600/?car,chevrolet', 'sophia@example.com', '555-5678', '456 Oak Ave'),
(3, 5, 62000.00, '2025-05-08', 'High-end BMW X5 available.', 'https://source.unsplash.com/800x600/?car,bmw', 'michael@example.com', '555-9101', '789 Pine Rd'),
(4, 1, 26000.00, '2025-05-09', 'Excellent Toyota Camry in great condition.', 'https://source.unsplash.com/800x600/?car,toyota', 'emily@example.com', '555-1111', '234 Birch Ln'),
(5, 2, 19000.00, '2025-05-10', 'Honda Civic - Affordable and reliable.', 'https://source.unsplash.com/800x600/?car,honda', 'daniel@example.com', '555-2222', '567 Cedar Blvd');
