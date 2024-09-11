const express = require("express");
const pets = express.Router();
const Pet = require("../models/pets.js");
const db = require('../models'); // Ensure models are properly required
require("dotenv").config();

// INDEX
pets.get("/", (req, res) => {
  Pet.find().then((foundPets) => {
    res.render("index", {
      pets: foundPets,
      title: "Index Page",
    });
  });
});

// NEW
pets.get("/new", (req, res) => {
  res.render("new");
});

// SHOW PET AND COMMENTS
pets.get("/:id", (req, res) => {
  Pet.findById(req.params.id)
    .populate("comments")
    .then((foundPet) => {
      if (foundPet) {
        console.log("Pet found:", foundPet); // Log the found pet
        console.log("Comments:", foundPet.comments); // Log the populated comments
        res.render("show", {
          pet: foundPet,
        });
      } else {
        console.log("Pet not found");
        res.status(404).send("Pet not found");
      }
    })
    .catch((err) => {
      console.error("Error finding pet:", err);
      res.status(500).send("Error finding pet");
    });
});

// CREATE
pets.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }

  // Ensure weight is a number
  if (req.body.weight) {
    req.body.weight = parseFloat(req.body.weight);
  }

  Pet.create(req.body)
    .then(() => {
      res.redirect("/pets");
    })
    .catch((err) => {
      console.error("Error creating pet:", err);
      res.status(400).send("Error creating pet");
    });
});

// EDIT
pets.get("/:id/edit", (req, res) => {
  Pet.findById(req.params.id).then((foundPet) => {
    res.render("edit", {
      pet: foundPet,
    });
  });
});

// UPDATE
pets.put("/:id", (req, res) => {
  // Ensure weight is a number
  if (req.body.weight) {
    req.body.weight = parseFloat(req.body.weight);
  }

  Pet.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedPet) => {
      console.log(updatedPet);
      res.redirect(`/pets/${req.params.id}`);
    })
    .catch((err) => {
      console.error("Error updating pet:", err);
      res.status(400).send("Error updating pet");
    });
});


//DELETE

pets.delete("/:id", (req, res) => {
  Pet.findByIdAndDelete(req.params.id).then((deletedPet) => {
    res.status(303).redirect("/pets");
  });
});

// POST COMMENT
pets.post('/:id/comment', (req, res) => {
  console.log('post comment', req.body);
  if (req.body.author === '') { req.body.author = undefined; }
  Pet.findById(req.params.id)
    .then(pet => {
      db.Comment.create(req.body)
        .then(comment => {
          console.log('Created comment:', comment);
          pet.comments.push(comment._id);
          pet.save()
            .then(() => {
              res.redirect(`/pets/${req.params.id}`);
            })
            .catch(err => {
              console.error('Error saving pet:', err);
              res.render('error404');
            });
        })
        .catch(err => {
          console.error('Error creating comment:', err);
          res.render('error404');
        });
    })
    .catch(err => {
      console.error('Error finding pet:', err);
      res.render('error404');
    });
});

// DELETE COMMENT
pets.delete('/:id/comment/:commentId', (req, res) => {
  db.Comment.findByIdAndDelete(req.params.commentId)
    .then(() => {
      console.log('Deleted comment');
      res.redirect(`/pets/${req.params.id}`);
    })
    .catch(err => {
      console.error('Error deleting comment:', err);
      res.render('error404');
    });
});

module.exports = pets;
