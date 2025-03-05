const db = require('../models/db');

// Middleware d'auth (exemple : il doit être déjà défini quelque part dans ton projet)
const authenticateUser = require('../middleware/auth');

// Récupérer les avis de l'utilisateur connecté
exports.getUserReviews = (req, res) => {
    const userId = req.user.id; // Récupère l'ID de l'utilisateur via le token/session

    const query = `
        SELECT a.id, a.commentaire, a.note, f.titre 
        FROM avis a
        JOIN films f ON a.film_id = f.id
        WHERE a.utilisateur_id = ?
        ORDER BY a.id DESC
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des avis', error: err });
        }
        res.json(results);
    });
};
