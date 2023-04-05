const contractAddress = "";
const abi = [];

const provider = new ethers.providers.Web3Provider(window.ethereum, 97); //bnbchain testnet
let signer;
let contract;


provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    contract = new ethers.Contract(contractAddress, abi, signer);
  });
});

async function play(option) {
  let amountInWei = ethers.utils.parseEther((0.0001).toString());
  console.log(amountInWei);

  await contract.playGame(option, { value: amountInWei });
}

let userScore = 0;
let computerScore = 0;

const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_p = document.querySelector('.result>p');

const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');

function getComputerChoice() {
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random()*3);
    return choices[randomNumber]
}


function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    
}


function lose(userChoice, computerChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;

}


function draw(userChoice, computerChoice) {

}

function printResult(userChoice, isWin) {
    switch(userChoice) {
        case 'r':
            changeLog('rock', isWin);
            break;
        case 'p':
            changeLog('papers', isWin);
            break;
        case 's':
            changeLog('scissors', isWin);
            break;
    }
}

const log = document.querySelector('.log');
function changeLog(choice, result) {
    let text = ''
    const el = document.createElement('p');
    switch(result) {
        case 'win': 
            text = 'win';
            el.classList.add('win');
            break;
        case 'lose':
            text = 'lose';
            el.classList.add('lose');
            break;
        case 'draw':
            text = 'draw';
            el.classList.add('draw');
            break;
    }
    el.innerText = `You chose ${choice} and it was ${text}`;
    log.prepend(el);
}


function game(userChoice){
    const computerChoice = getComputerChoice();


    switch (userChoice + computerChoice){
        case 'rs':
        case 'pr':
        case 'sp':
            win(userChoice, computerChoice);
            printResult(userChoice, 'win');
            break;


        case 'rp':
        case 'ps':
        case 'sr':
            lose(userChoice, computerChoice);
            printResult(userChoice, 'lose');
            break;


        case 'rr':
        case 'pp':
        case 'ss':
            draw(userChoice, computerChoice);
            printResult(userChoice, 'draw');
            break;
    }
}




function main() {
    rock_div.addEventListener('click', function(){
        game('r');
    })

    paper_div.addEventListener('click', function(){
        game('p');
    })

    scissors_div.addEventListener('click', function(){
        game('s');
    })
}

main();