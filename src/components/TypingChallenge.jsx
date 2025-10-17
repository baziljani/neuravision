import React, { useState, useEffect } from "react";
import "./TypingChallenge.css";

const words = [
  "neura",
  "vision",
  "react",
  "frontend",
  "developer",
  "ai",
  "dashboard",
  "neon",
  "animation",
  "performance"
];

const TypingChallenge = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);

  // Timer logic
  useEffect(() => {
    if (isPlaying && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      endGame();
    }
  }, [isPlaying, timer]);

  const startGame = () => {
    setScore(0);
    setTimer(30);
    setIsPlaying(true);
    setShowResults(false);
    setInput("");
    setTotalTyped(0);
    setAccuracy(0);
    setNewWord();
  };

  const endGame = () => {
    setIsPlaying(false);
    const calculatedAccuracy =
      totalTyped > 0 ? Math.round((score / totalTyped) * 100) : 0;
    setAccuracy(calculatedAccuracy);
    setShowResults(true);
  };

  const setNewWord = () => {
    const random = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(random);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.endsWith(" ")) {
      setTotalTyped((prev) => prev + 1);
      if (value.trim().toLowerCase() === currentWord.toLowerCase()) {
        setScore((prev) => prev + 1);
      }
      setInput("");
      setNewWord();
    }
  };

  return (
    <div className="typing-challenge">
      <h2>⚡ Typing Speed Challenge ⚡</h2>

      {!isPlaying && !showResults && (
        <>
          <p>Test your typing speed and accuracy</p>
          <button onClick={startGame}>Start Game</button>
        </>
      )}

      {isPlaying && (
        <>
          <h3>⏱ Time Left: {timer}s</h3>
          <div className="word-display">{currentWord}</div>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Type and press space..."
          />
          <h3>✅ Score: {score}</h3>
        </>
      )}

      {showResults && (
        <div className="results">
          <h3>🏁 Game Over</h3>
          <p>Words Typed: {totalTyped}</p>
          <p>Correct Words: {score}</p>
          <p>Accuracy: {accuracy}%</p>
          <p>
            Performance:{" "}
            {accuracy >= 80
              ? "🌟 Excellent!"
              : accuracy >= 50
              ? "⚡ Good, keep practicing!"
              : "💡 Needs improvement!"}
          </p>
          <button onClick={startGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default TypingChallenge;
