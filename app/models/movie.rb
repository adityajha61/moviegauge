class Movie < ApplicationRecord
  has_many :ratings, dependent: :destroy
  has_many :reviewers, through: :ratings, source: :user

  validates :title, presence: true
  validates :tmdb_id, presence: true, uniqueness: { message: "already exists in your collection" }
  validates :release_date, presence: true

  # Generate poster URL for images
  def poster_url
    return nil unless poster_path.present?
    "https://image.tmdb.org/t/p/w500#{poster_path}"
  end

  # Generate backdrop URL for images
  def backdrop_url
    return nil unless backdrop_path.present?
    "https://image.tmdb.org/t/p/w1280#{backdrop_path}"
  end

  # Get average rating from users
  def average_rating
    ratings.average(:score).to_f.round(1)
  end

  # Get rating count
  def rating_count
    ratings.count
  end
end
