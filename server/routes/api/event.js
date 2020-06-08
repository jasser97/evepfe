const express = require("express");
const router = express.Router();
const Events = require("../../models/Event");
const { check, validationResult } = require("express-validator");
const auth = require("../../config/auth");
const User = require("../../models/User");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
//save image in node server

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploadsEvent/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    }
    return cb(null, false, new Error("fjzefzfze"));
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/uploadImage", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) returnres.json({ success: false, err });
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});
router.post("/uploadEvent", auth, (req, res) => {
  const events = new Events(req, body);
  events.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
router.post(
  "/",
  auth,
  [
    check("Type_event", "veuillez saisir votre Type_évènement").not().isEmpty(),
    check("City", "veuillez entrer le nom de votre ville").not().isEmpty(),
    check("Country", "veuillez entrer le nom de votre pays").not().isEmpty(),
    check("Zip_Code", "S'il vous plait, entrer votre code postal")
      .not()
      .isEmpty(),
    check("Titre", "veuillez saisir le titre").not().isEmpty(),
    check("Description", "veuillez saisir la description").not().isEmpty(),
    check("Start_date", "veuillez entrer la date de début").not().isEmpty(),
    check("End_date", "veuillez entrer la date de fin").not().isEmpty(),
    check("EventImage", "veuillez entrer les images").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const {
      Type_event,
      City,
      Country,
      Zip_Code,
      Titre,
      Description,
      Start_date,
      EventImage,
      End_date,
    } = req.body;

    event = new Events({
      Type_event,
      City,
      Country,
      Zip_Code,
      Description,
      Start_date,
      EventImage,
      End_date,
      Titre,
      id: uuidv4(),
      User: req.user.id,
    });
    event.save((err) => {
      if (err) {
        if (err.errors.EventImage) {
          res
            .status(400)
            .json([{ sucess: false, message: err.errors.EventImage.message }]);
        }
        if (err.errors.Type_event) {
          res
            .status(400)
            .json([{ sucess: false, message: err.errors.Type_event.message }]);
        } else {
          if (err.errors.City) {
            res
              .status(400)
              .json([{ success: false, message: err.errors.City.message }]);
          } else {
            if (err.errors.Country) {
              res.status(400).json([
                {
                  success: false,
                  message: err.errors.Country.message,
                },
              ]);
            } else {
              if (err.errors.Zip_Code) {
                res.status(400).json([
                  {
                    success: false,
                    message: err.errors.Zip_Code.message,
                  },
                ]);
              } else {
                if (err.errors.Titre) {
                  res.status(400).json([
                    {
                      success: false,
                      message: err.errors.Titre.message,
                    },
                  ]);
                } else {
                  res.status(400).json([
                    {
                      success: false,
                      message: "could not save event. Error",
                    },
                  ]);
                }
              }
            }
          }
        }
      } else {
        res.json({ event });
      }
    });
  }
);

//get  events filterd by adherent
//protected route
router.get("/", auth, (req, res) => {
  Events.find({ User: req.user.id })
    .then((Events) => res.json(Events))
    .catch((err) => console.log(err.message));
});

//get all events

router.get("/all", (req, res) => {
  Events.find({})
    .then((Events) => res.json(Events))
    .catch((err) => console.log(err.message));
});

// get event by id

router.get("/singleEvent/:id", (req, res) => {
  if (!req.params.id) {
    res.json({ success: false, message: "No event id was provided" });
  } else {
    Events.find({ id: req.params.id.toString() }, (err, event) => {
      if (err) {
        res.json({ sucess: false, message: err });
      } else {
        if (!event) {
          res.json({ sucess: false, message: "Event not found. " });
        } else {
          res.json(event[0]);
        }
      }
    });
  }
});

//update event
router.put(
  "/:id",
  auth,

  [
    check("Zip_Code", "Composé de 4 chiffre")
      .isLength({ min: 4, max: 4 })
      .optional(),
    check("Type_event", "max 25").isLength({ max: 25 }).optional(),
    check("Country", "max 25").isLength({ max: 25 }).optional(),
    check("City", "max 25").isLength({ max: 25 }).optional(),
    check("Titre", "max 25").isLength({ max: 25 }).optional(),
  ],

  (req, res) => {
    const {
      Type_event,
      City,
      Country,
      Zip_Code,
      Titre,
      Description,
      Start_date,
      EventImage,
      End_date,
      Likes,
      DisLikes,
      Sponsor,
    } = req.body;
    let updateEvent = {};

    //build a event object
    if (Type_event) updateEvent.Type_event = Type_event;
    if (City) updateEvent.City = City;
    if (Country) updateEvent.Country = Country;
    if (Zip_Code) updateEvent.Zip_Code = Zip_Code;
    if (Titre) updateEvent.Titre = Titre;
    if (Description) updateEvent.Description = Description;
    if (Start_date) updateEvent.Start_date = Start_date;
    if (EventImage) updateEvent.age = EventImage;
    if (End_date) updateEvent.End_date = End_date;
    if (Likes) updateEvent.Likes = Likes;
    if (DisLikes) updateEvent.DisLikes = DisLikes;
    if (Sponsor) updateEvent.Sponsor = Sponsor;

    Events.findById(req.params.id)
      .then((event) => {
        if (!event) {
          return res.json({ msg: "event not find" });
        } else if (event.User.toString() !== req.user.id) {
          res.json({ msg: "not authorized" });
        } else {
          Events.findByIdAndUpdate(
            req.params.id,
            { $set: updateEvent },
            { useFindAndModify: false },
            (err, data) => {
              res.json({ msg: "event updated" });
            }
          );
        }
      })
      .catch((err) => console.log(err.message));
  }
);

//delete event
//private route
router.delete("/:id", auth, (req, res) => {
  Events.findById(req.params.id)
    .then((event) => {
      if (!event) {
        return res.json({ msg: "event not find" });
      } else if (event.User.toString() !== req.user.id) {
        res.json({ msg: "not authorized" });
      } else {
        Events.findByIdAndDelete(
          req.params.id,

          { useFindAndModify: false },
          (err, data) => {
            res.json({ msg: "event deleted" });
          }
        );
      }
    })
    .catch((err) => console.log(err.message));
});
router.put("/likeEvent/:id", auth, (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .json([{ success: false, message: "No event id was provided" }]);
  } else {
    Events.findOne({ _id: req.params.id }, (err, event) => {
      if (err) {
        res.status(400).json([{ success: false, message: "Invalid event id" }]);
      } else {
        if (!event) {
          res
            .status(400)
            .json([{ success: false, message: "That event was not found  " }]);
        } else {
          User.findById(req.body.id, (err, user) => {
            if (err) {
              res
                .status(400)
                .json([{ success: false, message: "Something went wrong" }]);
            } else {
              if (!user) {
                res.status(400).json([
                  {
                    success: false,
                    message: "could not authenticate user.",
                  },
                ]);
              } else {
                if (user._id.toString() === event.User.toString()) {
                  res.status(400).json([
                    {
                      success: false,
                      message: "cannot like your own post",
                    },
                  ]);
                } else {
                  if (event.likedBy.includes(user.userName)) {
                    res.status(400).json([
                      {
                        success: false,
                        message: "You already liked this post",
                      },
                    ]);
                  } else {
                    if (event.DisLikedBy.includes(user.userName)) {
                      event.DisLikes--;
                      const arrayIndex = event.DisLikedBy.indexOf(
                        user.userName
                      );
                      event.DisLikedBy.splice(arrayIndex, 1);
                      event.Likes++;
                      event.likedBy.push(user.userName);
                      event.save((err) => {
                        if (err) {
                          res.status(400).json([
                            {
                              success: false,
                              message: "something went wrong.",
                            },
                          ]);
                        } else {
                          res.json([
                            {
                              success: true,
                              message: "event liked",
                            },
                          ]);
                        }
                      });
                    } else {
                      event.Likes++;
                      event.likedBy.push(user.userName);
                      event.save((err) => {
                        if (err) {
                          res.status(400).json([
                            {
                              success: false,
                              message: "something went wrong .",
                            },
                          ]);
                        } else {
                          res.json(event.Likes);
                        }
                      });
                    }
                  }
                }
              }
            }
          });
        }
      }
    });
  }
});

//dislaikes
router.put("/disLikeEvent/:id", auth, (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .json([{ success: false, message: "No event id was provided" }]);
  } else {
    Events.findOne({ _id: req.params.id }, (err, event) => {
      if (err) {
        res.status(400).json([{ success: false, message: "Invalid event id" }]);
      } else {
        if (!event) {
          res
            .status(400)
            .json([{ success: false, message: "That event was not found  " }]);
        } else {
          User.findById(req.body.id, (err, user) => {
            if (err) {
              res
                .status(400)
                .json([{ success: false, message: "Something went wrong" }]);
            } else {
              if (!user) {
                res.status(400).json([
                  {
                    success: false,
                    message: "could not authenticate user.",
                  },
                ]);
              } else {
                if (user._id.toString() === event.User.toString()) {
                  res.status(400).json([
                    {
                      success: false,
                      message: "cannot dislike your own post",
                    },
                  ]);
                } else {
                  if (event.DisLikedBy.includes(user.userName)) {
                    res.status(400).json([
                      {
                        success: false,
                        message: "You already disliked this post",
                      },
                    ]);
                  } else {
                    if (event.likedBy.includes(user.userName)) {
                      event.Likes--;
                      const arrayIndex = event.likedBy.indexOf(user.userName);
                      event.likedBy.splice(arrayIndex, 1);
                      event.DisLikes++;
                      event.DisLikedBy.push(user.userName);
                      event.save((err) => {
                        if (err) {
                          res.status(400).json([
                            {
                              success: false,
                              message: "something went wrong .",
                            },
                          ]);
                        } else {
                          res.json([
                            {
                              success: true,
                              message: "event disliked",
                            },
                          ]);
                        }
                      });
                    } else {
                      event.DisLikes++;
                      event.DisLikedBy.push(user.userName);
                      event.save((err) => {
                        if (err) {
                          res.status(400).json([
                            {
                              success: false,
                              message: "something went wrong .",
                            },
                          ]);
                        } else {
                          res.json([
                            {
                              success: true,
                              message: "event disliked",
                            },
                          ]);
                        }
                      });
                    }
                  }
                }
              }
            }
          });
        }
      }
    });
  }
});

router.post("/comment/:id", auth, (req, res) => {
  // Check if comment was provided in request body
  if (!req.body.comment) {
    res.status(400).json([{ success: false, message: "No comment provided" }]); // Return error message
  } else {
    // Check if id was provided in request body
    if (!req.params.id) {
      res.status(400).json([{ success: false, message: "No id was provided" }]); // Return error message
    } else {
      // Use id to search for event post in database
      Events.findOne({ _id: req.params.id }, (err, event) => {
        // Check if error was found
        if (err) {
          res
            .status(400)
            .json([{ success: false, message: "Invalid event id" }]); // Return error message
        } else {
          // Check if id matched the id of any event post in the database
          if (!event) {
            res
              .status(400)
              .json([{ success: false, message: "event not found." }]); // Return error message
          } else {
            // Grab data of user that is logged in
            User.findOne({ _id: req.user.id }, (err, user) => {
              // Check if error was found
              if (err) {
                res
                  .status(400)
                  .json([{ success: false, message: "Something went wrong" }]); // Return error message
              } else {
                // Check if user was found in the database
                if (!user) {
                  res
                    .status(400)
                    .json([{ success: false, message: "User not found." }]); // Return error message
                } else {
                  // Add the new comment to the event post's array
                  event.Comments.push({
                    comment: req.body.comment, // Comment field
                    commentator: user.userName, // Person who commented
                  });
                  // Save event post
                  event.save((err) => {
                    // Check if error was found
                    if (err) {
                      res.status(400).json([
                        {
                          success: false,
                          message: "Something went wrong.",
                        },
                      ]); // Return error message
                    } else {
                      res.json([{ success: true, message: "Comment saved" }]); // Return success message
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  }
});

// delete comment
router.put("/comment/:id", auth, (req, res) => {
  Events.findById(req.params.id)
    .then((event) => {
      if (!req.body.id) {
        res.status(400).json({ msg: "id no provided" });
      } else if (!event) {
        return res.status(400).json({ msg: "event not find" });
      } else {
        Events.updateOne(
          { _id: req.params.id },
          { $pull: { Comments: { _id: req.body.id } } },
          (err, data) => {
            res.json({ msg: "comment deleted" });
          }
        );
      }
    })
    .catch((err) => console.log(err.message));
});

module.exports = router;
