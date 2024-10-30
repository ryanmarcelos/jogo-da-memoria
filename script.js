const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const cards = [...cardValues, ...cardValues];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameBoard = document.getElementById('game-board');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const shuffledCards = shuffle(cards);
    gameBoard.innerHTML = '';
    
    shuffledCards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.innerText = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        resetCards();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.classList.remove('flipped');
            secondCard.innerText = '';
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

document.getElementById('restart-button').addEventListener('click', createBoard);

createBoard();
