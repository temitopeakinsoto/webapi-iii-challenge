const express = require("express");
const users = require("./userDb");
const router = express.Router();
//custom middleware
function validateUser(req, res, next) {
  let user = req.body;
  if (!user) {
    res.status(400).json({ message: "missing user data" });
  } else if (!user.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}
function validateUserId(req, res, next) {
  users
    .getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message:
          "Something terrible happend while checking user id: " + error.message
      });
    });
}
function validatePost(req, res, next) {
  let post = req.body;
  if (!post) {
    res.status(400).json({ message: "missing post data" });
  } else if (!post.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}
//implement here
router.post("/", validateUser, (req, res) => {
  users
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error adding the user: " + error.message
      });
    });
});

// add post to a unique user
router.post("/:id/posts", validateUserId, (req, res) => {
});

// get all users
router.get("/", (req, res) => {
  users
    .get(req.query)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the hubs"
      });
    });
});
router.get("/:id", validateUserId, (req, res) => {
  res.json(req.user);
});
// router.get("/:id/posts", (req, res) => {});

//Delete a user (by id)
router.delete("/:id", validateUserId, (req, res) => {
  users
    .remove(req.user.id)
    .then(() => {
      res.status(200).json({ message: "This user has been deleted" });
    })
    .catch(error => {
      res.status(500).json({
        message: `Error deleting the user: ${error.message}`
      });
    });
});

// Update user by id
router.put("/:id", validateUserId, (req, res) => {
  users
    .update(req.user.id, req.body)
    .then(() => {
      res.status(200).json({
        message: "You have just changed his destiny"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error updating the user: " + error.message
      });
    });
});
module.exports = router;
