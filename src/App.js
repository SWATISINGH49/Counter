import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (history.length === 0 || history[history.length - 1] !== count) {
      setHistory(prev => [...prev, count]);
    }
  }, [count, history]);

  const increment = () => {
    setIsAnimating(true);
    setCount(prev => prev + step);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const decrement = () => {
    setIsAnimating(true);
    setCount(prev => prev - step);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const reset = () => {
    setIsAnimating(true);
    setCount(0);
    setStep(1);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const undo = () => {
    if (history.length > 1) {
      setIsAnimating(true);
      setCount(history[history.length - 2]);
      setHistory(prev => prev.slice(0, -1));
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <div className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </div>
        <h1> Counter</h1>
        
        <div className={`counter-display ${isAnimating ? 'pulse' : ''}`}>
          <h2>{count}</h2>
          <div className="step-control">
            <span>Step: </span>
            <input 
              type="number" 
              value={step} 
              onChange={(e) => setStep(Number(e.target.value) || 1)}
              min="1"
              max="10"
            />
          </div>
        </div>

        <div className="button-group">
          <button className="btn-decrement" onClick={decrement}>-{step}</button>
          <button className="btn-reset" onClick={reset}>Reset</button>
          <button className="btn-increment" onClick={increment}>+{step}</button>
        </div>

        <button 
          className="btn-undo" 
          onClick={undo} 
          disabled={history.length <= 1}
        >
          Undo
        </button>

        <div className="history-section">
          <h3>History:</h3>
          <ul>
            {history.slice().reverse().map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;