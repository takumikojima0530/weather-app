import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// DynamicWeatherBackground コンポーネントをモック
jest.mock('./components/DynamicWeatherBackground', () => {
  return function DummyDynamicWeatherBackground() {
    return <div data-testid="mock-weather-background" />;
  };
});

test('renders weather app', () => {
  render(<App />);
  const weatherAppElement = screen.getByText(/天気情報アプリ/i);
  expect(weatherAppElement).toBeInTheDocument();
  expect(screen.getByTestId('mock-weather-background')).toBeInTheDocument();
});
