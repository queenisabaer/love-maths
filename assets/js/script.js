//Wait for the DOM to finish loading before running the game
//Get button elements and add event listeners to them

//Eventlistener will wait for the DOM Content to be loaded and then it will execute the function
document.addEventListener("DOMContentLoaded", function(){
    //the function is to add an Eventlistener for buttons, 
    //ElementsByTagName Method returns all elements that it found in an array
    let buttons = document.getElementsByTagName("button");

    /*
    iterate through array created through ElementsByTagName Method
    syntax "button of buttons" is more modern than (let i=0; i< xxx.length; i++),
    will go through buttons array created by ElementsByTagName
    return each element in the array and store it in variable button on each iteration
    */
    for(let button of buttons){
        //Add Eventlistener to these buttons of (let button of buttons) from array
        //button represent individual button element from array created
        //when clicked, it will run the following if-function
        button.addEventListener("click", function(){
            /*
            if-statement checks the data-type of the button(s) 
            this is referring to the button, that is clicked, 
            e.g. addition button is clicked, this referrs to this addition button
            then use the get Attribute method and check the contents of data-type costum attribute
            */
            if (this.getAttribute("data-type") === "submit") {
                //First attemtp for practicing: display an alert, if data-type equals submit. alert("You clicked Submit");
                // call the check answer function
                checkAnswer();
            } else {
                //if it was not submit, that was clicked, set the gameType variable 
                //to the value of that attribute, e.g. addition, division or subtract
                let gameType = this.getAttribute("data-type");
                //First attempt: add alert that displays the user the button, the user clicked. attention: backquotes used to create template iteral. alert(`You clicked ${gameType}`);
                //final attempt: call the runGame function
                runGame(gameType);
            }

        })
    }

    //UX: submit with enter key
    //add eventListener to answer box, when key is pressed down, then call a function with an event object
    document.getElementById('answer-box').addEventListener("keydown", function(event){
        //check a property of that event object, which is the key property
        if (event.key === "Enter") {
            checkAnswer();     // if enter key was pressend, then the checkAnswer function runs
        }
    })

    //Create a default game (addition) that starts as soon as page is loaded 
    runGame('addition')
})

// use a docstring to descripe the function, goes right above function
//if function is called later in JS the descriptopn appears in a pop-up, when hovered over

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {  //adds the question for the math equation, that is displayed. gameType is Parameter/Argument, which game is played
    //UX: sets the value(input element) of the answerbox to an empty string, so every time the runGame function is called, the answer box will be empty
    document.getElementById('answer-box').value = ""; 

    //UX: set cursor in the answer box as soon as page is loaded, so don't have to click on it again
    document.getElementById('answer-box').focus();

    /*
    need two random numbers between 1 and 25, that are working as operands
    random numbers can be created by random method from Math object - create number between 0 and 1(not integer)
    to get a number between 1 and 25, multiply the random number by 25 and
    than use floor method from the math object to point number down to whole number
    to avoid getting 0 as a random number(problem in division), add 1
    */
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    //check which game type is played and call the appropriate function to display question
    if (gameType === 'addition'){
        //if gametype is equal to addition, want to display addition question function
        //pass the two random numbers
        displayAdditionQuestion(num1, num2);
    } else if (gameType === 'subtract')  {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === 'multiply')  {
        displayMultiplyQuestion(num1, num2);
    } else { //if gametype is unknown(error), alert for user and throw gametype, which was unknown to console for debugging
        alert(`Unknown game type: ${gameType}`); 
        throw `Unknown game type: ${gameType}. Aborting!`; //throw will stop game from running, errormessage will be displayed in console

    }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */

function checkAnswer() {
    //read the user answer from the dom and return it as integer(parseInt), 
    //target is the answer-box, because it is an input element get no.innerText, but .value
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    //getting correct answer from the calculateCorrectAnswer function
    let calculatedAnswer = calculateCorrectAnswer(); //this will return an array! because of return [operand1 + operand2, "addition"]
    let isCorrect = userAnswer === calculatedAnswer[0];

    //if isCorrect becomes true - can congratulate user, because they got it right
    // isCorrect is shortcut for isCorrect === true
    if (isCorrect) {
        alert("Hey! You got it right :D");
        incrementScore();
    } else { //tell user what correct answer was 
        alert(`Awwwww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}.`);
        incrementWrongAnswer();
    }
    //run another game of the same type, use the second element of the calculateCorrectAnswer array
    runGame(calculatedAnswer[1]);

}

/**
 * Gets the opperands (the numbers)  and the operator (plus, minud etc)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {
    /*
    reading values from DOM(getting them from the DOM) and storing them in variables and calculate the correct answer
    by default JavaScript return data it gets from the data as a string. 
    Can't mathematical operate on strings, so a number is needed.
    use parseInt, which parses(analysieren) a string argument and returns an integer
    */
    //create variable called operand 1 that stores the inner text(the value) of element with id operand1
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    //create variable called operand 2 that stores the inner text(the value) of element with id operand2
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    //creates a variable called operator, that reads the text content of element with id operator
    let operator = document.getElementById('operator').innerText;

    /*
    calculate the correct answer based on gametype. 
    determining the game type(addition, subtract, multiplication, division) by its operator (+ - * /)
    */
   if (operator === "+") {
    //if operator equals the "+"-sign, it must be an addition game, 
    //so it calculates the correct answer by returning the variables operand1 + operand2
    //returns an array with 2 elements: first is the correct answer (sum), second is gametype "addition"
    return [operand1 + operand2, "addition"]
   } else if (operator === "-") {
    return [operand1 - operand2, "subtract"]
   } else if (operator === "x") {
    return [operand1 * operand2, "multiply"]
   } else {
    alert(`Unimplemented operator ${operator}`);
    throw `Unimplemented operator ${operator}.Aborting!`;
   }


}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
    //read the current score from the DOM, retrieving it from the element with id "score"
    let oldScore = parseInt(document.getElementById('score').innerText);
    //increase the score(attention: you need again the inner text!) by adding one
    document.getElementById('score').innerText = ++oldScore;

}

/**
 * Gets the current score of incorrect answers and increases them
 */
function incrementWrongAnswer() {
    //read the current score from the DOM, retrieving it from the element with id "incorrect"
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    //increase the score by adding one
    document.getElementById("incorrect").innerText = ++oldScore;

}

function displayAdditionQuestion(operand1, operand2) { //two arguments, this function will accept are the operands, we created
    document.getElementById('operand1').innerText = operand1;
    document.getElementById('operand2').innerText = operand2;
    document.getElementById('operator').innerText = "+";

}

function displaySubtractQuestion(operand1, operand2) {
    //checking if operand1 is larger than operand2(?), than display operand1, if not (:) display operand2
    document.getElementById('operand1').innerText = operand1 > operand2 ? operand1 : operand2;
    //checking if operand1 is larger than operand2(?), than display operand 2, if not(:) display operand1
    document.getElementById('operand2').innerText = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').innerText = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').innerText = operand1;
    document.getElementById('operand2').innerText = operand2;
    document.getElementById('operator').innerText = "x";
}

function displayDivisionQuestion() {

}