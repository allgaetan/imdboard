export const getNumberOfFilmsWatched = (data) => {
    return data.length
}

export const getTotalTimeWatched = (data) => {
    return data.reduce((total, film) => total + parseInt(film.runtime || 0, 10), 0)
}

export const getTotalTimeWatchedInHours = (data) => {
    return (getTotalTimeWatched(data) / 60)
}

export const getAverageRating = (data) => {
    if (data.length === 0) return 0
    const totalRating = data.reduce((total, film) => total + parseFloat(film.yourRating || 0), 0)
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
        const rating = film.yourRating;
        if (rating && distribution[rating] !== undefined) {
            distribution[rating] += 1
        }
    })
    return distribution
}

export const getGenreDistribution = (data) => {
    const distribution = {}
    data.forEach((film) => {
        const genres = film.genres;
        genres.forEach((genre) => {
            if (genre && distribution[genre] === undefined) {
                distribution[genre] =
                    {
                        "count": 0,
                        "rating": 0
                    }
            }
        })   
    })
    data.forEach((film) => {
        const genres = film.genres;
        genres.forEach((genre) => {
            if (genre) {
                distribution[genre].count += 1
                distribution[genre].rating += parseInt(film.yourRating || 0, 10)
            }
        })  
    })
    const countDist = {}
    const ratingDist = {}
    Object.entries(distribution).forEach((entry) => {
        const genre = entry[0]
        const count = entry[1].count
        const rating = entry[1].rating
        countDist[genre] = count
        ratingDist[genre] = rating / count
    })
    
    let sortedByCount = Object.fromEntries(
        Object.entries(countDist).sort(([, a], [, b]) => b - a)
    )
    let sortedByRating = Object.fromEntries(
        Object.entries(ratingDist).sort(([, a], [, b]) => b - a)
    )

    return {
        "count": sortedByCount,
        "rating": sortedByRating
    }
}

export const getDirectorDistribution = (data) => {
    const distribution = {}
    data.forEach((film) => {
        const director = film.director;
        if (director && distribution[director] === undefined) {
            distribution[director] =
                {
                    "count": 0,
                    "rating": 0
                }
        }
    })
    data.forEach((film) => {
        const director = film.director;
        if (director) {
            distribution[director].count += 1
            distribution[director].rating += parseInt(film.yourRating || 0, 10)
        }
    })
    const countDist = {}
    const ratingDist = {}
    Object.entries(distribution).forEach((entry) => {
        const director = entry[0]
        const count = entry[1].count
        const rating = entry[1].rating
        countDist[director] = count
        ratingDist[director] = rating / count
    })
    
    let sortedByCount = Object.fromEntries(
        Object.entries(countDist).sort(([, a], [, b]) => b - a)
    )
    let sortedByRating = Object.fromEntries(
        Object.entries(ratingDist).sort(([, a], [, b]) => b - a)
    )

    return {
        "count": sortedByCount,
        "rating": sortedByRating
    }
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
    return [...data].sort((a, b) => Number(b.yourRating) - Number(a.yourRating))
}

export const getHighestRatedFilms = (data, size) => {
    const sorted = sortFilmsByRatings(data)
    if (size >= data.length) { return sorted }
    return sorted.slice(0, size)
}