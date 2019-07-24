json.extract! task, :id, :objective_id, :name, :position, :created_at, :updated_at
json.url task_url(task, format: :json)
