const db = require("../config/dbConnect");

const listSchools = async (req, res) => {
  try {
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "Missing latitude and longitude parameters" });
    }
    const querySchema = "SELECT * FROM schools";
    db.query(querySchema, (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const schools = result.map((school) => ({
        ...school,
        distance: calculateDistance(
          latitude,
          longitude,
          school.latitude,
          school.longitude
        ),
      }));
      schools.sort((a, b) => a.distance - b.distance);

      return res.status(200).json(schools);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = listSchools;
