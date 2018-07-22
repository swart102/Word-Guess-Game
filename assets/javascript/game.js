var wins = 0;
var losses = 0;
var displayWord = "";
var correctGuesses = [];
var incorrectGuesses = [];
var word = "word";

document.onkeyup = function (event) {
    var userGuess = event.key;
    
    if (word.indexOf(userGuess) !== -1) {
        if (correctGuesses.indexOf(userGuess) === -1) {
            correctGuesses.push(userGuess);
        } 
    } else if (word.indexOf(userGuess) === -1) {
        if (incorrectGuesses.indexOf(userGuess) === -1) {
            incorrectGuesses.push(userGuess);
            $("#incorrectGuesses").text(incorrectGuesses);
        }
    };

}