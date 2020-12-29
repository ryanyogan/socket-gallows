import HangmanSocket from "./hangman_socket";

const RESPONSES = {
  won: ["success", "You Won!"],
  lost: ["danger", "You Lost!"],
  good_guess: ["success", "Good guess!"],
  bad_guess: ["warning", "Bad guess!"],
  already_used: ["info", "You already guessed that"],
  initializing: ["info", "Let's Play!"],
};

const App = (hangman) => {
  const app = new window.Vue({
    el: "#app",
    data: {
      tally: hangman.tally,
    },
    computed: {
      gameOver() {
        const state = this.tally.game_state;
        return state === "won" || state === "lost";
      },
      gameStateMessage() {
        const state = this.tally.game_state;
        return RESPONSES[state][1];
      },
      gameStateClass() {
        const state = this.tally.game_state;
        return RESPONSES[state][0];
      },
    },
    methods: {
      guess(ch) {
        hangman.makeMove(ch);
      },
      newGame() {
        hangman.newGame();
      },
      alreadyGuessed(ch) {
        return this.tally.used.indexOf(ch) >= 0;
      },
      correctGuess(ch) {
        return this.alreadyGuessed(ch) && this.tally.letters.indexOf(ch) >= 0;
      },
      turnsGt(left) {
        return this.tally.turns_left > left;
      },
    },
  });

  console.log(hangman);

  return app;
};

window.onload = () => {
  const tally = {
    turns_left: 7,
    letters: ["a", "_", "c"],
    game_state: "initializing",
    used: [],
  };
  const hangman = new HangmanSocket(tally);
  const app = App(hangman);

  hangman.connectToHangman();
};
