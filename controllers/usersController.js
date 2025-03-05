const db = require('../models/db');

// Créer un utilisateur
exports.createUser = (req, res) => {
  const { email, password, pseudo } = req.body;

  const query = 'INSERT INTO utilisateurs (email, mot_de_passe, pseudo) VALUES (?, ?, ?)';
  db.query(query, [email, password, pseudo], (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Erreur lors de l\'inscription de l\'utilisateur', error: err });
      return;
    }
    res.status(201).send({ message: 'Utilisateur créé avec succès!', userId: result.insertId });
  });
};

// Récupérer un utilisateur par email
exports.getUserByEmail = (req, res) => {
  const email = req.params.email;
  const query = 'SELECT * FROM utilisateurs WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Erreur lors de la récupération de l\'utilisateur', error: err });
      return;
    }
    if (result.length === 0) {
      res.status(404).send({ message: 'Utilisateur non trouvé' });
      return;
    }
    res.status(200).json(result[0]);
  });
};
