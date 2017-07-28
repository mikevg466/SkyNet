const router = require('express').Router();
const User = require('../db/models/user');
const axios = require('axios');

module.exports = router;


router.post('/weather/forecast', (req, res, next) => {
  const { lat, lng } = req.body;
  axios.get(`https://api.darksky.net/forecast/${ process.env.DARK_SKY_SECRET }/${ lat },${ lng }`)
    .then(response => {
      return res.status(200).json(response.data);
    })
    .catch(next);
});

router.post('/weather/historic', (req, res, next) => {
  const { lat, lng, time } = req.body;
  axios.get(`https://api.darksky.net/forecast/${ process.env.DARK_SKY_SECRET }/${ lat },${ lng },${ time }`)
    .then(response => {
      return res.status(200).json(response.data);
    })
    .catch(next);
});

router.post('/location/geocode/latlng', (req, res, next) => {
  const { lat, lng } = req.body;
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ lat },${ lng }&key=${ process.env.GOOGLE_GEOCODING_SECRET }`)
    .then(response => {
      return res.status(200).json(response.data);
    })
    .catch(next);
});

router.post('/location/geocode/address', (req, res, next) => {
  const { address } = req.body;
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ address }&key=${ process.env.GOOGLE_GEOCODING_SECRET }`)
    .then(response => {
      return res.status(200).json(response.data);
    })
    .catch(next);
});
