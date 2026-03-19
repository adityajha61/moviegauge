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

## Email Confirmation Setup (Devise + Brevo)

This app uses Devise email confirmation (`:confirmable`). New users must confirm their email before they can log in.

### Local development

1. Install dependencies after pulling latest changes:
   ```bash
   bundle install
   ```
2. Copy environment template:
   ```bash
   cp .env.example .env
   ```
3. Run migrations:
   ```bash
   bin/rails db:migrate
   ```
4. Start app:
   ```bash
   bin/dev
   ```
5. By default in development, emails open in browser via Letter Opener Web:
   - Inbox UI: `http://localhost:3000/letter_opener`

To send real emails from local using Brevo, set SMTP values in `.env` (`SMTP_ADDRESS`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`).

### Production (Brevo SMTP)

Set these environment variables in your deployment platform:

- `APP_HOST` (for example, `moviegauge.example.com`)
- `APP_PROTOCOL=https`
- `MAILER_FROM` (for example, `noreply@yourdomain.com`)
- `MAILER_DOMAIN` (your email/domain)
- `SMTP_ADDRESS=smtp-relay.brevo.com`
- `SMTP_PORT=587`
- `SMTP_USERNAME` (Brevo SMTP login)
- `SMTP_PASSWORD` (Brevo SMTP key)
- `SMTP_AUTH=login`
- `SMTP_ENABLE_STARTTLS_AUTO=true`

In Brevo dashboard:

1. Verify sender email or domain.
2. Create an SMTP key.
3. Use that SMTP login/key in the app environment variables.

After deploy, sign up with a new account and confirm that the confirmation email arrives and the link activates the account.

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
