import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './MindGame.css';

const MindGame = () => {
  const [gameState, setGameState] = useState('ready'); // ready, playing, finished, watching
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [performanceData, setPerformanceData] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [showSequence, setShowSequence] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [mode, setMode] = useState('practice'); // 'practice' or 'challenge'
  const chartRef = useRef(null);
  const timeouts = useRef([]);

  const colors = ['red', 'blue', 'green', 'yellow'];

  // Helper to clear all timeouts
  const clearAllTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  useEffect(() => {
    const savedHighScore = localStorage.getItem('mindGameHighScore');
    if (savedHighScore) setHighScore(Number(savedHighScore));
    const savedPerformance = localStorage.getItem('mindGamePerformance');
    if (savedPerformance) setPerformanceData(JSON.parse(savedPerformance));
    // Reset state on mount
    setGameState('ready');
    setScore(0);
    setLevel(1);
    setFeedback('');
    setSequence([]);
    setUserSequence([]);
    setShowSequence([]);
    clearAllTimeouts();
    // Cleanup on unmount
    return clearAllTimeouts;
  }, []);

  const startGame = () => {
    clearAllTimeouts();
    setGameState('watching');
    setScore(0);
    setLevel(1);
    setPerformanceData([]);
    setFeedback('');
    setSequence([]);
    setUserSequence([]);
    setShowSequence([]);
    timeouts.current.push(setTimeout(() => generateSequence(1), 500));
  };

  const generateSequence = (nextLevel = level) => {
    clearAllTimeouts();
    const newSequence = Array(nextLevel + 2).fill(0)
      .map(() => colors[Math.floor(Math.random() * colors.length)]);
    setSequence(newSequence);
    setUserSequence([]);
    timeouts.current.push(setTimeout(() => playSequence(newSequence), 500));
  };

  const playSequence = async (seq) => {
    setGameState('watching');
    setShowSequence([]);
    for (let i = 0; i < seq.length; i++) {
      setShowSequence([seq[i]]);
      await new Promise(resolve => {
        const t = setTimeout(resolve, 1000); // slower for clarity
        timeouts.current.push(t);
      });
      setShowSequence([]);
      await new Promise(resolve => {
        const t = setTimeout(resolve, 400); // slower for clarity
        timeouts.current.push(t);
      });
    }
    setTimeout(() => {
      setGameState('playing');
      setFeedback('Your turn!');
    }, 400);
  };

  const handleColorClick = (color) => {
    if (gameState !== 'playing') return;

    const newUserSequence = [...userSequence, color];
    setUserSequence(newUserSequence);

    // Show feedback for user click
    setShowSequence([color]);
    timeouts.current.push(setTimeout(() => setShowSequence([]), 200));

    if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      setFeedback('Wrong! Game Over.');
      endGame();
      return;
    }

    if (newUserSequence.length === sequence.length) {
      const newScore = score + (level * 100);
      setScore(newScore);
      setFeedback('Correct! Next Level...');
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('mindGameHighScore', newScore);
      }
      // Update performance data
      const newPerformanceData = [...performanceData, {
        attempt: performanceData.length + 1,
        score: newScore,
        level: level
      }];
      setPerformanceData(newPerformanceData);
      localStorage.setItem('mindGamePerformance', JSON.stringify(newPerformanceData));

      timeouts.current.push(setTimeout(() => {
        setLevel(level + 1);
        setFeedback('');
        generateSequence(level + 1);
      }, 1500));
    }
  };

  const endGame = () => {
    clearAllTimeouts();
    setGameState('finished');
  };

  const resetGame = () => {
    clearAllTimeouts();
    setGameState('ready');
    setScore(0);
    setLevel(1);
    setPerformanceData([]);
    setHighScore(0);
    setFeedback('');
    setSequence([]);
    setUserSequence([]);
    setShowSequence([]);
    setMode('practice');
    localStorage.removeItem('mindGameHighScore');
    localStorage.removeItem('mindGamePerformance');
  };

  // Hint: reveal the next color (only in practice or when playing)
  const showHint = () => {
    if (!sequence || sequence.length === 0) return;
    const next = sequence[userSequence.length] || sequence[0];
    setShowSequence([next]);
    timeouts.current.push(setTimeout(() => setShowSequence([]), 800));
    setFeedback(`Hint: ${next}`);
    timeouts.current.push(setTimeout(() => setFeedback(''), 1200));
  };

  // Replay sequence (safe)
  const replaySequence = () => {
    if (!sequence || sequence.length === 0) return;
    clearAllTimeouts();
    playSequence(sequence);
  };

  return (
    <div className="mind-game">
      <div className="game-header">
        <h2>Memory Pattern Game</h2>
        <div className="game-stats">
          <div className="stat">Level: {level}</div>
          <div className="stat">Score: {score}</div>
          <div className="stat">High Score: {highScore}</div>
        </div>
      </div>



      {/* How to play + Mode and guidance */}
      <div className="how-to-play">
        <strong style={{ color: '#00e6ff' }}>How to play</strong>
        <ol>
          <li>Click <strong>Start Game</strong> to begin.</li>
          <li>Watch the sequence of highlighted buttons (they will flash).</li>
          <li>When you see "Your turn!" repeat the sequence by clicking the colored buttons in the same order.</li>
          <li>If you get it right you advance levels and your score increases.</li>
        </ol>
      </div>

      <div className="game-controls-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ color: '#00e6ff', fontWeight: '600' }}>
          Mode: 
          <select value={mode} onChange={e => setMode(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="practice">Practice (show hints)</option>
            <option value="challenge">Challenge (no hints)</option>
          </select>
        </div>
        <div style={{ color: '#fff' }}>
          {gameState === 'ready' && 'Click Start to begin. In Practice mode you will get hints.'}
          {gameState === 'watching' && 'Watching sequence...'}
          {gameState === 'playing' && 'Your turn! Click the buttons in the same order.'}
          {gameState === 'finished' && (feedback || 'Game Over!')}
        </div>
        <div>
          <button className="small-btn" onClick={replaySequence} style={{ marginRight: 8 }} disabled={gameState === 'watching' || !sequence.length}>Replay Sequence</button>
          <button className="small-btn" onClick={showHint} disabled={mode === 'challenge' || !sequence.length}>Show Hint</button>
        </div>
      </div>
      {/* Show sequence as text for practice mode for clarity */}
      {mode === 'practice' && gameState === 'watching' && (
        <div style={{ textAlign: 'center', marginBottom: 12, color: '#00e6ff', fontWeight: 'bold' }}>
          Sequence: {sequence.join(' - ')}
        </div>
      )}
      <div className="game-board">
        {colors.map((color) => (
          <motion.button
            key={color}
            className={`color-button ${color} ${showSequence.includes(color) ? 'active' : ''}`}
            data-color={color}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleColorClick(color)}
            disabled={gameState !== 'playing'}
            style={{ opacity: gameState === 'playing' ? 1 : 0.5, outline: showSequence.includes(color) ? '3px solid #fff' : 'none' }}
          />
        ))}
      </div>

      <div className="game-controls">
        {gameState === 'ready' ? (
          <>
            <div className="game-status" style={{ marginBottom: 16, color: '#fff', fontWeight: 'bold' }}>
              Click Start Game to begin!
            </div>
            <button className="start-button" onClick={startGame}>
              Start Game
            </button>
            <button className="reset-button" onClick={resetGame} style={{ marginLeft: 12, background: 'linear-gradient(90deg, #ff6bcb, #ffa8ff)', color: '#fff', border: 'none', borderRadius: '25px', padding: '0.6rem 1.2rem', fontWeight: 500, cursor: 'pointer' }}>
              Reset All
            </button>
          </>
        ) : gameState === 'finished' ? (
          <>
            <div className="game-status" style={{ marginBottom: 16, color: '#ff4444', fontWeight: 'bold' }}>
              {feedback || 'Game Over!'}
            </div>
            <button className="start-button" onClick={startGame}>
              Play Again
            </button>
            <button className="reset-button" onClick={resetGame} style={{ marginLeft: 12 }}>
              Reset All
            </button>
          </>
        ) : (
          <div className="game-status" style={{ color: feedback === 'Correct! Next Level...' ? '#00e6ff' : '#fff', fontWeight: 'bold' }}>
            {gameState === 'watching' ? 'Watch the sequence...' : feedback || 'Your turn!'}
          </div>
        )}
      </div>

      <div className="performance-chart">
        <h3>Performance History</h3>
        {performanceData && performanceData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData} ref={chartRef}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="attempt" label={{ value: 'Attempts', position: 'bottom' }} tick={{ fill: '#fff' }} />
              <YAxis label={{ value: 'Score', angle: -90, position: 'left', fill: '#fff' }} tick={{ fill: '#fff' }} />
              <Tooltip contentStyle={{ background: '#232934', border: 'none', color: '#00e6ff' }} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#00e6ff"
                strokeWidth={3}
                dot={{ fill: '#00e6ff', r: 5 }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="chart-placeholder">
            <p>No performance data yet. Play the game to generate performance history.</p>
            <button className="start-button" onClick={startGame}>Start Game</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MindGame;