const readline = require("readline");

// create interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// define inputs
const INPUTS = {
  UP: "w",
  DOWN: "s",
  LEFT: "a",
  RIGHT: "d",
  EXIT: "q"
};

// a function to handle movement input. It will loop and
// continue to call itself until the user inputs "q" to exit.
function getMovement() {
  rl.question("Use WASD to move and press Q to exit: ", input => {
    switch (input) {
      case INPUTS.UP:
        console.log("you moved up");
        getMovement();
        break;
      case INPUTS.DOWN:
        console.log("you moved down");
        getMovement();
        break;
      case INPUTS.LEFT:
        console.log("you moved left");
        getMovement();
        break;
      case INPUTS.RIGHT:
        console.log("you moved right");
        getMovement();
        break;
      case INPUTS.EXIT:
        exitProgram();
        break;
      default:
        console.log("sorry, I didn't understand that");
        getMovement();
    }
  });
}

// a function to close the program. By default, it just calls
// the readline interface, but it might do more in the future.
function exitProgram() {
  console.log("leaving the program");
  rl.close();
}

getMovement();
