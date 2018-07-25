var winTotal = -1;
var win = false;
var displayWord = [];
var correctGuesses = [];
var incorrectGuesses = [];
var guessTotal = 12;
var word = "";
var image = "";
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var fruit = {
    1:"banana",
    2:"apple",
    3:"orange",
    4:"grape",
    5:"strawberry",
    6:"raspberry",
    7:"blackberry",
    8:"watermelon",
    9:"cantaloupe",
    10:"blueberry",
    11:"peach",
    12:"tangerine"
};
var fruitImg = {
    1:"assets/images/banana.jpg",
    2:`assets/images/apple.jpg`,
    3:`assets/images/orange.jpg`,
    4:`assets/images/grape.jpg`,
    5:`assets/images/strawberry.jpg`,
    6:`assets/images/raspberry.jpg`,
    7:`assets/images/blackberry.jpg`,
    8:`assets/images/watermelon.jpg`,
    9:`assets/images/cantaloupe.jpg`,
    10:`assets/images/blueberry.jpg`,
    11:`assets/images/peach.jpg`,
    12:`assets/images/tangerine.jpg`
};

//choose the word and prep the displayed word
var randomNum = function() {
    choice = Math.floor(Math.random()*12)+1;
    return choice;
}

var choose = function() {
    randNum = randomNum();
    word = fruit[randNum];
    for (i=0; i<word.length; i++) {
        displayWord[i] = "_";
    };
    image = fruitImg[randNum];
    return word, displayWord, image;
};

//Where is the letter in the word?
var where = function(guess, indWord) {
    var indexes = [];
    for (i=0; i<indWord.length; i++) {
        if(guess === indWord[i]) {
            indexes.push(i);
        };
    };
    return indexes;
};  

//Change the displayed word
var changeDisplay = function(indexes, wordArray, letter) {
    $.each(indexes, function(index, indices) {
        if (wordArray[indices] === "_"){
            wordArray[indices] = letter;
        };
    });
    $("#word").text(wordArray);
};

//Check to see if the user wins
var winCheck = function(userWord) {
    if (userWord.indexOf("_") === -1) {
        return true
    } else {
        return false
    }
};

//When a key is pressed, check to see if the guess is incorrect or correct
document.onkeyup = function (event) {
    var userGuess = event.key;
    if (winTotal === -1) {
        winTotal++;
        word, displayWord, image = choose();   
        $("#word").text(displayWord);
        $("#wins").text("Wins: " + winTotal);
    }
    if (alphabet.indexOf(userGuess) !== -1 &&
        correctGuesses.indexOf(userGuess) === -1 &&
        incorrectGuesses.indexOf(userGuess)=== -1) {
        if (word.indexOf(userGuess) !== -1) {
            var indexes = where(userGuess, word);
            if (correctGuesses.indexOf(userGuess) === -1) {
                correctGuesses.push(userGuess);
                changeDisplay(indexes, displayWord, userGuess);
                win = winCheck(displayWord);
                if (win === true) {
                    winTotal++;
                    $("#wins").text("Wins: " + winTotal);
                    guessTotal = 12;
                    incorrectGuesses = [];
                    correctGuesses = [];
                    displayWord = [];
                    $("#image-div").html("<img src="+ image + ">");
                    $("#incorrectGuesses").text(incorrectGuesses);
                    $("#remainingGuesses").text("Number of Guesses Remaining: " + guessTotal);
                    $("#answer").text(word);
                    word, displayWord, image = choose();
                    $("#word").text(displayWord);
                    win = false;
                };
            };  
        } else if (word.indexOf(userGuess) === -1) {
                if (incorrectGuesses.indexOf(userGuess) === -1) {
                    incorrectGuesses.push(userGuess);
                    $("#incorrectGuesses").text(incorrectGuesses);
                    guessTotal--;
                    $("#remainingGuesses").text("Number of Guesses Remaining: " + guessTotal);
                    if (guessTotal === 0) {
                        guessTotal = 12;
                        incorrectGuesses = [];
                        correctGuesses = [];
                        displayWord = [];
                        $("#image-div").html("<img src="+image+ "/>");
                        $("#incorrectGuesses").text(incorrectGuesses);
                        $("#remainingGuesses").text("Number of Guesses Remaining: " + guessTotal);
                        $("#answer").text(word);
                        word, displayWord,image = choose();
                        $("#word").text(displayWord);
                        win = false;
                    };
                };
            };
    }; 
    
}; 


