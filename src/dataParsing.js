import Papa from 'papaparse'
import JSZip from 'jszip'

/**
 * Main parser
 */
export const superParser = async (file) => {
    const source = detectSource(file)
    var ratings = []
    if (source === "imdb") {
        const csvString = await file.text()
        ratings = imdbParser(csvString)
    }
    if (source === "letterboxd") {
        const csvString = await unzip(file)
        ratings = letterboxdParser(csvString)
    }
    if (ratings) {
        return { ratings, source }
    } else {
        alert(`No ratings found from  ${source}.`)
        return { ratings: [], source }
    }
}

/**
 * Utils
 */
export const detectSource = (file) => {
    if (!file) return null
    const name = file.name.toLowerCase()
    if (name.endsWith(".zip")) return "letterboxd"
    if (name.endsWith(".csv")) return "imdb"
    return null
}

export const unzip = async (zipFile) => {
    const arrayBuffer = await zipFile.arrayBuffer()
    const deserializedZipFile = await JSZip.loadAsync(arrayBuffer)
    const ratingsCSV = deserializedZipFile.files["ratings.csv"]
    if (!ratingsCSV) return []
    const csvString = await ratingsCSV.async("string")
    return csvString
}

export const imdbParser = (csvString) => {
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
        year: row['Year'],
        yourRating: row['Your Rating'], 
        dateRated: row['Date Rated'], 
        directors: row['Directors'], /* from TMDB but harder */
    }))
}

export const letterboxdParser = (csvString) => {
    const { data, errors } = Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,
    })
    if (errors.length > 0) {
        console.error('Error parsing CSV:', errors)
        return []
    }
    return data.map((row) => ({
        uri: row['Letterboxd URI'],
        title: row['Name'],
        year: row['Year'],
        yourRating: (row['Rating'] * 2),
        dateRated: row['Date'],
    }))
}