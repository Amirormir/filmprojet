document.addEventListener('DOMContentLoaded', () => {
    // Lorsque le DOM est prêt, on ajoute l'événement pour la barre de recherche
    document.getElementById('search-bar').addEventListener('input', (event) => {
        const query = event.target.value;
        if (query.length > 2) {  // On commence à chercher après 3 caractères
            searchMovies(query);
        }
    });
});

// Fonction pour rechercher des films
async function searchMovies(query) {
    try {
        const response = await fetch(`/api/films_series/search?query=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data); // Affiche les résultats dans la console ou traite-les dans l'application

        // Affichage des résultats dans la page HTML
        const moviesList = document.getElementById('movies-list');
        moviesList.innerHTML = ''; // Vider la liste avant d'ajouter les nouveaux résultats

        // Remplir la liste avec les films récupérés
        data.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');

            // Créer l'élément image pour chaque film
            const movieImage = document.createElement('img');
            movieImage.src = movie.image_url;  // L'URL de l'image
            movieImage.alt = movie.titre;  // Texte alternatif pour l'image

            // Créer l'élément titre du film
            const movieTitle = document.createElement('h3');
            movieTitle.textContent = movie.titre;

            // Créer l'élément description du film
            const movieDescription = document.createElement('p');
            movieDescription.textContent = movie.description || "Aucune description disponible.";

            // Créer l'élément note du film
            const movieRating = document.createElement('p');
            movieRating.innerHTML = `<strong>Note:</strong> ${movie.note_moyenne}`;

            // Ajouter l'image, le titre, la description, et la note au div de chaque film
            movieItem.appendChild(movieImage);
            movieItem.appendChild(movieTitle);
            movieItem.appendChild(movieDescription);
            movieItem.appendChild(movieRating);

            // Ajouter l'élément div au conteneur des films
            moviesList.appendChild(movieItem);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des films:", error);
    }
}
