const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/crunchyimages', (req, res, next) => {
  const crunchyrollImages = 'http://www.crunchyroll.com/mobile-tech-challenge/images.json';

  fetch(crunchyrollImages)
    .then((response) => {
      console.log(response, response.headers);
      return response.json();
    })
    .then((jsonResponse) => {
      res.json(jsonResponse);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
