const readline = require("readline");
const { Writable } = require("stream");

// this stream is a wrapper around stdout.
// it intercepts the user's input and only prints
// it out if the "muted" property is true. Based
// on this Stackoverflow answer:
// https://stackoverflow.com/a/33500118
class MutedStdOut extends Writable {
  constructor({ muted, ...options }) {
    super(options);
    this.muted = muted;
  }

  _write(chunk, encoding, callback) {
    if (!this.muted) {
      process.stdout.write(chunk, encoding);
    }
    callback();
  }
}

const out = new MutedStdOut({ muted: true });

// allow the readline interface to respond
// to keypress events
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

// create interface
const rl = readline.createInterface({
  input: process.stdin,
  output: out
});

// define inputs
const INPUTS = {
  UP: "w",
  DOWN: "s",
  LEFT: "a",
  RIGHT: "d",
  EXIT: "q"
};

process.stdin.on("keypress", input => {
  out.write(input);
  switch (input) {
    case INPUTS.UP:
      console.log("you moved up");
      break;
    case INPUTS.DOWN:
      console.log("you moved down");
      break;
    case INPUTS.LEFT:
      console.log("you moved left");
      break;
    case INPUTS.RIGHT:
      console.log("you moved right");
      break;
    case INPUTS.EXIT:
      exitProgram();
      break;
    default:
      console.log("sorry, I didn't understand that");
  }
});

// a function to close the program. By default, it just calls
// the readline interface, but it might do more in the future.
function exitProgram() {
  console.log("leaving the program");
  rl.close();
}

console.log("Use WASD to move and press Q to exit:");
