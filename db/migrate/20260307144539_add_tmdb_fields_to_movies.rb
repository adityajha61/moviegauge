class AddTmdbFieldsToMovies < ActiveRecord::Migration[8.0]
  def change
    add_column :movies, :tmdb_id, :integer
    add_column :movies, :poster_path, :string
    add_column :movies, :backdrop_path, :string
    add_column :movies, :vote_average, :decimal
    add_column :movies, :popularity, :decimal
  end
end
