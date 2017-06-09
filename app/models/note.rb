class Note < ApplicationRecord
  validates_presence_of :title, :created_by 
end
