const db = require('../connection');

const getUsersWithVehicles = () => {
  return db.query(`
    SELECT
      Users.ID AS UserID,
      Users.FirstName,
      Users.LastName,
      Users.Email,
      Vehicles.ID AS VehicleID,
      Vehicles.Make,
      Vehicles.Model,
      Vehicles.Year,
      Vehicles.Price,
      Vehicles.Description,
      VehiclePhotos.PhotoUrl AS PrimaryPhoto
    FROM Users
    LEFT JOIN Vehicles ON Users.ID = Vehicles.UserID
    LEFT JOIN VehiclePhotos ON Vehicles.ID = VehiclePhotos.VehicleID AND VehiclePhotos.IsPrimary = TRUE
    ORDER BY Users.ID, Vehicles.ID;
  `)
  .then(data => data.rows);
};

module.exports = { getUsersWithVehicles };
