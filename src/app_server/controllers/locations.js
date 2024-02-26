/* GET 'home' page */

const homelist = (req, res) => {
  res.render("locations-list", {
    title: "Loc8r - find a place to work with wifi",
    pageHeader: {
      title: "Loc8r",
      strapline: "Find place to work with wifi near you",
    },
    locations: [
      {
        name: "Starcups",
        address: "125 High Street, Reading, RG6 1PS",
        rating: 3,
        facilities: ["Hot drinks", "Food", "Premium wifi"],
        distance: "100m",
      },
      {
        name: "Cafe Hero",
        address: "125 High Street, Reading, RG6 1PS",
        rating: 3,
        facilities: ["Hot drinks", "Food", "Premium wifi"],
        distance: "200m",
      },
      {
        name: "Cafe Hero",
        address: "125 High Street, Reading, RG6 1PS",
        rating: 3,
        facilities: ["Hot drinks", "Food", "Premium wifi"],
        distance: "200m",
      },
    ],
  });
};

/* GET 'Location info' page */

const locationInfo = (req, res) => {
  res.render("location-info", { title: "Location info" });
};

/* GET 'Add review' page */

const addReview = (req, res) => {
  res.render("location-review-form", { title: "Add review" });
};

module.exports = { homelist, locationInfo, addReview };
