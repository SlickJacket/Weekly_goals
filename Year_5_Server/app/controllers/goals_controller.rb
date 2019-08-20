class GoalsController < ApplicationController

    def index 
        @goals = Goal.all
        render json: @goals
    end

    def show
        @goal = Goal.find(params[:id])
        render json:@goal
    end 

    def new

    end

    def create

    end

    def edit

    end

    def update

    end

    def destroy

    end

    
end
