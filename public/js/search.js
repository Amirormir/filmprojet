document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById('search-bar');
    const suggestionsContainer = document.getElementById('suggestions');
    const moviesList = document.getElementById('movies-list');

    // Clé API TMDB
    const apiKey = 'abab33fe124bed5ea997bfb0f452e3d2';  // Remplace par ta clé API réelle

    // Fonction pour afficher les résultats de recherche
    async function searchMovies(query) {
        if (query.length < 3) {
            suggestionsContainer.innerHTML = '';
            return;  // N'afficher que si la requête est assez longue
        }

        try {
            // Faire une requête à l'API TMDB
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}&language=fr-FR`);
            const data = await response.json();

            // Vider la liste des suggestions
            suggestionsContainer.innerHTML = '';
            moviesList.innerHTML = '';

            if (data.results.length > 0) {
                // Afficher les films et séries dans la liste des résultats
                data.results.forEach(result => {
                    const card = document.createElement('div');
                    card.classList.add('movie-card');

                    const img = document.createElement('img');
                    img.src = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
                    img.alt = result.title || result.name;

                    const title = document.createElement('h3');
                    title.innerText = result.title || result.name;

                    const overview = document.createElement('p');
                    overview.innerText = result.overview ? result.overview.slice(0, 150) + '...' : 'Aucune description disponible';

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
