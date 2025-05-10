const db = require('../connection');

const getListings = () => {
  return db.query(`
    SELECT
      Listings.ListingID,
      Users.FirstName,
      Users.LastName,
      Vehicles.Make,
      Vehicles.Model,
      Vehicles.Year,
      Vehicles.Color,
      Listings.Price,
      Listings.ContactPhoneNumber
    FROM Listings
    JOIN Users ON Listings.UserID = Users.UserID
    JOIN Vehicles ON Listings.VehicleID = Vehicles.VehicleID
    ORDER BY Listings.Price ASC;
  `)
  .then(data => {
    return data.rows;
  });
};

module.exports = { getListings };
