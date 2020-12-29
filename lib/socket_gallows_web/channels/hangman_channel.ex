defmodule SocketGallowsWeb.HangmanChannel do
  use Phoenix.Channel

  @impl true
  def join("hangman:game", _args, socket) do
    game = Hangman.new_game()

    {:ok,
     socket
     |> assign(:game, game)}
  end

  @impl true
  def handle_in("tally", _args, %{assigns: %{game: game}} = socket) do
    {:noreply, socket |> push_tally(game)}
  end

  def handle_in("make_move", guess, %{assigns: %{game: game}} = socket) do
    {:noreply, socket |> make_move(game, guess)}
  end

  def handle_in("new_game", _args, socket) do
    handle_in("tally", nil, socket |> new_game())
  end

  defp push_tally(socket, game) do
    socket
    |> push("tally", Hangman.tally(game))

    socket
  end

  defp make_move(socket, game, guess) do
    socket
    |> push("tally", Hangman.make_move(game, guess))

    socket
  end

  defp new_game(socket) do
    socket
    |> assign(:game, Hangman.new_game())
  end
end
