import { renderHook, waitFor } from '@testing-library/react';
import { useLocation } from '../contexts/LocationContext';
import { LocationProvider } from '../contexts/LocationContext';

test('should update location coordinates', async () => {
  const { result } = renderHook(() => useLocation(), {
    wrapper: LocationProvider
  });

  act(() => {
    result.current.setLocationInput('Paris');
    result.current.handleLocationSearch();
  });

  await waitFor(() => {
    expect(result.current.lat).toBeCloseTo(48.8566);
    expect(result.current.lon).toBeCloseTo(2.3522);
  });
});