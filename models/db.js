const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',  // Adresse de ton serveur
  user: 'root',       // Nom d'utilisateur MySQL
  password: 'root',       // Mot de passe MySQL
  database: 'recommandation_films'  // Nom de la base de données
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ', err);
    return;
  }
  console.log('Connecté à la base de données MySQL.');
});

module.exports = db;
