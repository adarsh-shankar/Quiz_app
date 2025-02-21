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
        question: "Q. What is the full form of URL?",
        choices: ["Uniform Resource Locator", "Universal Resource Link", "Unified Resource Locator", "Uniform Reference Link"],
        answer: "Uniform Resource Locator"
    },
    {
        question: "Q. What type of software is MS Word?",
        choices: ["Operating System", "Application Software", "System Software", "Utility Software"],
        answer: "Application Software"
    },
    {
        question: "Q. Which of the following is not an input device?",
        choices: ["Scanner", "Printer", "Keyboard", "Mouse"],
        answer: "Printer"
    },
    {
        question: "Q. What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "Hyperlinks Text Mark Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Q. What is the shortcut key for pasting copied content in Windows?",
        choices: ["Ctrl + P", "Ctrl + V", "Ctrl + X", "Ctrl + C"],
        answer: "Ctrl + V"
    },
    {
        question: "Q. What is the smallest unit of data in a computer?",
        choices: ["Bit", "Byte", "Kilobyte", "Megabyte"],
        answer: "Bit"
    },
    {
        question: "Q. Which of the following is not a programming language?",
        choices: ["Python", "Java", "MS Excel", "C++"],
        answer: "MS Excel"
    },
    {
        question: "Q. What is an example of system software?",
        choices: ["Operating System", "MS Word", "Photoshop", "Excel"],
        answer: "Operating System"
    },
    {
        question: "Q. What does PDF stand for?",
        choices: ["Portable Document Format", "Public Document File", "Personal Data File", "Printed Document Format"],
        answer: "Portable Document Format"
    },
    {
        question: "Q. Which type of memory is volatile?",
        choices: ["RAM", "ROM", "Hard Disk", "CD-ROM"],
        answer: "RAM"
    },
    {
        question: "Q. What does IP stand for in networking?",
        choices: ["Internet Protocol", "Internal Program", "Internet Procedure", "Integrated Program"],
        answer: "Internet Protocol"
    },
    {
        question: "Q. Which key is used to refresh a webpage?",
        choices: ["F5", "F1", "F2", "F10"],
        answer: "F5"
    },
    {
        question: "Q. What is the primary function of a web browser?",
        choices: ["To access websites on the internet", "To create software", "To edit images", "To manage files"],
        answer: "To access websites on the internet"
    },
    {
        question: "Q. Which device is used for storing large amounts of data permanently?",
        choices: ["Hard Disk", "RAM", "ROM", "Cache"],
        answer: "Hard Disk"
    },
    {
        question: "Q. What is the purpose of a firewall in computer networks?",
        choices: ["To provide security by controlling incoming and outgoing network traffic", "To increase internet speed", "To edit documents", "To create graphics"],
        answer: "To provide security by controlling incoming and outgoing network traffic"
    },
    {
        question: "Q. What does CPU stand for?",
        choices: ["Central Processing Unit", "Central Program Unit", "Computer Personal Unit", "Control Processing Unit"],
        answer: "Central Processing Unit"
    },
    {
        question: "Q. Which device is used to produce hard copies of documents?",
        choices: ["Printer", "Monitor", "Keyboard", "Mouse"],
        answer: "Printer"
    },
    {
        question: "Q. What is the main function of an operating system?",
        choices: ["To manage computer hardware and software", "To create graphics", "To design websites", "To play videos"],
        answer: "To manage computer hardware and software"
    },
    {
        question: "Q. Which programming language is primarily used for web development?",
        choices: ["HTML", "C++", "Python", "Java"],
        answer: "HTML"
    },
    {
        question: "Q. What does BIOS stand for?",
        choices: ["Basic Input Output System", "Binary Input Output System", "Basic Internet Operating System", "Basic Internal Output System"],
        answer: "Basic Input Output System"
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
