class BoardChannel < ApplicationCable::Channel
  def subscribed
    # loop through boards user is connected to
    # build method that would stream from it temporarily when you navigated to that page
    stream_from "board"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end
end
