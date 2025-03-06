document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById('search-bar');
    const suggestionsContainer = document.getElementById('suggestions');
    const moviesList = document.getElementById('movies-list');

    // Fonction pour afficher les résultats de recherche
    async function searchMovies(query) {
        if (query.length < 3) {
            suggestionsContainer.innerHTML = '';
            return;  // N'afficher que si la requête est assez longue
        }

        try {
            // Appel à la base de données pour rechercher des films
            const response = await fetch(`/api/films/search?query=${query}`);
            const data = await response.json();

            // Vider la liste des suggestions
            suggestionsContainer.innerHTML = '';
            moviesList.innerHTML = '';

            if (data.length > 0) {
                // Afficher les films dans la liste des résultats
                data.forEach(movie => {
                    const card = document.createElement('div');
                    card.classList.add('movie-card');

                    const img = document.createElement('img');
                    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                    img.alt = movie.title;

                    const title = document.createElement('h3');
                    title.innerText = movie.title;

                    const overview = document.createElement('p');
                    overview.innerText = movie.overview ? movie.overview.slice(0, 150) + '...' : 'Aucune description disponible';

                    card.appendChild(img);
                    card.appendChild(title);
                    card.appendChild(overview);

                    // Ajouter la carte à la liste des films
                    moviesList.appendChild(card);
                });
            } else {
                moviesList.innerHTML = '<p>Aucun résultat trouvé.</p>';
            }

        } catch (error) {
            console.error('Erreur lors de la récupération des films:', error);
        }
    }

    // Écouter l'événement de saisie dans le champ de recherche
    searchBar.addEventListener('input', () => {
        const query = searchBar.value;
        searchMovies(query);
    });
});
