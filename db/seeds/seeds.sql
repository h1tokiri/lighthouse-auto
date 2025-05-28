-- Insert Users
INSERT INTO Users (FirstName, LastName, Email, PhoneNumber, UserName, Password, Address) VALUES
('Alice', 'Johnson', 'user1@user.com', '416-555-1001', 'alicej', '$2a$12$Mq8.nED.wVD6vazITcw4uesozxbcw364ewe29V3meAf439NlJlAq6', '123 Queen St W, Toronto, ON'),
('Bob', 'Smith', 'user2@user.com', '416-555-1002', 'bobsmith', '$2a$12$Mq8.nED.wVD6vazITcw4ue7lN/rgJ/1nK.vyl99e2lYKC31KcMKI2', '456 King St E, Toronto, ON'),
('Carol', 'Lee', 'user3@user.com', '416-555-1003', 'caroll', '$2a$12$Mq8.nED.wVD6vazITcw4ueHYFLhNLv6wGb5oSH2GLLdUT8K6A.b12', '789 Bloor St W, Toronto, ON'),
('David', 'Nguyen', 'user4@user.com', '647-555-1004', 'davidn', '$2a$12$Mq8.nED.wVD6vazITcw4ueS74r1zC0lm9rXv.mTIUTeY7A2KlMsIa', '321 Yonge St, Toronto, ON'),
('Eva', 'Martinez', 'user5@user.com', '647-555-1005', 'evam', '$2a$12$Mq8.nED.wVD6vazITcw4ueVZehJXQaOiO1m5V2a9aT/9TsKayjT7m', '654 Parliament St, Toronto, ON'),
('Frank', 'Brown', 'user6@user.com', '416-555-1006', 'frankb', '$2a$12$Mq8.nED.wVD6vazITcw4ue5arB2GZ39067PIbkv6HHo3ABas.7zay', '987 Spadina Ave, Toronto, ON'),
('Grace', 'Davis', 'user7@user.com', '647-555-1007', 'graced', '$2a$12$Mq8.nED.wVD6vazITcw4ueY2jAgarvlDjTwHhEgCrJdKflPXjnhLi', '159 College St, Toronto, ON'),
('Henry', 'Wilson', 'user8@user.com', '416-555-1008', 'henryw', '$2a$12$Mq8.nED.wVD6vazITcw4ueJS8.LFz8heJxGI/fzBz1AbyE1LbDZoi', '753 Dundas St W, Toronto, ON'),
('Ivy', 'Taylor', 'user9@user.com', '647-555-1009', 'ivyt', '$2a$12$Mq8.nED.wVD6vazITcw4ue3e72cysp.36Da1VYzUB0BfabZ6fbuSy', '852 Queen St E, Toronto, ON'),
('Jack', 'Anderson', 'user10@user.com', '416-555-1010', 'jacka', '$2a$12$Mq8.nED.wVD6vazITcw4ueaSrA4gdPlbNMl3HqpWgRv.mT.ryIAlS','951 King St W, Toronto, ON');

-- Insert Vehicles (Linked to Users)
INSERT INTO Vehicles (UserID, Make, Model, Year, Price, VIN, Mileage, Color, Transmission, BodyStyle, EngineCylinders, Condition, Description, ListingAddress) VALUES
(1, 'Toyota', 'Camry', 2015, 18999.00, 'VIN0000000001', 45000, 'Black', 'Automatic', 'Sedan', 4, 'Fair', 'Well-maintained, single owner, no accidents.', '100 Main St, Toronto, ON'),
(1, 'Audi', 'A6', 2007, 5500.00, 'VIN0000000999', 48500, 'Silver', 'Automatic', 'Hatch', 6, 'Good', 'Test description', '22 Centre Street, Calgary, AB'),
(1, 'BMW', '550i GT', 2007, 4700.00, NULL, 204000, 'Space Gray', 'automatic', 'sedan', 6, 'Fair', 'Great car, new brakes, tires and a fresh oil change. $4700/OBO/Trade', 'Parksville B.C.'),
(1, 'Honda', 'Accord', 2018, 5000.00, NULL, 165000, 'Black', 'Automatic', 'Sedan', 8, 'Good', 'Top trim package', 'Parksville B.C.'),
(2, 'Ford', 'F-150', 2017, 20999.00, 'VIN0000000002', 30000, 'Blue', 'Manual', 'Sedan', 4, 'Good', 'Sport trim with recent tire replacement.', '200 Queen St W, Toronto, ON'),
(3, 'Tesla', 'Model X', 2021, 27999.00, 'VIN0000000003', 60000, 'White', 'Automatic', 'Truck', 6, 'Fair', 'Long range battery.', '300 King St E, Toronto, ON'),
(4, 'BMW', '3 Series', 2019, 39999.00, 'VIN0000000004', 15000, 'White', 'Automatic', 'Sedan', 6, 'Good', 'Leather seats.', '400 Yonge St, Toronto, ON'),
(5, 'Audi', 'A4', 2018, 31999.00, 'VIN0000000005', 25000, 'Grey', 'Automatic', 'Sedan', 4, 'Good', 'Premium package with heated seats.', '500 Bloor St W, Toronto, ON'),
(6, 'Mercedes-Benz', 'C300', 2018, 28999.00, 'VIN0000000006', 35000, 'Gray', 'Automatic', 'Sedan', 4, 'Good', 'AMG line exterior package.', '600 Spadina Ave, Toronto, ON'),
(7, 'Subaru', 'Outback', 2019, 34999.00, 'VIN0000000007', 22000, 'Blue', 'Automatic', 'Wagon', 4, 'Fair', 'All wheel drive, roof rack installed.', '700 Dundas St W, Toronto, ON'),
(8, 'Jeep', 'Wrangler', 2019, 26999.00, 'VIN0000000008', 40000, 'Green', 'Automatic', 'Truck', 4, 'Fair', 'Lift kit and off road tires.', '800 College St, Toronto, ON'),
(9, 'Chevrolet', 'Colorado', 2021, 43999.00, 'VIN0000000009', 55000, 'White', 'Automatic', 'Truck', 6, 'Good', 'Crew cab with bed liners.', '900 Queen St E, Toronto, ON'),
(10, 'Nissan', 'Altima', 2018, 37999.00, 'VIN0000000010', 20000, 'Black', 'Automatic', 'Sedan', 8, 'Rough', 'Fuel efficient commuter.', '1000 King St W, Toronto, ON'),
(1, 'Volkswagen', 'Golf', 2019, 17999.00, 'VIN0000000011', 48000, 'White', 'Automatic', 'Hatchback', 4, 'Good', 'Sport edition with sunroof.', '1100 Main St, Toronto, ON'),
(2, 'Hyundai', 'Elantra', 2020, 15999.00, 'VIN0000000012', 30000, 'Gray', 'Manual', 'Sedan', 4, 'Good', 'Low mileage, excellent shape.', '1200 Queen St W, Toronto, ON'),
(3, 'Kia', 'Soul', 2020, 15999.00, 'VIN0000000013', 25000, 'White', 'Automatic', 'SUV', 6, 'Fair', 'Third row seating.', '1300 King St E, Toronto, ON'),
(4, 'Mazda', 'CX-30', 2019, 24999.00, 'VIN0000000014', 32000, 'Silver', 'Automatic', 'SUV', 6, 'Good', 'Premium leather interior.', '1400 Yonge St, Toronto, ON');

-- Insert SavedVehicles (Each user saves a vehicle they don’t own)
INSERT INTO SavedVehicles (UserID, VehicleID) VALUES
(1, 2), (2, 3), (3, 4), (4, 5), (5, 6), (6, 7), (7, 8), (8, 9), (9, 10), (10, 1);

-- Insert VehiclePhotos (Each vehicle has at least one image)
INSERT INTO VehiclePhotos (VehicleID, PhotoUrl, Caption, IsPrimary) VALUES
(1, 'uploads/2018Camry_1.jpg', 'Front', TRUE),
(2, 'uploads/f62e3e697f77ec54ebf5f34cb9d8478b', 'drivers side', TRUE),
(2, 'uploads/58758db06de09cc76515a6dab1fa2442', 'front', FALSE),
(2, 'uploads/9652385a6ecbe198d93a3fa4271b683b', 'dash', FALSE),
(2, 'uploads/9b7b89d714d9eb64f0c47055450ca2a4', 'front seat', FALSE),
(2, 'uploads/02e883e7a335827df3ac69edf568d27b', 'rear', FALSE),
(2, 'uploads/90b3f671ec8ff00fecd369271e1f391a', 'engine', FALSE),
(3, 'uploads/3bf27fcdc1d773dd904a5a2f3654c258', 'Front', TRUE),
(3, 'uploads/1977cda21f0924fab930bbac15d879ca', 'Rear Seats', FALSE),
(3, 'uploads/a4fdaf66a334808e500ead0dc9a9b09c', 'Rear', FALSE),
(3, 'uploads/c7dc7cb208cbd4107bfbbe0aa16ec17d', 'Front Seats', FALSE),
(3, 'uploads/f1e5317d92fcde9760f6893eb8445fb5', 'Dash', FALSE),
(3, 'uploads/56a777eca86db9664f6b54d612c950ac', 'Trunk', FALSE),
(4, 'uploads/2020Civic_4.jpg', 'Front', TRUE),
(5, 'uploads/2017F-150_5.jpg', 'Front', TRUE),
(6, 'uploads/2021Model3_6.jpg', 'Front', TRUE),
(7, 'uploads/2019BMW3_7.jpg', 'Front', TRUE),
(8, 'uploads/2018A4_8.jpg', 'Front', TRUE),
(9, 'uploads/2020C300_9.jpg', 'Front', TRUE),
(10, 'uploads/2019Outback_10.jpg', 'Front', TRUE),
(11, 'uploads/2016Wrangler_11.jpg', 'Front', TRUE),
(12, 'uploads/2021Silverado_12.jpg', 'Front', TRUE),
(13, 'uploads/2018Altima_13.jpg', 'Front', TRUE),
(14, 'uploads/2019Golf_14.jpg', 'Front', TRUE),
(15, 'uploads/2020Elantra_15.jpg', 'Front', TRUE),
(16, 'uploads/2019Sorento_16.jpg', 'Front', TRUE),
(17, 'uploads/2018CX-5_17.jpg', 'Front', TRUE);
