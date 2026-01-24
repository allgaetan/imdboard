export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const fetchMovieMetadata = async (imdbId, apiKey) => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/find/${imdbId}?api_key=${apiKey}&external_source=imdb_id`
        );
        const data = await response.json();

        const movie = data.movie_results?.[0] || data.tv_results?.[0];
        if (!movie) return null;

        return {
            id: imdbId,
            tmdbId: movie.id,
            mediaType: (data.movie_results?.length > 0 ? 'movie' : 'tv'),
            title: movie.title || movie.name,
            posterPath: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null,
            backdropPath: movie.backdrop_path ? `${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}` : null,
            overview: movie.overview,
            voteAverage: movie.vote_average,
            releaseYear: new Date(movie.release_date || movie.first_air_date).getFullYear(),
        };
    } catch (error) {
        console.error('Error fetching TMDB data:', error);
        return null;
    }
};