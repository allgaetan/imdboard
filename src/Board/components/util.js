export const getNumberOfFilmsWatched = (data) => {
    return data.length
}

export const getTotalTimeWatched = (data) => {
    return data.reduce((total, film) => total + parseInt(film.runtime || 0, 10), 0)
}

export const getTotalTimeWatchedInHours = (data) => {
    return (getTotalTimeWatched(data) / 60).toFixed(1)
}

export const getAverageRating = (data) => {
    if (data.length === 0) return 0
    const totalRating = data.reduce((total, film) => total + parseFloat(film.rating || 0), 0)
    return (totalRating / data.length).toFixed(2)
}

export const getLongestStreak = (data) => {
    return "Streak stats not implemented yet"
}

export const getRatingDistribution = (data) => {
    const distribution = {}
    for (let i = 1; i <= 10; i++) {
        distribution[i] = 0
    }
    data.forEach((film) => {
        const rating = film.rating;
        if (rating && distribution[rating] !== undefined) {
            distribution[rating] += 1
        }
    })
    return distribution
}

export const getGenreDistribution = (data, keepTopN) => {
    const distribution = {}
    data.forEach((film) => {
        const genres = film.genres;
        const genresArray = genres.split(", ");
        genresArray.forEach((genre) => {
            if (genre && distribution[genre] === undefined) {
                distribution[genre] = 0
            }
        })   
    })
    data.forEach((film) => {
        const genres = film.genres;
        const genresArray = genres.split(", ")  
        genresArray.forEach((genre) => {
            if (genre) {
                distribution[genre] += 1 
            }
        }) 
    })
    let sorted = Object.fromEntries(
        Object.entries(distribution).sort(([, a], [, b]) => b - a)
    )
    let sliced = Object.fromEntries(
        Object.entries(sorted).slice(0, keepTopN)
    )
    return sliced
}

export const getDirectorDistribution = (data, keepTopN) => {
    const distribution = {}
    data.forEach((film) => {
        const directors = film.directors;
        const directorsArray = directors.split(",");
        directorsArray.forEach((director) => {
            if (director && distribution[director] === undefined) {
                distribution[director] = 0
            }
        })   
    })
    data.forEach((film) => {
        const directors = film.directors;
        const directorsArray = directors.split(",");
        directorsArray.forEach((director) => {
            if (director) {
                distribution[director] += 1
            }
        })  
    })
    let sorted = Object.fromEntries(
        Object.entries(distribution).sort(([, a], [, b]) => b - a)
    );

    let sliced = Object.fromEntries(
        Object.entries(sorted).slice(0, keepTopN)
    )
    return sliced
}

export const getDecadeDistribution = (data) => {
    const distribution = {}
    data.forEach((film) => {
        const year = film.year
        const decade = Math.trunc(year/10) * 10
        if (decade && distribution[decade] === undefined) {
            distribution[decade] = 0
        }
    })
    data.forEach((film) => {
        const year = film.year
        const decade = Math.trunc(year/10) * 10
        if (decade) {
            distribution[decade] += 1
        }
    })
    const reversedArray = Object.entries(distribution).reverse()
    return reversedArray
}

export const getLastWatched = (data, size) => {
    if (size >= data.length) { return data }
    return data.slice(0, size)
}

export const dateFormatter = (dateString) => {
    const dateArray = dateString.split("-")
    const year = dateArray[0]
    const month = dateArray[1]
    const date = new Date(dateString);
    date.setMonth(month - 1);
    const monthName = date.toLocaleString('en-US', {
        month: 'long',
    });
    const day = dateArray[2]
    return `${monthName} ${day} ${year}`
}

export const sortFilmsByRatings = (data) => {
    return [...data].sort((a, b) => Number(b.rating) - Number(a.rating))
}

export const getHighestRatedFilms = (data, size) => {
    const sorted = sortFilmsByRatings(data)
    if (size >= data.length) { return sorted }
    return sorted.slice(0, size)
}