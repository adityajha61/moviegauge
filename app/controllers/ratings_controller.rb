class RatingsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_movie
  before_action :set_rating, only: [ :edit, :update, :destroy ]
  before_action :authorize_rating!, only: [ :edit, :update, :destroy ]

  def create
    @rating = @movie.ratings.build(rating_params)
    @rating.user = current_user
    if @rating.save
      redirect_to @movie, notice: "✅ Rating saved! Thanks for sharing."
    else
      @rating = @movie.ratings.build
      render "movies/show"
    end
  end

  def edit
  end

  def update
    if @rating.update(rating_params)
      redirect_to @movie, notice: "✅ Rating updated!"
    else
      render :edit
    end
  end

  def destroy
    @rating.destroy
    redirect_to @movie, notice: "✅ Rating deleted."
  end

  private

  def set_movie
    @movie = Movie.find(params[:movie_id])
  end

  def set_rating
    @rating = @movie.ratings.find(params[:id])
  end

  def authorize_rating!
    redirect_to @movie, alert: "You can only edit your own ratings." unless @rating.user == current_user
  end

  def rating_params
    params.require(:rating).permit(:score)
  end
end
