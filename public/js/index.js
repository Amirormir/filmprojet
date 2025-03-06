document.addEventListener("DOMContentLoaded", () => {
    const moviesList = document.getElementById('movies-list');

    async function fetchRecommendedMovies() {
        try {
            // Mise à jour de l'URL ici : /api/films_series/popular
            const response = await fetch('/api/films_series/popular');

            if (!response.ok) throw new Error('Erreur lors de la récupération des films');

            const data = await response.json();
            console.log("Films récupérés:", data);

            moviesList.innerHTML = '';

            data.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie');

                const img = document.createElement('img');
                img.src = movie.image_url;
                img.alt = movie.titre;

                const title = document.createElement('p');
                title.textContent = movie.titre;

                movieCard.appendChild(img);
                movieCard.appendChild(title);
                moviesList.appendChild(movieCard);
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des films :", error);
        }
    }

    fetchRecommendedMovies();
});
