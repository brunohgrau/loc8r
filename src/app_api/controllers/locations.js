const mongoose = require("mongoose");
const Loc = mongoose.model("Location");

// Not working
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

// Working!
const locationsCreate = async (req, res) => {
  try {
    const newLocation = {
      name: req.body.name,
      address: req.body.address,
      facilities: req.body.facilities.split(","),
      coords: {
        type: "Point",
        coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
      },
      openingTimes: [
        {
          days: req.body.days1,
          opening: req.body.opening1,
          closing: req.body.closing1,
          closed: req.body.closed1,
        },
        {
          days: req.body.days2,
          opening: req.body.opening2,
          closing: req.body.closing2,
          closed: req.body.closed2,
        },
      ],
    };

    const location = await Loc.create(newLocation);
    res.status(201).json(location);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Working!
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

async function locationsUpdateOne(req, res) {
  try {
    if (!req.params.locationid) {
      return res
        .status(404)
        .json({ message: "Not found, locationid is required" });
    }

    const location = await Loc.findById(req.params.locationid)
      .select("-reviews -rating")
      .exec();

    if (!location) {
      return res.status(404).json({ message: "locationid not found" });
    }

    // Update location properties
    location.name = req.body.name;
    location.address = req.body.address;
    location.facilities = req.body.facilities.split(",");
    location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    location.openingTimes = [
      {
        days: req.body.days1,
        opening: req.body.opening1,
        closing: req.body.closing1,
        closed: req.body.closed1,
      },
      {
        days: req.body.days2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2,
      },
    ];

    await location.save();

    res.status(200).json(location);
  } catch (err) {
    res.status(400).json(err);
  }
}

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
