class SessionsController < ApplicationController
  include CurrentUserConcern
  

  def create
    # session.clear
    user = User
            .find_by(email: params["user"]["email"])
            .try(:authenticate, params["user"]["password"])
    if user
      session[:user_id] = user.id
      # set_current_user
      render json: {
        status: :created,
        logged_in: true,
        user: user,
      }
    else
      render json: { status: 401 }
    end
  end

  def logged_in
    # set_current_user
    if @current_user
      render json: {
        logged_in: true,
        current_user: @current_user,
        session: session
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  def logout
    reset_session
    render json: { status: 200, logged_out: true }
  end
end
