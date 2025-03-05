const express = require('express');
const filmsController = require('../controllers/filmsController');

const router = express.Router();

router.post('/films', filmsController.createFilm);
router.get('/films', filmsController.getAllFilms);
router.get('/films/:id', filmsController.getFilmById);
router.put('/films/:id', filmsController.updateFilm);
router.delete('/films/:id', filmsController.deleteFilm);

module.exports = router;
