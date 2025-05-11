const db = require('../connection');

const getUsersWithVehicles = () => {
  return db.query(`
    SELECT
      Users.UserID,
      Users.FirstName,
      Users.LastName,
      Users.Email,
      Listings.ListingID,
      Listings.Price,
      Listings.DatePosted,
      Listings.Description
    FROM Users
    LEFT JOIN Listings ON Users.UserID = Listings.UserID
    ORDER BY Users.UserID, Listings.ListingID;
  `)
  .then(data => {
    return data.rows;
  });
};

module.exports = { getUsersWithVehicles };
