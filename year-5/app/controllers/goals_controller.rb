class GoalsController < ApplicationController
    before_action: :find_goal, only: [:show, :update, :destroy]

    def index 
        @goals = Goal.all
        render json: @goals
    end

    def show
        render json:@goal
    end 

    def create
        @goal = Goal.new(goal_params)
    
        if @goal.save
            render json: @goal, status: :created, location: @goal
        else
            render json: @goal.errors, status: :unprocessable_entity
        end
    end
    
    def update
        if @goal.update(goal_params)
            render json: @goal
        else
            render json: @goal.errors, status: :unprocessable_entity
        end
    end
    
    def destroy
        @goal.destroy
    end

    private

    def goals_params
        params.require(:goal).permit(:title, :content)
    end

    def find_goal
        @goal = Goal.find(params[:id])
    end


end
