# IMDashBoard: The Interactive Movie DashBoard

Your personal movie stats at all time, in an interactive and comprehensive dashboard

## About

This project was inspired by [Last.fm](https://www.last.fm). It aims at designing an interactive movie tracking experience available at all times, akin to what Last.fm offers for music.
It is a personal project and is not in any way affiliated to IMDb, Letterboxd, or TMDB.

## Existing features

- Import your data from either IMDb or Letterboxd
- Your data is parsed locally and enriched with TMDB
- Frame the visualized data to a time window (last 7, 30, 90, 180, 365 days or all time)
- Interactive dashboard organized in cards:
    - Overview stats (number of films watched, total watch time in hours, average rating)
    - Ratings distribution
    - Most watched genres
    - Most watched directors
    - Number of films watched from each decade
    - List of the recently rated films (display 5, 10 or 25 most recent)
    - Top ratings: top 10 highest rated films, directors and genres

## Future features

- Additional information around the dashboard:
    - Overview stats:
    - Ratings distribution: click on a rating to see every film with this rating
    - Most watched genres: click on a genre to see every film from the genre + show more than top 10
    - Most watched directors: click on a director to see every film from the director + show more than top 10
    - Number of films watched from each decade: click on a decade to see every film from the decade + extend the decade graph to a yearly graph
    - List of the recently rated films (display 5, 10 or 25 most recent)
    - Top ratings: top 10 highest rated films, directors and genres: extend the top 10 + click on a director to see every film from them + click on a genre to see every film from it
- Weekly, monthly and yearly reports with comparison to the previous corresponding time period
- All films view: grid/list with all films with custom filters and sorting
- Use IMDb or Letterboxd username/id directly instead of file upload