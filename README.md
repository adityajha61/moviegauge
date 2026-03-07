# 🎬 MovieGauge

Discover, rate, and gauge the perfect movie. MovieGauge is a modern Rails application for browsing movies, rating them, and seeing what the community thinks.

## ✨ Features

- **Discover Movies**: Browse a stunning catalog of movies with beautiful imagery and detailed information
- **User Authentication**: Secure sign up and login with Devise
- **Rate Movies**: Submit and view ratings for movies (1-10 scale)
- **Community Ratings**: See average ratings and what other users think
- **Movie Management**: Add, edit, and delete movies from your collection
- **Modern UI**: Beautiful, responsive design with smooth animations

## 🛠️ Requirements

- Ruby 3.x
- Rails 8.0+
- PostgreSQL 12+
- Node.js 18+

## 🚀 Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movieGauge
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

## 📁 Project Structure

```
app/
├── controllers/    # Request handlers for routes
├── models/        # ActiveRecord models (User, Movie, Rating)
├── views/         # ERB templates
└── assets/        # Stylesheets and images

config/
├── routes.rb      # URL routing
└── environment.rb # Environment setup

db/
├── migrate/       # Database migrations
└── seeds.rb       # Sample data
```

## 📊 Models

- **User**: User accounts with email authentication
- **Movie**: Movie information (title, description, release date)
- **Rating**: User ratings for movies (score 1-10)

## 🧪 Testing

Run the test suite:
```bash
bin/rails test
```

## 📄 License

This project is open source and available under the MIT License.
