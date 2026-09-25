require "test_helper"

class MoviesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "invalid rating input is rejected instead of silently creating a movie" do
    user = User.create!(name: "Test User", email: "movie_test@example.com", password: "password123", confirmed_at: Time.current)
    sign_in user

    assert_no_difference("Movie.count") do
      post movies_path, params: {
        movie: {
          title: "The Matrix",
          description: "A hacker learns reality is a simulation.",
          release_date: "1999-03-31",
          tmdb_id: 603,
          rating_score: 99
        }
      }
    end

    assert_response :unprocessable_entity
    assert_includes response.body, "Rating must be between 1 and 10"
  end
end
