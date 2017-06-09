class NotesController < ApplicationController
  before_action :authenticate_user!

  # GET /notes
  def index
    @note = Note.all
    json_response(@note)
  end

  # POST /notes
  def create
    @note = Note.create!(note_params)
    json_response(@note, :created)
  end

  # GET /notes/:id
  def show
    set_note
    json_response(@note)
  end

  # DELETE /notes/:id
  def destroy
    @note.destroy
    head :no_content
  end

  private

  def note_params
    params.permit(:title, :created_by)
  end

  def set_note
    @note = Note.find(params[:id])
  end
end
