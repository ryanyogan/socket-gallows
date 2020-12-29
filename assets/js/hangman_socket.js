import { Socket } from "phoenix";

class HangmanSocket {
  constructor(tally) {
    this.tally = tally;
    this.socket = new Socket("/socket", {});
    this.socket.connect();
  }

  connectToHangman() {
    this.setupChannel();
    this.channel
      .join()
      .receive("ok", (resp) => {
        this.fetchTally();
      })
      .receive("error", (resp) => {
        console.error(error);
      });
  }

  setupChannel() {
    this.channel = this.socket.channel("hangman:game", {});
    this.channel.on("tally", (tally) => {
      this.copyTally(tally);
    });
  }

  fetchTally() {
    this.channel.push("tally", {});
  }

  makeMove(guess) {
    this.channel.push("make_move", guess);
  }

  newGame() {
    this.channel.push("new_game", {});
  }

  copyTally(from) {
    for (let k in from) {
      this.tally[k] = from[k];
    }
  }
}

export default HangmanSocket;
