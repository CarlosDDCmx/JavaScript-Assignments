import { useContext, useEffect, useCallback, useState, useMemo } from 'react';
import { GameContext } from '../context/GameContext';
import { ThemeContext } from '../context/ThemeContext';
import useSound from '../hooks/useSound';
import useTimer from '../hooks/useTimer';
import useCards from '../hooks/useCards';
import Card from './Card';

const difficulties = {
  easy: 4,
  medium: 8,
  hard: 12
};

const GameBoard = () => {
  const { state, dispatch } = useContext(GameContext);
  const { cards, flipped, matched, isPlaying, isProcessing } = state;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { time, reset: resetTimer } = useTimer(isPlaying);
  const { playSound } = useSound();
  const [difficulty, setDifficulty] = useState('medium');
  const cardMap = useMemo(() => new Map(cards.map(c => [c.id, c])), [cards]);

  const checkMatch = useCallback(() => {
    if (flipped.length === 2) {
      dispatch({ type: 'SET_PROCESSING', payload: true });
      const [firstId, secondId] = flipped;
      
      setTimeout(() => {
        const firstCard = cardMap.get(firstId);
        const secondCard = cardMap.get(secondId);

        if (!firstCard || !secondCard) {
          dispatch({ type: 'RESET_FLIPPED' });
          playSound('wrong');
          return;
        }

        if (firstCard.pairId === secondCard.pairId) {
          dispatch({ type: 'MATCH_FOUND' });
          playSound('match');
        } else {
          dispatch({ type: 'RESET_FLIPPED' });
          playSound('wrong');
        }
        
        if (matched.length + 2 === cards.length) {
          dispatch({ type: 'GAME_OVER' });
          playSound('win');
        }
        dispatch({ type: 'SET_PROCESSING', payload: false });
      }, 1000);
    }
  }, [flipped, cards, matched.length, dispatch, playSound, cardMap]);

  useEffect(() => {
    if (flipped.length === 2 && !isProcessing) {
      checkMatch();
    }
  }, [flipped, isProcessing, checkMatch]);

  const { generateCards } = useCards();

  const startGame = useCallback(() => {
    try {
      const numberOfPairs = difficulties[difficulty];
      const shuffledCards = generateCards(numberOfPairs);
      dispatch({ type: 'INIT_GAME', payload: shuffledCards });
      resetTimer();
    } catch (error) {
      console.error('Game initialization failed:', error);
      alert(`Game error: ${error.message}`);
    }
  }, [difficulty, generateCards, dispatch, resetTimer]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  return (
    <div className="game-container">
      <div className="header-controls">
        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <div className="scoreboard">
          <div>Time: {time}s</div>
          <div>Attempts: {state.attempts}</div>
        </div>
        <select 
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="difficulty-select"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            isFlipped={flipped.includes(card.id)}
            isMatched={matched.includes(card.id)}
            playSound={playSound}
          />
        ))}
      </div>
      
      {!isPlaying && (
        <button onClick={startGame}>
          {matched.length === cards.length ? 'Play Again' : 'Start Game'}
        </button>
      )}
    </div>
  );
};

export default GameBoard;