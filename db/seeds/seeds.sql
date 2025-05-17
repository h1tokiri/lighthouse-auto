-- Insert Users
INSERT INTO Users (FirstName, LastName, Email, PhoneNumber, UserName, Password, Address) VALUES
('Alice', 'Johnson', 'alice.johnson@example.com', '416-555-1001', 'alicej', 'passwordhash1', '123 Queen St W, Toronto, ON'),
('Bob', 'Smith', 'bob.smith@example.com', '416-555-1002', 'bobsmith', 'passwordhash2', '456 King St E, Toronto, ON'),
('Carol', 'Lee', 'carol.lee@example.com', '416-555-1003', 'caroll', 'passwordhash3', '789 Bloor St W, Toronto, ON'),
('David', 'Nguyen', 'david.nguyen@example.com', '647-555-1004', 'davidn', 'passwordhash4', '321 Yonge St, Toronto, ON'),
('Eva', 'Martinez', 'eva.martinez@example.com', '647-555-1005', 'evam', 'passwordhash5', '654 Parliament St, Toronto, ON'),
('Frank', 'Brown', 'frank.brown@example.com', '416-555-1006', 'frankb', 'passwordhash6', '987 Spadina Ave, Toronto, ON'),
('Grace', 'Davis', 'grace.davis@example.com', '647-555-1007', 'graced', 'passwordhash7', '159 College St, Toronto, ON'),
('Henry', 'Wilson', 'henry.wilson@example.com', '416-555-1008', 'henryw', 'passwordhash8', '753 Dundas St W, Toronto, ON'),
('Ivy', 'Taylor', 'ivy.taylor@example.com', '647-555-1009', 'ivyt', 'passwordhash9', '852 Queen St E, Toronto, ON'),
('Jack', 'Anderson', 'jack.anderson@example.com', '416-555-1010', 'jacka', 'passwordhash10','951 King St W, Toronto, ON');

-- Insert Vehicles (Linked to Users)
INSERT INTO Vehicles (UserID, Make, Model, Year, Price, VIN, Mileage, Color, Transmission, BodyStyle, EngineCylinders, Condition, Description, ListingAddress) VALUES
(1, 'Toyota', 'Camry', 2018, 18999.00, 'VIN0000000001', 45000, 'White', 'Automatic', 'Sedan', 4, 'Used', 'Well-maintained, single owner, no accidents.', '100 Main St, Toronto, ON'),
(1, 'Audi', 'A6', 2007, 4700.00, NULL, 204000, 'silver', 'automatic', 'sedan', 6, 'fair', 'Great car, new brakes, tires and a fresh oil change. $4700/OBO/Trade', 'Parksville B.C.'),
(1, 'BMW', '745i', 2002, 5000.00, NULL, 165000, 'Space Gray', 'Automatic', 'Sedan', 8, 'Good', 'Top trim package', 'Parksville B.C.'),
(2, 'Honda', 'Civic', 2020, 20999.00, 'VIN0000000002', 30000, 'Black', 'Manual', 'Sedan', 4, 'Used', 'Sport trim with recent tire replacement.', '200 Queen St W, Toronto, ON'),
(3, 'Ford', 'F-150', 2017, 27999.00, 'VIN0000000003', 60000, 'Blue', 'Automatic', 'Truck', 6, 'Used', 'XLT package, tow hitch included.', '300 King St E, Toronto, ON'),
(4, 'Tesla', 'Model 3', 2021, 39999.00, 'VIN0000000004', 15000, 'Red', 'Automatic', 'Sedan', 0, 'Certified Pre-Owned', 'Long range battery, Autopilot included.', '400 Yonge St, Toronto, ON'),
(5, 'BMW', '3 Series', 2019, 31999.00, 'VIN0000000005', 25000, 'Grey', 'Automatic', 'Sedan', 4, 'Used', 'Premium package with heated seats.', '500 Bloor St W, Toronto, ON'),
(6, 'Audi', 'A4', 2018, 28999.00, 'VIN0000000006', 35000, 'White', 'Automatic', 'Sedan', 4, 'Certified Pre-Owned', 'Includes virtual cockpit display.', '600 Spadina Ave, Toronto, ON'),
(7, 'Mercedes-Benz', 'C300', 2020, 34999.00, 'VIN0000000007', 22000, 'Black', 'Automatic', 'Sedan', 4, 'Used', 'AMG line exterior package.', '700 Dundas St W, Toronto, ON'),
(8, 'Subaru', 'Outback', 2019, 26999.00, 'VIN0000000008', 40000, 'Green', 'Automatic', 'Wagon', 4, 'Used', 'All-wheel drive, roof rack installed.', '800 College St, Toronto, ON'),
(9, 'Jeep', 'Wrangler', 2016, 23999.00, 'VIN0000000009', 55000, 'Yellow', 'Manual', 'SUV', 6, 'Used', 'Lift kit and off-road tires.', '900 Queen St E, Toronto, ON'),
(10, 'Chevrolet', 'Silverado', 2021, 37999.00, 'VIN0000000010', 20000, 'Silver', 'Automatic', 'Truck', 8, 'Used', 'Crew cab with bed liner.', '1000 King St W, Toronto, ON'),
(1, 'Nissan', 'Altima', 2018, 17999.00, 'VIN0000000011', 48000, 'Blue', 'Automatic', 'Sedan', 4, 'Used', 'Fuel efficient commuter car.', '1100 Main St, Toronto, ON'),
(2, 'Volkswagen', 'Golf', 2019, 19999.00, 'VIN0000000012', 30000, 'White', 'Manual', 'Hatchback', 4, 'Used', 'Sport edition with sunroof.', '1200 Queen St W, Toronto, ON'),
(3, 'Hyundai', 'Elantra', 2020, 15999.00, 'VIN0000000013', 25000, 'Red', 'Automatic', 'Sedan', 4, 'Used', 'Low mileage, excellent condition.', '1300 King St E, Toronto, ON'),
(4, 'Kia', 'Sorento', 2019, 24999.00, 'VIN0000000014', 32000, 'Black', 'Automatic', 'SUV', 6, 'Used', 'Third row seating.', '1400 Yonge St, Toronto, ON'),
(5, 'Mazda', 'CX-5', 2018, 22999.00, 'VIN0000000015', 45000, 'Grey', 'Automatic', 'SUV', 4, 'Used', 'Premium trim with leather interior.', '1500 Bloor St W, Toronto, ON');

-- Insert SavedVehicles (Each user saves a vehicle they don’t own)
INSERT INTO SavedVehicles (UserID, VehicleID) VALUES
(1, 2), (2, 3), (3, 4), (4, 5), (5, 6), (6, 7), (7, 8), (8, 9), (9, 10), (10, 1);

-- Insert VehiclePhotos (Each vehicle has at least one image)
INSERT INTO VehiclePhotos (VehicleID, PhotoUrl, Caption, IsPrimary) VALUES
(1, 'https://example.com/photos/1_front.jpg', 'Front view', TRUE),
(2, 'https://example.com/photos/2_side.jpg', 'Passenger side', FALSE),
(3, 'https://example.com/photos/3_rear.jpg', 'Rear view', FALSE),
(4, 'https://example.com/photos/4_interior.jpg', 'Interior view', TRUE),
(5, 'https://example.com/photos/5_engine.jpg', 'Engine bay', TRUE),
(6, 'https://example.com/photos/6_front.jpg', 'Front angle', TRUE),
(7, 'https://example.com/photos/7_side.jpg', 'Driver side', TRUE),
(8, 'https://example.com/photos/8_rear.jpg', 'Rear angle', TRUE),
(9, 'https://example.com/photos/9_interior.jpg', 'Cabin overview', TRUE),
(10,'https://example.com/photos/10_engine.jpg', 'Under the hood', TRUE),
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
(3, 'uploads/56a777eca86db9664f6b54d612c950ac', 'Trunk', FALSE);
