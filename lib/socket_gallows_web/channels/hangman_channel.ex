defmodule SocketGallowsWeb.HangmanChannel do
  use Phoenix.Channel

  @impl true
  def join("hangman:game", _args, socket) do
    {:ok, socket}
  end
end
