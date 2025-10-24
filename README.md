# Daily Quote

A React Native app that delivers daily inspirational quotes.

## Tech Stack

- **React Native** 0.82.1
- **TypeScript** 5.8
- **Biome** - Linting and formatting
- **React Native Bootsplash** - Native splash screen

## Prerequisites

- Node.js >= 20
- iOS development: Xcode, CocoaPods
- Android development: Android Studio, JDK

## Getting Started

### Install dependencies

```sh
npm install
```

### iOS Setup

Install CocoaPods dependencies:

```sh
bundle install
bundle exec pod install --project-directory=ios
```

### Run the app

Start Metro bundler:

```sh
npm start
```

Run on platform:

```sh
# iOS
npm run ios

# Android
npm run android
```

## Development

### Code Quality

```sh
# Lint code
npm run lint

# Fix lint issues
npm run lint:fix

# Format code
npm run format
```

### Testing

```sh
npm test
```

## Project Structure

```
daily_quote/
├── android/          # Android native code
├── ios/              # iOS native code
├── assets/           # Images, fonts, and other assets
├── App.tsx           # Main app component
└── ...
```
