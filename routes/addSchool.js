const db = require("../config/dbConnect");

const addSchhool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ message: "All the fields are required" });
    }
    const querySchema =
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(
      querySchema,
      [name, address, latitude, longitude],
      (error, result) => {
        if (error) {
          return res
            .status(401)
            .json({ message: "Failed to aadd the add school in the database" });
        }
        return res
          .status(200)
          .json({
            message: "School added successfully",
            schoolId: result.insertId,
          });
      }
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = addSchhool;
