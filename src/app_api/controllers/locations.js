const mongoose = require("mongoose");
const Loc = mongoose.model("Location");

const locationsListByDistance = async (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const near = {
    type: "Point",
    coordinates: [lng, lat],
  };
  const geoOptions = {
    distanceField: "distance.calculated",
    key: "coords",
    spherical: true,
    maxDistance: 20000,
    limit: 10,
  };
  if (!lng || !lat) {
    return res
      .status(404)
      .json({ message: "lng and lat query parameters are required" });
  }
  try {
    const results = await Loc.aggregate([
      {
        $geoNear: {
          near,
          ...geoOptions,
        },
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};

const locationsCreate = (req, res) => {
  res.status(200).json({ status: "success" });
};

const locationsReadOne = async (req, res) => {
  try {
    const location = await Loc.findById(req.params.locationid);

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* 

const locationsReadOne = (req, res) => {
  Loc.findById(req.params.locationid).exec((err, location) => {
    if (!location) {
      return res.status(404).json({ message: "location not found" });
    } else if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(location);
  });
  res.status(200).json({ status: "success" });
};


*/

const locationsUpdateOne = (req, res) => {
  res.status(200).json({ status: "success" });
};
const locationsDeleteOne = (req, res) => {
  res.status(200).json({ status: "success" });
};

module.exports = {
  locationsListByDistance,
  locationsCreate,
  locationsReadOne,
  locationsUpdateOne,
  locationsDeleteOne,
};
