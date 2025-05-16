const getVehiclesByPriceRange = (minPrice, maxPrice) => {
  return db.query(`
    SELECT
      Vehicles.ID AS VehicleID,
      Vehicles.Make,
      Vehicles.Model,
      Vehicles.Year,
      Vehicles.Price,
      Vehicles.Color,
      Vehicles.Transmission,
      Vehicles.BodyStyle,
      Vehicles.Condition,
      VehiclePhotos.PhotoUrl AS PrimaryPhoto,
      Users.FirstName AS SellerFirstName,
      Users.LastName AS SellerLastName,
      Users.Email AS SellerEmail
    FROM Vehicles
    LEFT JOIN VehiclePhotos ON Vehicles.ID = VehiclePhotos.VehicleID AND VehiclePhotos.IsPrimary = TRUE
    JOIN Users ON Vehicles.UserID = Users.ID
    WHERE Vehicles.Price BETWEEN $1 AND $2
    ORDER BY Vehicles.Price ASC;
  `, [minPrice, maxPrice])
  .then(data => data.rows);
};
