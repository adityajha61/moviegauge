# Movie Ratings

A simple Rails application for browsing movies and reading/posting user ratings.

## Features

- **Browse Movies**: View a catalog of movies with detailed information
- **User Authentication**: Sign up and log in with Devise
- **Rate Movies**: Submit and view ratings for movies (1-10 scale)
- **Average Ratings**: See the average rating across all user reviews
- **Movie Management**: Add, edit, and delete movies (admin functionality)

## Requirements

- Ruby 3.x
- Rails 8.0+
- PostgreSQL 12+
- Node.js 18+

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie_ratings
   ```

2. **Install dependencies**
   ```bash
   bundle install
   yarn install
   ```

3. **Configure database**
   ```bash
   bin/rails db:create db:migrate db:seed
   ```

4. **Start the server**
   ```bash
   bin/rails s
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
app/
├── controllers/    # Request handlers for routes
├── models/        # ActiveRecord models (User, Movie, Rating)
├── views/         # ERB templates for rendering pages
└── assets/        # Stylesheets and images

config/
├── routes.rb      # URL routing configuration
└── environment.rb # Environment setup

db/
├── migrate/       # Database migrations
└── seeds.rb       # Sample data
```

## Models

- **User**: User accounts with email authentication
- **Movie**: Movie information (title, description, release date)
- **Rating**: User ratings for movies (score 1-10)

## Testing

Run the test suite:
```bash
bin/rails test
```

## License

This project is open source and available under the MIT License.
