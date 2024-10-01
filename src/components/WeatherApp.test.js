import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherApp from './WeatherApp';
import { fetchWeather } from '../services/weatherApi';

// APIコールをモック化
jest.mock('../services/weatherApi');

describe('WeatherApp Functional Tests', () => {
  beforeEach(() => {
    fetchWeather.mockClear();
  });

  test('1. 正常系：有効な都市名での天気データ取得', async () => {
    const mockWeatherData = {
      name: '東京',
      main: { temp: 20, humidity: 50 },
      weather: [{ description: '晴れ' }],
      wind: { speed: 3 }
    };
    fetchWeather.mockResolvedValueOnce(mockWeatherData);

    render(<WeatherApp />);

    const input = screen.getByPlaceholderText('都市名を入力してください(例：東京都 福岡県 糸島市など)');
    const button = screen.getByRole('button', { name: '天気を取得' });

    fireEvent.change(input, { target: { value: '東京' } });
    fireEvent.click(button);

    expect(button).toHaveTextContent('取得中...');
    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('東京の天気')).toBeInTheDocument();
      expect(screen.getByText('20°C')).toBeInTheDocument();
      expect(screen.getByText('晴れ')).toBeInTheDocument();
      expect(screen.getByText('湿度: 50%')).toBeInTheDocument();
      expect(screen.getByText('風速: 3 m/s')).toBeInTheDocument();
    });
  });

  test('2. 異常系：無効な都市名でのエラーハンドリング', async () => {
    fetchWeather.mockRejectedValueOnce(new Error('都市が見つかりません'));

    render(<WeatherApp />);

    const input = screen.getByPlaceholderText('都市名を入力してください(例：東京都 福岡県 糸島市など)');
    const button = screen.getByRole('button', { name: '天気を取得' });

    fireEvent.change(input, { target: { value: 'XYZABC' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('都市が見つかりません')).toBeInTheDocument();
    });
  });

  test('3. ローディング状態の表示', async () => {
    fetchWeather.mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 1000)));

    render(<WeatherApp />);

    const input = screen.getByPlaceholderText('都市名を入力してください(例：東京都 福岡県 糸島市など)');
    const button = screen.getByRole('button', { name: '天気を取得' });

    fireEvent.change(input, { target: { value: '東京' } });
    fireEvent.click(button);

    expect(button).toHaveTextContent('取得中...');
    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(button).toHaveTextContent('天気を取得');
      expect(button).not.toBeDisabled();
    }, { timeout: 2000 });
  });

  test('4. 複数都市の連続検索', async () => {
    const mockWeatherData = (city) => ({
      name: city,
      main: { temp: 20, humidity: 50 },
      weather: [{ description: '晴れ' }],
      wind: { speed: 3 }
    });

    fetchWeather
      .mockResolvedValueOnce(mockWeatherData('東京'))
      .mockResolvedValueOnce(mockWeatherData('大阪'))
      .mockResolvedValueOnce(mockWeatherData('札幌'));

    render(<WeatherApp />);

    const input = screen.getByPlaceholderText('都市名を入力してください(例：東京都 福岡県 糸島市など)');
    const button = screen.getByRole('button', { name: '天気を取得' });

    // 東京の天気を検索
    fireEvent.change(input, { target: { value: '東京' } });
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByText('東京の天気')).toBeInTheDocument());

    // 大阪の天気を検索
    fireEvent.change(input, { target: { value: '大阪' } });
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByText('大阪の天気')).toBeInTheDocument());

    // 札幌の天気を検索
    fireEvent.change(input, { target: { value: '札幌' } });
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByText('札幌の天気')).toBeInTheDocument());

    // 最後の結果のみが表示されていることを確認
    expect(screen.queryByText('東京の天気')).not.toBeInTheDocument();
    expect(screen.queryByText('大阪の天気')).not.toBeInTheDocument();
    expect(screen.getByText('札幌の天気')).toBeInTheDocument();
  });
});