import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["collectionSearch", "collectionItem", "tmdbSearchInput", "tmdbSearchResults", "popularMovies"]
  static values = { searchUrl: String }

  connect() {
    this.renderPopularMoviesPlaceholder()
  }

  filterCollection() {
    if (!this.hasCollectionSearchTarget || this.collectionItemTargets.length === 0) {
      return
    }

    const query = this.collectionSearchTarget.value.toLowerCase()

    this.collectionItemTargets.forEach((item) => {
      const titleElement = item.querySelector(".card-title")
      if (!titleElement) {
        return
      }

      const title = titleElement.textContent.toLowerCase()
      const shouldShow = title.includes(query)
      item.style.display = shouldShow ? "" : "none"
    })
  }

  handleTmdbKeydown(event) {
    if (event.key !== "Enter") {
      return
    }

    event.preventDefault()
    this.performTmdbSearch()
  }

  async performTmdbSearch() {
    if (!this.hasTmdbSearchInputTarget || !this.hasTmdbSearchResultsTarget) {
      return
    }

    const query = this.tmdbSearchInputTarget.value.trim()
    if (query.length < 2) {
      this.tmdbSearchResultsTarget.innerHTML = '<p style="color: #94A3B8; text-align: center;">Please enter at least 2 characters</p>'
      return
    }

    try {
      const response = await fetch(`${this.searchUrlValue}?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error("Search request failed")
      }

      const movies = await response.json()
      this.renderTmdbMovies(movies)
    } catch (_error) {
      this.tmdbSearchResultsTarget.innerHTML = '<p style="color: #EF4444; text-align: center;">Search failed. Please try again.</p>'
    }
  }

  renderPopularMoviesPlaceholder() {
    if (!this.hasPopularMoviesTarget) {
      return
    }

    this.popularMoviesTarget.innerHTML = `
      <div style="text-align: center; width: 100%; padding: 3rem;">
        <p style="color: #64748B; font-weight: 500;">Popular movies will be displayed here</p>
        <p style="color: #94A3B8; font-size: 0.95rem;">Sign in to search and rate movies!</p>
      </div>
    `
  }

  renderTmdbMovies(movies) {
    if (!this.hasTmdbSearchResultsTarget) {
      return
    }

    if (!Array.isArray(movies) || movies.length === 0) {
      this.tmdbSearchResultsTarget.innerHTML = '<p style="color: #94A3B8; text-align: center;">No movies found. Try another search.</p>'
      return
    }

    const cards = movies
      .map((movie) => this.buildMovieCard(movie))
      .join("")

    this.tmdbSearchResultsTarget.innerHTML = `<div class="row g-4">${cards}</div>`
  }

  buildMovieCard(movie) {
    const title = this.escapeHtml(movie.title || "Untitled")
    const year = this.releaseYear(movie.release_date)
    const rating = Number(movie.vote_average)
    const ratingText = Number.isFinite(rating) ? `${rating.toFixed(1)}/10` : "N/A/10"
    const overview = movie.overview ? `${this.escapeHtml(movie.overview.substring(0, 80))}...` : "No description"

    const posterHtml = movie.poster_path
      ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${title}">`
      : '<div style="display: flex; align-items: center; justify-content: center; height: 100%;"><span style="font-size: 3rem; opacity: 0.5;">📽️</span></div>'

    return `
      <div class="col-md-6 col-lg-4">
        <div class="movie-card-landing">
          <div class="card-img-wrapper">
            ${posterHtml}
          </div>
          <div class="card-body">
            <h5>${title}</h5>
            <small>📅 ${year}</small>
            <p style="margin-top: 0.75rem; color: #64748B; font-size: 0.95rem;">⭐ ${ratingText}</p>
            <p style="font-size: 0.9rem; color: #94A3B8;">${overview}</p>
            <p style="margin-top: 1rem; text-align: center; color: #8B5CF6; font-weight: 600; font-size: 0.9rem;">📝 Sign in to rate this movie</p>
          </div>
        </div>
      </div>
    `
  }

  releaseYear(releaseDate) {
    if (!releaseDate) {
      return "N/A"
    }

    const parsedDate = new Date(releaseDate)
    return Number.isNaN(parsedDate.getTime()) ? "N/A" : parsedDate.getFullYear()
  }

  escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;")
  }
}
