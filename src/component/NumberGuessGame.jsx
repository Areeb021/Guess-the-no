import React, { useState } from 'react';
import './NumberGuessGame.css';

function NumberGuessGame() {
  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [hints, setHints] = useState([]);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  const checkGuess = () => {
    const guess = Number(userGuess);

    if (!guess) {
      setMessage('⛔ Please enter a number!');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setPreviousGuesses([...previousGuesses, guess]);

    if (guess === secretNumber) {
      setMessage(`🎉 Correct! You guessed it in ${newAttempts} attempts.`);
      setTimeout(resetGame, 2000);
    } else if (guess > secretNumber) {
      setMessage('📈 Too high! Try again.');
    } else {
      setMessage('📉 Too low! Try again.');
    }

    if (newAttempts === 5) {
      setMessage(`⛔ YOU HAVE REACHED THE LIMIT and the correct answer was ${secretNumber}`);
      setTimeout(resetGame, 2000);
      return;
    }

    if (newAttempts > 2) {
      generateHints();
    }
  };

  const resetGame = () => {
    setSecretNumber(generateRandomNumber());
    setAttempts(0);
    setUserGuess('');
    setMessage('');
    setPreviousGuesses([]);
    setHints([]);
  };

  const generateHints = () => {
    const no1 = Math.floor(Math.random() * 10) + 1;
    const no2 = Math.floor(Math.random() * 10) + 1;
    const nos = [secretNumber, no1, no2];
    setHints(nos);
  };

  return (
    <div>
      <h1>🎲 Guess the Number!</h1>
      <div className="game-container">
        <p>Guess a number between <strong>1 and 10</strong></p>
        <input
          type="number"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Your guess"
        />
        <br />
        <button onClick={checkGuess}>Check</button>
        <button onClick={resetGame}>Reset</button>
        <p className="message">{message}</p>
      </div>

      <div className="secondary-container">
        <h2>Hints</h2>
        <div>{hints.length > 0 && <p>Hints are: {hints.join(', ')}</p>}</div>
        <h3>Previous Guesses</h3>
        <div>
          {previousGuesses.map((guess, index) => (
            <p key={index}>Your previous guess was {guess}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NumberGuessGame;
