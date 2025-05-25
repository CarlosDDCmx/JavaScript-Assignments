import { render, screen, fireEvent } from '@testing-library/react';
import { GameProvider } from '../context/GameContext';
import GameBoard from './GameBoard';

test('renders game board with initial state', () => {
  render(
    <GameProvider>
      <GameBoard />
    </GameProvider>
  );

  expect(screen.getByText(/Time: 0s/i)).toBeInTheDocument();
  expect(screen.getByText(/Attempts: 0/i)).toBeInTheDocument();
});

test('starts new game when button clicked', () => {
  render(
    <GameProvider>
      <GameBoard />
    </GameProvider>
  );

  fireEvent.click(screen.getByText(/Start Game/i));
  expect(screen.getAllByRole('button').length).toBeGreaterThan(8);
});