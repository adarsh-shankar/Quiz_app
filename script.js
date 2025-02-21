// accessing html into js 

const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');

// alg div hai 
const scoreCard = document.querySelector('.scoreCard');

const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer 
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", " let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    }
];

// Making Variables
let currentQuestionIndex = 0; //question ke indexing object me se maintain krega 0 based hai ye 
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions , just to list question in that container 
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex]; // array ka 0 th index
    questionBox.textContent = questionDetails.question; // array ka 0th question aa gya yha pe // ab first question add ho jayega

    choicesBox.textContent = ""; // clearing the option wala temporary
    // loop from 0 to no. of option ke size tk jo choices hai yha pe
    for (let i = 0; i < questionDetails.choices.length; i++) 
    {
        const currentChoice = questionDetails.choices[i];//one by one 
        const choiceDiv = document.createElement('div'); // dom manipulation se div create hua js se hi (choice div ke naam se )
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice'); //yha pe div jo bna hai usko naam diya jaa rha hai choice , style krne ke liye 
        choicesBox.appendChild(choiceDiv);
        //upr ke teen line se saare option ko ek div mil rha hai box like structure , pr abhi bhi border nhi bn rha , aur next dbate dbate dbate baar baar same option aata jaa rha hai 
        
        
        //option pe click hone pr ye ho 
        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }
    // next pe click krne se next question aaye uske liye 

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers , ki jo answer selct hua hai wo kaisa hai right or wrong
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected'); //selected hoice me gya wo jo select hua hai 
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {

    questionBox.textContent = "";
    choicesBox.textContent = "";
    //upr ke do line me blank krne ke liye kiya jaa rha hai ek baar jb saare answers submit ho jayenge to sb blank ho jayega
    
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    // same button ka naam next se change ho ke play again me ho gya 
    nextBtn.textContent = "Play Again"; 
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{ 
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});