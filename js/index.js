//Globala variabler
let startGameBtn = document.querySelector("#startGame");
const wordArr = ['XYLOFON', 'CELLO', 'GITARR', 'TUBA', 'PIANO', 'KLARINETT', 'FIOL', 
'VIOLA', 'TRUMPET', 'MANDOLIN', 'BLOCKFLÖJT', 'TVÄRFLÖJT', 'PUKA', 'HARPA'];
let randomWord = wordArr[Math.floor(Math.random()*wordArr.length)];
let guesses = 0;
let guessedRight = 0;
let message = document.getElementById("message");
let letterBoxes = document.getElementById("letterBoxes");
let letterBtns = document.querySelectorAll(".letterBtns");
let letters = document.querySelector("#letters");
let hangmanPic = "images/h0.png";
let livesRemain = document.querySelector("#livesRemain");
let restartBtn = document.querySelector("#restartBtn");

//Globala styles
startGameBtn.style = "height: 50px; width: 200px; font-size: x-large";
letters.style = "display: none";
restartBtn.style = "display: none";

//Eventlisteners
startGameBtn.addEventListener("click", startGame);
letterBtns.forEach(el => el.addEventListener('click', clickLetter));
restartBtn.addEventListener("click", restartGame);

//Funktioner
function startGame() {
    letters.style = "display: null";
    startGameBtn.style = "display: none";
   return randomWordGenerator() && createLetterBoxes();
}

function randomWordGenerator() {
    return randomWord;
}

function createLetterBoxes() {
    for(i = 0; i < randomWord.length; i++) {
        const div = document.createElement("div");
        div.style = "border: 1px solid black; width: 40px; height: 40px; margin: 5px; display: flex; justify-content: center; align-items: center";
        letterBoxes.appendChild(div);
        letterBoxes.style = "display: flex; justify-content: center; margin-top: 20px"
    }
}

function clickLetter () {
    const letterBoxEl = document.querySelectorAll("section#letterBoxes > div");
    const guessedLetter = this.innerText;
    const arrOf = Array.of(letterBoxEl)
    let correctLetter = false;

    arrOf[0].forEach((element, index) => {
        
        if(guessedLetter === randomWord[index]) {
            element.innerText = guessedLetter;
            correctLetter = true;
            guessedRight++;
        } 

    })
    
     if (correctLetter === false && guesses < 6)  {   
        guesses++;
        hangmanPic = document.getElementById("hangman");
        hangmanPic.src = "images/h" + guesses + ".png";
        livesRemain.innerHTML = `Du har gissat fel ${guesses} gånger`;
        
     }
     else if (correctLetter === false && guesses >= 6) {
        youLoose();
     }
    

    else if (guessedRight === randomWord.length) {
        youWin();
    } 
    console.log(guesses);
    this.disabled = true;
} 


function youWin () {
    message.textContent = `Du vinner! Ordet var: ${randomWord}`;
    message.style.fontSize = "xx-large";
    restartBtn.textContent = 'restart game!'
    restartBtn.style = "display: null; height: 100px; width: 200px";
    letters.style = "display: none";
    
}

function youLoose () {
    hangmanPic.style = "display: none";
    message.textContent = `Du förlorar! ordet var: ${randomWord}`;
    message.style.fontSize = "xx-large";
    restartBtn.textContent = 'restart game!'
    restartBtn.style = "display: null; height: 100px; width: 200px";
    letters.style = "display: none";

}

//Funktion som startar om spelet
function restartGame() {
    randomWordGenerator();
   return letters.style = "display: none"
}

restartGame();











