import Papa from 'papaparse'

export const imdbCSVParser = (csvString) => {
    const { data, errors } = Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,
    })
    if (errors.length > 0) {
        console.error('Error parsing CSV:', errors)
        return []
    }

    return data.map((row) => ({
        const: row['Const'],
        rating: row['Your Rating'],
        dateRated: row['Date Rated'],
        title: row['Title'],
        originalTitle: row['Original Title'],
        url: row['URL'],
        type: row['Title Type'],
        imdbRating: row['IMDb Rating'],
        runtime: row['Runtime (mins)'],
        year: row['Year'],
        genres: row['Genres'],
        numVotes: row['Num Votes'],
        releaseDate: row['Release Date'],
        directors: row['Directors'],
    }))
}