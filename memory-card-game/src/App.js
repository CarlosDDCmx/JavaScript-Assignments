import { GameProvider } from './context/GameContext';
import { ThemeProvider } from './context/ThemeContext';
import GameBoard from './components/GameBoard';
import ErrorBoundary from './components/ErrorBoundary';
import './styles.css';

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <GameProvider>
          <div className="App">
            <h1>Memory Card Game</h1>
            <GameBoard />
          </div>
        </GameProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;