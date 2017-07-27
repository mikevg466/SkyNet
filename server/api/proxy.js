const router = require('express').Router();
const User = require('../db/models/user');
const axios = require('axios');

module.exports = router;


router.post('/forecast', (req, res, next) => {
  const { lat, lng } = req.body;
  axios.get(`https://api.darksky.net/forecast/${ process.env.DARK_SKY_SECRET }/${ lat },${ lng }`)
    .then(response => {
      console.log(response);
      return res.status(200).json(response.data);
    })
    .catch(next);
});
