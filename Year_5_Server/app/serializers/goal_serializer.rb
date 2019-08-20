class GoalSerializer < ActiveModel::Serializer
  attributes :id, :title, :content , :user_id, :dataset
end
