export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const apiKey = import.meta.env.VITE_API_KEY

export const fetchFilmMetadata = async (rating, source) => {
    try {
        var tmdbId = null;
        if (source === "imdb") {
            const imdbId = rating.const;
            var response = await fetch(
                `${TMDB_BASE_URL}/find/${imdbId}?external_source=imdb_id&api_key=${apiKey}`
            );
            var data = await response.json();
            tmdbId = data.movie_results?.[0].id;
        }
        if (source === "letterboxd") {
            const query = rating.title;
            const year = rating.year;
            var response = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${query}&year=${year}&api_key=${apiKey}`
            );
            var data = await response.json();
            tmdbId = data.results?.[0].id;
        }
        
        if (!tmdbId) return null;

        response = await fetch(
            `${TMDB_BASE_URL}/movie/${tmdbId}?append_to_response=credits&api_key=${apiKey}`
        );
        const details = await response.json();
        const genres = details.genres;
        const genreNames = [];
        genres.forEach((genre) => {
            genreNames.push(genre.name)
        });
        const director = details.credits.crew.find(
            person => person.job === "Director"
        );

        return {
            source: source,
            id: tmdbId,
            title: details.title,
            genres: genreNames,
            runtime: details.runtime,
            director: director?.name || "Unknown",
            posterPath: details.poster_path ? `${TMDB_IMAGE_BASE_URL}${details.poster_path}` : null,
            backdropPath: details.backdrop_path ? `${TMDB_BACKDROP_BASE_URL}${details.backdrop_path}` : null,
            averageRating: details.vote_average,
            countRatings: details.vote_count,
            year: rating.year,
            yourRating: rating.yourRating,
            dateRated: rating.dateRated,
        };
    } catch (error) {
        console.error('Error fetching TMDB data:', error);
        return null;
    }
};

export const fetchPersonPicture = async (personName) => {
    try {
        var response = await fetch(
            `${TMDB_BASE_URL}/search/person?query=${personName}&api_key=${apiKey}`
        );
        var data = await response.json();
        const personId = data.results?.[0]?.id;
        if (!personId) return null;
        response = await fetch(
            `${TMDB_BASE_URL}/person/${personId}/images?api_key=${apiKey}`
        );
        data = await response.json();
        const personImage = data.profiles?.[0];
        if (!personImage) return null;
        return {
            name: personName,
            imagePath: personImage.file_path ? `${TMDB_IMAGE_BASE_URL}${personImage.file_path}` : null,
            width: personImage.width,
            height: personImage.height,
        };
    } catch (error) {
        console.error('Error fetching TMDB data:', error);
        return null;
    }
};