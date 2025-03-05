const db = require('../models/db');

// Ajouter un avis
exports.addReview = (req, res) => {
  const { userId, filmId, rating, comment } = req.body;

  const query = 'INSERT INTO avis (utilisateur_id, film_id, note, commentaire) VALUES (?, ?, ?, ?)';
  db.query(query, [userId, filmId, rating, comment], (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Erreur lors de l\'ajout de l\'avis', error: err });
      return;
    }
    res.status(201).send({ message: 'Avis ajouté avec succès!', reviewId: result.insertId });
  });
};

// Récupérer les avis pour un film
exports.getReviewsByFilmId = (req, res) => {
  const filmId = req.params.id;
  const query = 'SELECT * FROM avis WHERE film_id = ?';
  db.query(query, [filmId], (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Erreur lors de la récupération des avis', error: err });
      return;
    }
    res.status(200).json(result);
  });
};
