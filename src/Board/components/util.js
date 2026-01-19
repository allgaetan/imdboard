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
    return 0
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



