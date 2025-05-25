import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WeatherApp from '../../components/WeatherApp';
import { LocationProvider } from '../../contexts/LocationContext';

jest.mock('../../services/weatherAPI');
jest.mock('../../services/geocodingAPI');

describe('WeatherApp Component', () => {
  test('displays loading state initially', async () => {
    render(<WeatherApp />, { wrapper: LocationProvider });
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('shows error message for invalid location', async () => {
    // Mock API error
    render(<WeatherApp />, { wrapper: LocationProvider });
    await userEvent.type(screen.getByRole('textbox'), 'InvalidCity');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() => 
      expect(screen.getByText(/location not found/i)).toBeInTheDocument()
    );
  });
});