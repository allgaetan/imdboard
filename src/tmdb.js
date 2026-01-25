export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const fetchFilmMetadata = async (imdbId, apiKey) => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/find/${imdbId}?api_key=${apiKey}&external_source=imdb_id`
        );
        const data = await response.json();
        const movie = data.movie_results?.[0] || data.tv_results?.[0];
        if (!movie) return null;
        return {
            id: imdbId,
            title: movie.title || movie.name,
            posterPath: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null,
            backdropPath: movie.backdrop_path ? `${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}` : null,
        };
    } catch (error) {
        console.error('Error fetching TMDB data:', error);
        return null;
    }
};

export const fetchPersonPicture = async (personName, apiKey) => {
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