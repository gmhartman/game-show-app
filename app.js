//variables
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startB = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const winLose = document.querySelector('.title');
let wrong = 0;
const randomPhrase = [
    'you are a winner',
    'take a wild guess',
    'does this work yet',
    'give it another shot',
    'best treehouse project ever'
];

//listens for start button click
startB.addEventListener('click', () => {
  overlay.style.display = 'none';
  overlay.classList.remove('win');
  overlay.classList.remove('lose');
  const displayPhrase = getRandomPhraseAsArray(randomPhrase);
  getRandomPhraseAsArray(randomPhrase);
  addPhraseToDisplay(displayPhrase);
});

//gets random phrase from list
function getRandomPhraseAsArray(arr) {
  const randomNum = arr[Math.floor(Math.random() * 5)];
  return randomNum.split('');
}



//adds to display

function addPhraseToDisplay(arr) {
  const phraseList = document.querySelector('#phrase');
  for (let i = 0; i < arr.length; i++) {
    const phraseLi = document.createElement('li');
    phraseLi.textContent = arr[i];
    phraseList.appendChild(phraseLi);
    if (arr[i] !== ' ') {
        phraseLi.className = 'letter';
    } else  {
        phraseLi.className = 'space';
    }
  }
}




//verifies letter
function checkLetter(button) {
  let match = null;
  let letter = document.querySelectorAll('li');
  for (let i = 0; i < letter.length; i++) {
    if (letter[i].textContent === button) {
        match = button;
        letter[i].classList.add('show');
    }
  }
  return match;
}


//keyboard click listener
keyboard.addEventListener('click', (e) => {
    if ( e.target.tagName === 'BUTTON' && e.target.className !== 'chosen' ) {
      let correct = checkLetter(e.target.textContent);
      e.target.className = 'chosen';
      if (correct === null) {
        const lives = document.querySelectorAll('img');
        lives[wrong].src = 'images/lostHeart.png';
        wrong ++;
      }
    }
    checkWin();
});

//win or lose function

function checkWin () {
  const letterWin = document.getElementsByClassName('letter');
  const letterShow = document.getElementsByClassName('show');
  if ( letterWin.length === letterShow.length ) {
    overlay.classList.add('win');
    winLose.innerHTML = 'WIN!';
    overlay.style.display = 'flex';
    reset();
  } else if ( wrong > 4 ) {
    overlay.classList.add('lose');
    winLose.innerHTML = 'Lose :(';
    overlay.style.display = 'flex';
    reset();
  }
}

function reset () {
  phrase.innerHTML = '';
  const buttons = document.querySelectorAll('button');
  for ( let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('chosen');
  }
  wrong = 0;
  const lives = document.querySelectorAll('img');
  for ( let i = 0; i < lives.length; i++ ) {
  lives[i].src = 'images/liveHeart.png';
}
}