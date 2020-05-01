let squares = document.getElementsByClassName("square"),
freeSquare = document.querySelector("#free-space"),
cardNumb = document,
bSquare = cardNumb.getElementById("b"),
iSquare = cardNumb.getElementById("i"),
nSquare = cardNumb.getElementById("n"),
gSquare = cardNumb.getElementById("g"),
oSquare = cardNumb.getElementById("o"),
bingoSquares = document.getElementsByClassName("bingo-squares"),
bingoSquaresArray = [bSquare, iSquare, nSquare, gSquare, oSquare], //array of id's of the bingo squares
bSquares = cardNumb.querySelectorAll(".b-square"),
iSquares = cardNumb.querySelectorAll(".i-square"),
nSquares = cardNumb.querySelectorAll(".n-square"),
gSquares = cardNumb.querySelectorAll(".g-square"),
oSquares = cardNumb.querySelectorAll(".o-square"),
bSquaresAdditional = cardNumb.querySelectorAll(".b-square-additional"),
iSquaresAdditional = cardNumb.querySelectorAll(".i-square-additional"),
nSquaresAdditional = cardNumb.querySelectorAll(".n-square-additional"),
gSquaresAdditional = cardNumb.querySelectorAll(".g-square-additional"),
oSquaresAdditional = cardNumb.querySelectorAll(".o-square-additional"),
newCard = document.getElementById("new-card"),
addCard = document.getElementById("add-card"),
bCells = 5,
iCells = 5,
nCells = 4,
gCells = 5,
oCells = 5,
bSquaresArray = [],
iSquaresArray = [],
nSquaresArray = [],
gSquaresArray = [],
oSquaresArray = [],
bSquaresMin = 1,
bSquaresMax = 15,
iSquaresMin = 16,
iSquaresMax = 30,
nSquaresMin = 31, 
nSquaresMax = 45, 
gSquaresMin = 46,
gSquaresMax = 60,
oSquaresMin = 61,
oSquaresMax = 75;
//possible winners array
const winners = [
    ["b-1", "i-1", "n-1", "g-1", "o-1"],
    ["b-2", "i-2", "n-2", "g-2", "o-2"],
    ["b-3", "i-3", "free-space", "g-3", "o-3"],
    ["b-4", "i-4", "n-4", "g-4", "o-4"],
    ["b-5", "i-5", "n-5", "g-5", "o-5"],
    ["b-1", "b-2", "b-3", "b-4", "b-5"],
    ["i-1", "i-2", "i-3", "i-4", "i-5"],
    ["n-1", "n-2", "free-space", "n-4", "n-5"],
    ["g-1", "g-2", "g-3", "g-4", "g-5"],
    ["o-1", "o-2", "o-3", "o-4", "o-5"],
    ["b-1", "i-2", "free-space", "g-4", "o-5"],
    ["o-1", "g-2", "free-space", "i-4", "b-5"],
];
let possibleWinners = winners.length;
let selected = ["free-space"];

init();

function init(){
    newCardFunc();
    setBingoSquares();
    generateArray(bSquaresMin, bSquaresMax, bSquaresArray);
    generateArray(iSquaresMin, iSquaresMax, iSquaresArray);
    generateArray(nSquaresMin, nSquaresMax, nSquaresArray);
    generateArray(gSquaresMin, gSquaresMax, gSquaresArray);
    generateArray(oSquaresMin, oSquaresMax, oSquaresArray);
    shuffle(bSquaresArray);
    shuffle(iSquaresArray);
    shuffle(nSquaresArray);
    shuffle(gSquaresArray);
    shuffle(oSquaresArray);
    changeHtml(bSquares, bSquaresArray, bCells);
    changeHtml(iSquares, iSquaresArray, iCells);
    changeHtml(nSquares, nSquaresArray, nCells);
    changeHtml(gSquares, gSquaresArray, gCells);
    changeHtml(oSquares, oSquaresArray, oCells);
    setSquares(squares);
    freeSquareReset(); 
}
function generateArray(min, max, emptyArray){
    for (let i = min; i < (max + 1); i++) {
    emptyArray.push(i);
    }
}


//shuffle function Fisher-Yates (aka Knuth) Shuffle
////somehow jumble order should work to shuffle the numbers
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  // Used like so

//for loop
//change innerHTML to first five numbers from array 
function changeHtml(letteredSquares, emptyArr, numbCells){
    for (let i = 0; i < numbCells; i++) {
        letteredSquares[i].innerHTML = emptyArr[i];
    }
}
//remove .bingo-squares class 
function setBingoSquares(){
    for (let i = 0; i < bingoSquaresArray.length; i++) {
        bingoSquaresArray[i].classList.remove("bingo-squares");   
    }
}
//add event listeners to squares//
function setSquares(array){
    for(var i=0; i < array.length; i++){
            array[i].classList.remove("selected");
            freeSquare.classList.add("selected");
            array[i].addEventListener("click", function(){
                this.classList.add("selected");
                
        });
    }
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function(){
            selected.push(squares[i].getAttribute("id"));
            console.log(selected);
            bingoTest();
        })
        };
};

//winning
//bingo() function, what happens when you win

function bingo(){

    for (let i = 0; i < bingoSquaresArray.length; i++) {
        // bingoSquares[i].classList.add("bingo");
       setTimeout(function(){
           bingoSquaresArray[i].classList.add("bingo-squares");
            if (i == 4){
                for(let j = bingoSquaresArray.length - 1; j >= 0 ; j--){
                    setTimeout(function(){bingoSquaresArray[j].classList.remove("bingo-squares");}, j*500);
        };
        }}, i * 1000);
    
       //pause 1 sec
    //    bingoSquares[i].classList.remove("bingo");
       //pause 1 sec
    }
}
//bingoTest() function, tests if you have a bingo
function bingoTest(){
for (let i = 0; i < possibleWinners; i++) {
    var cellExists = 0;
    for(var j = 0; j < 5; j++){
        console.log(winners[i][j],"winners[i][j]");
        if(selected.indexOf(winners[i][j]) > -1){
            cellExists++;
            console.log(cellExists, "cell exists");
            if(cellExists == 5){
                bingo();
                break;
            }
        }
    }
};
}

//newCard
//this function will give new numbers to the card and clear it 

function newCardFunc(){
    newCard.addEventListener("click", function(){
        bSquaresArray = [];
        iSquaresArray = [];
        nSquaresArray = [];
        gSquaresArray = [];
        oSquaresArray = [];
        selected = ["free-space"];
        init();
})};


//free space button click//
function freeSquareReset(){
    freeSquare.addEventListener("click", function(){
        setSquares(squares);
        for (let i = 0;  i < bingoSquaresArray.length; i++){
            bingoSquaresArray[i].classList.remove("bingo-squares");
        }
        selected = ["free-space"];
        }
    )};

