import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "results", "form"]
  static outlets = []

  connect() {
    this.debounceTimer = null
    this.selectedIndex = -1
  }

  search() {
    clearTimeout(this.debounceTimer)
    const query = this.inputTarget.value.trim()

    if (query.length < 2) {
      this.resultsTarget.classList.add("d-none")
      this.resultsTarget.innerHTML = ""
      return
    }

    this.debounceTimer = setTimeout(() => {
      fetch(`/movies/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => this.displayResults(data))
        .catch(error => console.error("Search failed:", error))
    }, 300)
  }

  displayResults(movies) {
    if (movies.length === 0) {
      this.resultsTarget.innerHTML = `
        <div class="search-no-results">
          <span class="text-muted">No movies found</span>
        </div>
      `
      this.resultsTarget.classList.remove("d-none")
      return
    }

    const resultsHTML = movies
      .map((movie, index) => `
        <div class="search-result-item" data-index="${index}" data-tmdb-id="${movie.tmdb_id}">
          <div class="search-result-poster">
            ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w92${movie.poster_path}" alt="${movie.title}">` : '<div class="no-poster">📽️</div>'}
          </div>
          <div class="search-result-info">
            <div class="search-result-title">${this.escapeHtml(movie.title)}</div>
            <div class="search-result-meta">
              <span class="year">${new Date(movie.release_date).getFullYear() || "N/A"}</span>
              <span class="rating">⭐ ${movie.vote_average || "N/A"}</span>
            </div>
          </div>
        </div>
      `)
      .join("")

    this.resultsTarget.innerHTML = resultsHTML
    this.resultsTarget.classList.remove("d-none")

    // Add click listeners
    this.resultsTarget.querySelectorAll(".search-result-item").forEach(item => {
      item.addEventListener("click", () => this.selectMovie(item))
    })

    this.selectedIndex = -1
  }

  selectMovie(item) {
    const tmdbId = item.dataset.tmdbId
    const title = item.querySelector(".search-result-title").textContent
    const posterPath = item.querySelector("img")?.src || null

    // Fetch full movie details
    fetch(`/movies/search?q=${encodeURIComponent(title)}&tmdb_id=${tmdbId}`)
      .then(response => response.json())
      .then(movies => {
        const movie = movies.find(m => m.tmdb_id == tmdbId)
        if (movie) {
          this.populateForm(movie)
        }
      })
      .catch(error => console.error("Failed to fetch movie details:", error))

    this.resultsTarget.classList.add("d-none")
  }

  populateForm(movie) {
    document.getElementById("movie_title").value = movie.title
    document.getElementById("movie_description").value = movie.description || ""
    document.getElementById("movie_release_date").value = movie.release_date || ""
    document.getElementById("movie_poster_path").value = movie.poster_path || ""
    document.getElementById("movie_tmdb_id").value = movie.tmdb_id
    document.getElementById("movie_vote_average").value = movie.vote_average || ""
    document.getElementById("movie_popularity").value = movie.popularity || ""

    // Show preview
    this.showPreview(movie)
  }

  showPreview(movie) {
    const previewHtml = `
      <div class="movie-preview-card">
        <div class="preview-content">
          <div class="preview-poster">
            ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">` : '<div class="no-poster-large">📽️</div>'}
          </div>
          <div class="preview-info">
            <h5>${this.escapeHtml(movie.title)}</h5>
            <p class="text-muted small"><strong>Year:</strong> ${new Date(movie.release_date).getFullYear() || "N/A"}</p>
            <p class="text-muted small"><strong>TMDB Rating:</strong> ⭐ ${movie.vote_average || "N/A"}/10</p>
            <p class="text-muted small"><strong>Popularity:</strong> ${(movie.popularity || 0).toFixed(1)}</p>
            <p class="preview-description">${this.escapeHtml(movie.description || "No description available")}</p>
          </div>
        </div>
      </div>
    `
    
    let previewContainer = document.getElementById("movie-preview")
    if (!previewContainer) {
      previewContainer = document.createElement("div")
      previewContainer.id = "movie-preview"
      previewContainer.className = "mt-4 mb-4"
      document.getElementById("movie_title").parentElement.parentElement.insertBefore(previewContainer, document.getElementById("movie_title").parentElement.parentElement.firstChild.nextSibling)
    }
    previewContainer.innerHTML = previewHtml
  }

  handleKeydown(event) {
    if (!this.resultsTarget.classList.contains("d-none")) {
      const items = this.resultsTarget.querySelectorAll(".search-result-item")
      
      if (event.key === "ArrowDown") {
        event.preventDefault()
        this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1)
        this.updateSelection(items)
      } else if (event.key === "ArrowUp") {
        event.preventDefault()
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1)
        this.updateSelection(items)
      } else if (event.key === "Enter") {
        event.preventDefault()
        if (this.selectedIndex >= 0) {
          this.selectMovie(items[this.selectedIndex])
        }
      } else if (event.key === "Escape") {
        this.resultsTarget.classList.add("d-none")
      }
    }
  }

  updateSelection(items) {
    items.forEach((item, index) => {
      if (index === this.selectedIndex) {
        item.classList.add("selected")
        item.scrollIntoView({ block: "nearest" })
      } else {
        item.classList.remove("selected")
      }
    })
  }

  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }
}
