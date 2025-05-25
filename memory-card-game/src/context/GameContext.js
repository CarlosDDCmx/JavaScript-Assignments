import { createContext, useReducer } from 'react';

const GameContext = createContext();

const initialState = {
  cards: [],
  flipped: [],
  matched: [],
  attempts: 0,
  isPlaying: false,
  isProcessing: false,
  bestScore: Infinity,
  totalGames: 0
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'INIT_GAME':
      return {
        ...initialState,
        cards: action.payload,
        isPlaying: true,
        // Preserve these values if restarting
        bestScore: state.bestScore,
        totalGames: state.totalGames + 1
      };
    case 'FLIP_CARD':
      return { ...state, flipped: [...state.flipped, action.payload] };
    case 'MATCH_FOUND':
      return {
        ...state,
        matched: [...state.matched, ...state.flipped],
        flipped: [],
        attempts: state.attempts + 1,
      };
    case 'RESET_FLIPPED':
      return { ...state, flipped: [], attempts: state.attempts + 1 };
    case 'GAME_OVER':
      return { ...state, isPlaying: false };
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };
    default:
      return state;
  }
}

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };