document.addEventListener("DOMContentLoaded", () => {
    // Récupérer l'ID du film depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const filmId = urlParams.get('id');  // Assure-toi que l'URL contient ?id=filmId

    // Récupérer les données du film et les avis depuis l'API
    fetch(`/film/${filmId}`)
        .then(response => response.json())
        .then(data => {
            // Mettre à jour les informations du film
            const film = data.film;
            document.getElementById('film-title').textContent = film.titre;
            document.getElementById('film-image').src = film.image_url;  // Assure-toi que l'URL de l'image est correcte
            document.getElementById('film-synopsis').textContent = film.synopsis;

            // Afficher les avis
            const reviewsList = document.getElementById('reviews-list');
            data.avis.forEach(avis => {
                const li = document.createElement('li');
                li.textContent = `${avis.utilisateur_id}: ${avis.commentaire} (Note: ${avis.note})`;
                reviewsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données du film:', error);
        });
});
