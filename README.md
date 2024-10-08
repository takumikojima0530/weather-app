# 天気情報アプリ

## 概要
Weather Appは、ユーザーが都市名を入力することで、その地域の現在の天気情報を取得できるシンプルなウェブアプリケーションです。リアルタイムの天気データと美しい3D背景を組み合わせ、直感的で視覚的に魅力的なユーザーインターフェースを提供します。

## デモ
Vercelにデプロイしています。
https://weather-app-cozimanoheyas-projects.vercel.app/

## 主な機能
- 都市名による天気情報の検索
- 温度、湿度、風速、天気状況の表示
- 動的な3D背景（時間経過による変化、天候に応じた視覚効果）
- レスポンシブデザイン（デスクトップからモバイルまで対応）

## 使用技術
- React.js
- Three.js (React Three Fiber & Drei)
- Tailwind CSS
- OpenWeatherMap API

## セットアップ手順
1. リポジトリをクローンします：
   ```
   git clone https://github.com/yourusername/weather-app.git
   ```

2. プロジェクトディレクトリに移動します：
   ```
   cd weather-app
   ```

3. 必要な依存関係をインストールします：
   ```
   npm install
   ```

4. `.env` ファイルを作成し、OpenWeatherMap APIキーを追加します：
   ```
   REACT_APP_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

5. アプリケーションを起動します：
   ```
   npm start
   ```

6. ブラウザで `http://localhost:3000` を開いてアプリケーションにアクセスします。

## 使用方法
1. アプリケーションのメイン画面で、検索ボックスに都市名を入力します。
2. "天気を取得" ボタンをクリックするか、Enterキーを押します。
3. 該当する都市の現在の天気情報が表示されます。

## テスト
テストを実行するには、以下のコマンドを使用します：
```
npm test
```

- 天気データの提供: [OpenWeatherMap](https://openweathermap.org/)
- 3Dグラフィックスライブラリ: [Three.js](https://threejs.org/)
- UIフレームワーク: [Tailwind CSS](https://tailwindcss.com/)
