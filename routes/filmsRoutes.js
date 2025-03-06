const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Connexion MySQL (directement depuis ce fichier pour éviter les erreurs d'import)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'recommandation_films'
});

// Vérifier la connexion MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion MySQL:', err);
  } else {
    console.log('Connexion MySQL établie.');
  }
});

// Route : Récupérer tous les films
router.get('/', (req, res) => {
    connection.query('SELECT * FROM films_series', (err, results) => {
        if (err) return res.status(500).send('Erreur serveur');
        res.json(results);
    });
});

// Route : Récupérer un film par ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT * FROM films_series WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send('Erreur serveur');
        if (results.length === 0) return res.status(404).json({ message: 'Film non trouvé' });

        res.json(results[0]);
    });
});

// Route : Récupérer les films populaires
router.get('/popular', (req, res) => {
    console.log("🔥 Route /api/films/popular appelée");
    
    connection.query('SELECT * FROM films_series ORDER BY note_moyenne DESC LIMIT 10', (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des films populaires:', err);
            return res.status(500).send('Erreur serveur');
        }
        res.json(results);
    });
});

// Route : Ajouter un film
router.post('/', (req, res) => {
    const { titre, synopsis, image_url, annee, genres, duree, note_moyenne } = req.body;

    if (!titre || !synopsis || !image_url || !annee || !genres || !duree || note_moyenne === undefined) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const query = 'INSERT INTO films_series (titre, synopsis, image_url, annee, genres, duree, note_moyenne) VALUES (?, ?, ?, ?, ?, ?, ?)';

    connection.query(query, [titre, synopsis, image_url, annee, genres, duree, note_moyenne], (err) => {
        if (err) return res.status(500).send('Erreur serveur');
        res.status(201).json({ message: 'Film ajouté avec succès' });
    });
});

// Route : Supprimer un film
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM films_series WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send('Erreur serveur');
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Film non trouvé' });

        res.json({ message: 'Film supprimé avec succès' });
    });
});

module.exports = router;
