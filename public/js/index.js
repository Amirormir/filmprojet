document.addEventListener("DOMContentLoaded", () => {
    const moviesList = document.getElementById('movies-list');
    const apiKey = 'abab33fe124bed5ea997bfb0f452e3d2'; // Remplace par ta vraie clé API TMDB

    // Fonction pour récupérer les films recommandés
    async function fetchRecommendedMovies() {
        try {
            // Appel à l'API TMDB pour récupérer les films populaires
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`);
            const data = await response.json();

            // Vider la liste avant d'ajouter les nouveaux films
            moviesList.innerHTML = '';

            // Ajouter 5 films à la page
            data.results.slice(0, 5).forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie');

                // Créer l'élément d'image pour le film
                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // URL de l'image
                img.alt = movie.title;

                // Créer l'élément de texte pour le titre du film
                const title = document.createElement('p');
                title.textContent = movie.title;

                // Ajouter l'image et le titre au conteneur du film
                movieCard.appendChild(img);
                movieCard.appendChild(title);

                // Ajouter le film à la liste
                moviesList.appendChild(movieCard);
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des films :", error);
        }
    }

    // Charger les films recommandés dès que la page est chargée
    fetchRecommendedMovies();
});
