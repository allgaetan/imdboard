export const dataTimeFramer = (data, timeframe) => {
    const now = new Date()
    let framedData = data

    switch (timeframe) {
        case 'last-7-days':
            framedData = data.filter(item => {
                const dateRated = new Date(item.dateRated)
                return dateRated >= now - 7 * 24 * 60 * 60 * 1000
            })
            break
        case 'last-30-days':
            framedData = data.filter(item => {
                const dateRated = new Date(item.dateRated)
                return dateRated >= now - 30 * 24 * 60 * 60 * 1000
            })
            break
        case 'last-90-days':
            framedData = data.filter(item => {
                const dateRated = new Date(item.dateRated)
                return dateRated >= now - 90 * 24 * 60 * 60 * 1000
            })
            break
        case 'last-180-days':
            framedData = data.filter(item => {
                const dateRated = new Date(item.dateRated)
                return dateRated >= now - 180 * 24 * 60 * 60 * 1000
            })
            break
        case 'last-365-days':
            framedData = data.filter(item => {
                const dateRated = new Date(item.dateRated)
                return dateRated >= now - 365 * 24 * 60 * 60 * 1000
            })
            break
    }

    return framedData
}