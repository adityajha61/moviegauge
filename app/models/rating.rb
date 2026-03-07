class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :movie

  validates :score, presence: true, inclusion: { in: 1..10, message: "must be between 1 and 10" }
  validates :user_id, uniqueness: { scope: :movie_id, message: "can only rate a movie once. Edit your rating if you want to change it." }
end
