const express = require('express');

const router = express.Router();

const Users = require('./users/userDb.js');

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    users.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next()
      } else {
        res.status(404).json({ message: 'User id does not correspond with an actual User' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Something terrible happend while checking user id: ' + error.message,
      });
    });

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
