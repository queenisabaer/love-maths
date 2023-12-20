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
                //display an alert, if data-type equals submit
                alert("You clicked Submit");
            } else {
                //if it was not submit, that was clicked, set the gameType variable 
                //to the value of that attribute, e.g. addition, division or subtract
                let gameType = this.getAttribute("data-type");
                //add alert that displays the user the button, the user clicked
                //attention: backquotes used to create template iteral
                alert(`You clicked ${gameType}`);
            }

        })
    }
})

// use a docstring to descripe the function, goes right above function
//if function is called later in JS the descriptopn appears in a pop-up, when hovered over

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame() {  //adds the question for the math equation, that is displayed
    /*
    need two random numbers between 1 and 25, that are working as operands
    random numbers can be created by random method from Math object - create number between 0 and 1(not integer)
    to get a number between 1 and 25, multiply the random number by 25 and
    than use floor method from the math object to point number down to whole number
    to avoid getting 0 as a random number(problem in division), add 1
    */
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

}

function checkAnswer() {

}

function calculateCorrectAnswer() {

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion() {

}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}

function displayDivisionQuestion() {

}