class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :end_goal, :url
  has_many :goals
end
