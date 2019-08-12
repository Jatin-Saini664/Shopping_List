const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Models
const Item = require('../../models/Item'); // capital i because it is a modal

// @route GET api/items.   // ge item from api/items
// @desc Get All Item.  // desc is description
// @access Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 }) // sort by date for descending is -1
    .then(items => res.json(items)); // it will fetch from database and fetch the items
}); // we will use only / because we are already in api/items. but if we were in server.js than we have to use api/items

// @route POST api/items.   // ge item from api/items
// @desc create an Item.  // desc is description
// @access Private
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    // we want to contruct a new object to insert into the database
    name: req.body.name
  });

  newItem.save().then(item => res.json(item)); //  it gives us back the item we are saving and we want to spit out that item in json
}); // we will use only / because we are already in api/items. but if we were in server.js than we have to use api/items

// @route DELETE api/items/:id.
// @desc delete a Item.
// @access Private
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
