class MoviesController < ApplicationController
  before_action :set_movie, only: [ :edit, :update, :show, :destroy ]
  def index
    @movies = Movie.all
  end

  def show
    @rating = @movie.ratings.build
  end

  def new
    @movie = Movie.new
  end

  def create
    @movie = Movie.new(movie_params)
    if @movie.save
      redirect_to @movie, notice: "Movie was successfully added."
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @movie.update(movie_params)
      redirect_to @movie, notice: "Movie was updated."
    else
      render :edit
    end
  end

  def destroy
    @movie.destroy
    redirect_to movies_url, notice: "Movie was deleted."
  end

  private

  def set_movie
    @movie = Movie.find(params[:id])
  end

  def movie_params
    params.require(:movie).permit(:title, :description, :release_date)
  end
end
