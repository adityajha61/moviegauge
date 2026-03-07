# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

puts "Fetching movies from TMDB API..."

tmdb_service = TmdbService.new

# Fetch popular movies from TMDB
popular_movies = tmdb_service.popular_movies(1)

popular_movies.each_with_index do |movie_data, index|
  next if movie_data[:release_date].blank? # Skip movies without release date

  movie = Movie.find_or_create_by(tmdb_id: movie_data[:tmdb_id]) do |m|
    m.title = movie_data[:title]
    m.description = movie_data[:description]
    m.release_date = movie_data[:release_date]
    m.poster_path = movie_data[:poster_path]
    m.backdrop_path = movie_data[:backdrop_path]
    m.vote_average = movie_data[:vote_average]
    m.popularity = movie_data[:popularity]
  end

  puts "✓ Created #{index + 1}: #{movie.title}"
end

# Create some sample users
puts "\nCreating sample users..."
5.times do |i|
  user = User.create(
    name: Faker::Name.name,
    email: Faker::Internet.unique.email,
    password: "password123",
    password_confirmation: "password123"
  )
  puts "✓ Created user: #{user.email}"
end

# Create some sample ratings
puts "\nCreating sample ratings..."
movies = Movie.all
users = User.all

movies.sample(5).each do |movie|
  users.sample(3).each do |user|
    # Skip if rating already exists
    next if Rating.exists?(movie: movie, user: user)

    Rating.create(
      movie: movie,
      user: user,
      score: rand(1..5)
    )
    puts "✓ #{user.email} rated #{movie.title}: #{Rating.last.score}/5"
  end
end

puts "\n✓ Seeding complete!"
puts "Total movies: #{Movie.count}"
puts "Total users: #{User.count}"
puts "Total ratings: #{Rating.count}"