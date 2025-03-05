const db = require('../models/db');

// Créer un film
exports.createFilm = (req, res) => {
  const { title, year, genre, synopsis, duration } = req.body;

  const query = 'INSERT INTO films_series (title, year, genre, synopsis, duration) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, year, genre, synopsis, duration], (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Erreur lors de la création du film', error: err });
      return;
    }
    res.status(201).send({ message: 'Film créé avec succès!', filmId: result.insertId });
  });
};

// Récupérer tous les films
exports.getAllFilms = (req, res) => {
  const query = 'SELECT * FROM films_series';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Erreur lors de la récupération des films', error: err });
      return;
    }
    res.status(200).json(result);
  });
};

// Récupérer un film par ID
exports.getFilmById = (req, res) => {
  const filmId = req.params.id;
  const query = 'SELECT * FROM films_series WHERE id = ?';
  db.query(query, [filmId], (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Erreur lors de la récupération du film', error: err });
      return;
    }
    if (result.length === 0) {
      res.status(404).send({ message: 'Film non trouvé' });
      return;
    }
    res.status(200).json(result[0]);
  });
};

// Mettre à jour un film
exports.updateFilm = (req, res) => {
  const filmId = req.params.id;
  const { title, year, genre, synopsis, duration } = req.body;

  const query = 'UPDATE films_series SET title = ?, year = ?, genre = ?, synopsis = ?, duration = ? WHERE id = ?';
  db.query(query, [title, year, genre, synopsis, duration, filmId], (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Erreur lors de la mise à jour du film', error: err });
      return;
    }
    res.status(200).send({ message: 'Film mis à jour avec succès!' });
  });
};

// Supprimer un film
exports.deleteFilm = (req, res) => {
  const filmId = req.params.id;
  const query = 'DELETE FROM films_series WHERE id = ?';
  db.query(query, [filmId], (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Erreur lors de la suppression du film', error: err });
      return;
    }
    res.status(200).send({ message: 'Film supprimé avec succès!' });
  });
};
