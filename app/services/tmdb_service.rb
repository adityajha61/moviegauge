require "httparty"

class TmdbService
  include HTTParty
  base_uri "https://api.themoviedb.org/3"

  def initialize
    @api_key = ENV["TMDB_API_KEY"]
    raise "TMDB_API_KEY not found in environment variables" unless @api_key
  end

  # Search for movies by title
  def search_movies(query, page = 1)
    response = self.class.get(
      "/search/movie",
      query: {
        api_key: @api_key,
        query: query,
        page: page
      }
    )

    results = response["results"] || []
    results.map { |movie| format_movie_data(movie) }
  end

  # Get popular movies
  def popular_movies(page = 1)
    response = self.class.get(
      "/movie/popular",
      query: {
        api_key: @api_key,
        page: page
      }
    )

    results = response["results"] || []
    results.map { |movie| format_movie_data(movie) }
  end

  # Get movie details by TMDB ID
  def movie_details(tmdb_id)
    response = self.class.get(
      "/movie/#{tmdb_id}",
      query: {
        api_key: @api_key
      }
    )

    format_movie_data(response)
  end

  private

  def format_movie_data(movie_data)
    {
      tmdb_id: movie_data["id"],
      title: movie_data["title"],
      description: movie_data["overview"],
      release_date: movie_data["release_date"],
      poster_path: movie_data["poster_path"],
      backdrop_path: movie_data["backdrop_path"],
      vote_average: movie_data["vote_average"],
      popularity: movie_data["popularity"]
    }
  end
end
