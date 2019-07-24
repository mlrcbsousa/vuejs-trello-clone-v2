class Task < ApplicationRecord
  belongs_to :objective

  acts_as_list scope: :objective

  validates :name, presence: true
end
