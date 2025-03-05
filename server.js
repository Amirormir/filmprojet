// Importation des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const path = require('path');

// Initialisation de l'application Express
const app = express();
const port = 3000;

// Configuration de la connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Remplacez par votre mot de passe
  database: 'recommandation_films'
});

// Middleware pour parser les données POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir les fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route d'inscription
app.post('/register', (req, res) => {
  const { email, mot_de_passe, pseudo } = req.body;

  // Vérification si l'email existe déjà
  connection.query('SELECT * FROM utilisateurs WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification de l\'email:', err);
      return res.status(500).send('Erreur serveur');
    }

    if (results.length > 0) {
      return res.status(400).send('Cet email est déjà utilisé.');
    }

    // Hashage du mot de passe
    bcrypt.hash(mot_de_passe, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Erreur lors du hashage du mot de passe:', err);
        return res.status(500).send('Erreur serveur');
      }

      // Insertion de l'utilisateur dans la base de données
      const query = 'INSERT INTO utilisateurs (email, mot_de_passe, pseudo) VALUES (?, ?, ?)';
      connection.query(query, [email, hashedPassword, pseudo], (err, results) => {
        if (err) {
          console.error('Erreur lors de l\'insertion de l\'utilisateur:', err);
          return res.status(500).send('Erreur serveur');
        }

        res.status(201).send('Utilisateur créé avec succès');
      });
    });
  });
});

// Route de connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Vérification de l'utilisateur
  connection.query('SELECT * FROM utilisateurs WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', err);
      return res.status(500).send('Erreur serveur');
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const user = results[0];

    // Vérification du mot de passe
    bcrypt.compare(password, user.mot_de_passe, (err, isMatch) => {
      if (err) {
        console.error('Erreur lors de la comparaison du mot de passe:', err);
        return res.status(500).send('Erreur serveur');
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Mot de passe incorrect' });
      }

      // Connexion réussie
      res.status(200).json({ message: 'Connexion réussie' });
    });
  });
});

// Routes pour les films, utilisateurs et avis
// Assurez-vous que ces fichiers existent et exportent correctement leurs routes
const filmsRoutes = require('./routes/filmsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');

app.use('/api/films', filmsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/reviews', reviewsRoutes);

// Route pour récupérer les détails d'un film avec ses avis
app.get('/film/:id', (req, res) => {
  const filmId = req.params.id;

  // Récupérer les détails du film
  connection.query('SELECT * FROM films WHERE id = ?', [filmId], (err, filmResult) => {
    if (err) {
      console.error('Erreur lors de la récupération du film:', err);
      return res.status(500).send('Erreur serveur');
    }

    if (filmResult.length === 0) {
      return res.status(404).send('Film non trouvé');
    }

    // Récupérer les avis associés à ce film
    connection.query('SELECT * FROM avis WHERE film_id = ?', [filmId], (err, avisResult) => {
      if (err) {
        console.error('Erreur lors de la récupération des avis:', err);
        return res.status(500).send('Erreur serveur');
      }

      // Envoyer les informations du film et les avis au frontend
      res.status(200).json({ film: filmResult[0], avis: avisResult });
    });
  });
});

// Route pour la page "mon-compte" - page utilisateur avec les avis
app.get('/mon-compte.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mon-compte.html'));
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
