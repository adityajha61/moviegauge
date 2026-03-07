class MoviesController < ApplicationController
  before_action :authenticate_user!, only: [ :new, :create, :edit, :update, :destroy ]
  before_action :set_movie, only: [ :edit, :update, :show, :destroy ]
  
  def index
    if user_signed_in?
      # Show only movies that the current user has rated or interacted with
      @movies = current_user.rated_movies.distinct
      @user_context = :authenticated
    else
      # Show landing page for unauthenticated users
      @user_context = :unauthenticated
    end
  end

  def show
    @rating = @movie.ratings.build if user_signed_in?
    @user_has_rated = @movie.ratings.exists?(user: current_user) if user_signed_in?
  end

  def new
    @movie = Movie.new
  end

  def search
    query = params[:q]
    if query.present? && query.length >= 2
      tmdb_service = TmdbService.new
      results = tmdb_service.search_movies(query)
      render json: results
    else
      render json: []
    end
  end

  def create
    @movie = Movie.new(movie_params)
    if @movie.save
      # Create optional rating if score is provided
      if params[:movie][:rating_score].present?
        rating_score = params[:movie][:rating_score].to_i
        if rating_score.between?(1, 10)
          @movie.ratings.create(user: current_user, score: rating_score)
        end
      end
      redirect_to @movie, notice: "✅ Movie added to your collection!"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @movie.update(movie_params)
      redirect_to @movie, notice: "✅ Movie updated!"
    else
      render :edit
    end
  end

  def destroy
    @movie.destroy
    redirect_to movies_url, notice: "✅ Movie removed from collection."
  end

  private

  def set_movie
    @movie = Movie.find(params[:id])
  end

  def movie_params
    params.require(:movie).permit(:title, :description, :release_date, :tmdb_id, :poster_path, :backdrop_path, :vote_average, :popularity)
  end
end
