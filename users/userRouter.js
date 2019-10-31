const express = require("express");
const userDb = require("./userDb");
const postDb = require("../posts/postDb");
const router = express.Router();

//Validate user middleware

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

//Validate User by Id middleware

function validateUserId(req, res, next) {
  userDb
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
        message: `Something terrible happend while checking user id: ${error.message}`
      });
    });
}

//Validate Post middleware
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
//endpoint for adding a new user
router.post("/", validateUser, (req, res) => {
  userDb
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        message: `Error adding the user: ${error.message}`
      });
    });
});

//Endpoint for add a post to a unique user
router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  let { id } = req.params;
  const textName = req.body.text
  console.log("text value is", req.body.text);

  let postBody = { text:textName, user_id: id };
  postDb
    .insert(postBody)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(500).json({
        error: `we encountered an error while creating this post for the user: ${error.message}`
      });
    });
});

//Endpoint for getting post on a specified user
router.get("/:id/posts", validateUserId, (req, res) => {
    userDb.getUserPosts(req.user.id)
      .then(posts => {
        if (!posts.length) {
          res.status(404).json({ message: "No posts found" });
        } else {
          res.status(200).json({ posts });
        }
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: "Server error: " + error
        });
      });
  });

//Endpoint for getting all users
router.get("/", (req, res) => {
  userDb
    .get(req.query)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({
        message: `Error retrieving the list of all users: ${error.message}`
      });
    });
});

//Endpoint for getting a user by his/her id
router.get("/:id", validateUserId, (req, res) => {
  res.json(req.user);
});
router.get("/:id/posts", validateUserId, (req, res) => {
  userDb
    .getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        message: `encountered an error while retrieving the posts for the specified user ${error.message}`
      });
    });
});

//Endpoint for deleting a user
router.delete("/:id", validateUserId, (req, res) => {
  userDb
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

//endpoint for updating a user
router.put("/:id", validateUserId, (req, res) => {
  userDb
    .update(req.user.id, req.body)
    .then(error => {
      res.status(200).json({
        message: `You have successfully updated the specified user ${error.message}`
      });
    })
    .catch(error => {
      res.status(500).json({
        message: `Error updating the user:  ${error.message}`
      });
    });
});
module.exports = router;
