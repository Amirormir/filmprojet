const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const port = 3000;

// Configuration de la connexion à MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Mets ton mot de passe MySQL ici
  database: 'recommandation_films'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    process.exit(1);
  } else {
    console.log('Connexion réussie à MySQL.');
  }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes API
const filmsRoutes = require('./routes/filmsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');

app.use('/api/films', filmsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/reviews', reviewsRoutes);

// Page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Page mon-compte
app.get('/mon-compte.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mon-compte.html'));
});

// Route d'inscription
app.post('/register', (req, res) => {
  const { email, mot_de_passe, pseudo } = req.body;

  connection.query('SELECT * FROM utilisateurs WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('Erreur serveur');

    if (results.length > 0) return res.status(400).send('Cet email est déjà utilisé.');

    bcrypt.hash(mot_de_passe, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send('Erreur serveur');

      connection.query('INSERT INTO utilisateurs (email, mot_de_passe, pseudo) VALUES (?, ?, ?)', 
        [email, hashedPassword, pseudo], (err) => {
          if (err) return res.status(500).send('Erreur serveur');
          res.status(201).send('Utilisateur créé avec succès');
        }
      );
    });
  });
});

// Route de connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM utilisateurs WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('Erreur serveur');
    if (results.length === 0) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const user = results[0];

    bcrypt.compare(password, user.mot_de_passe, (err, isMatch) => {
      if (err) return res.status(500).send('Erreur serveur');
      if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

      res.status(200).json({ message: 'Connexion réussie' });
    });
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
