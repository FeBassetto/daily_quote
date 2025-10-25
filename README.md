# Daily Quote

Um aplicativo React Native que entrega frases inspiracionais diárias para motivar seu dia.

## Funcionalidades

- Login de usuário
- Visualização de frase do dia
- Navegação entre frases passadas (swipe)
- Deep linking para acesso direto à frase do dia
- Interface limpa e moderna

## Credenciais de Teste

Para testar o aplicativo, use as seguintes credenciais:

- **Usuário**: `joaquim`
- **Senha**: `salame1`

## Stack Tecnológica

- **React Native** 0.82.1
- **TypeScript** 5.8
- **React Navigation** - Navegação
- **Biome** - Linting e formatação
- **React Native Bootsplash** - Splash screen nativa

## Pré-requisitos

- Node.js >= 20
- **iOS**: Xcode, CocoaPods
- **Android**: Android Studio, JDK 17

## Instalação e Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configuração iOS

Instalar dependências do CocoaPods:

```bash
cd ios
pod install
cd ..
```

Ou usando bundle:

```bash
bundle install
bundle exec pod install --project-directory=ios
```

### 3. Configuração Android

Certifique-se de que o Android Studio está instalado e configurado. Não é necessário nenhum passo adicional.

## Executando o Aplicativo

### Iniciar Metro Bundler

```bash
npm start
```

### Executar no iOS

```bash
npm run ios
```

Ou especifique um simulador:

```bash
npx react-native run-ios --simulator="iPhone 15 Pro"
```

### Executar no Android

```bash
npm run android
```

Certifique-se de que um emulador Android está rodando ou um dispositivo físico está conectado.

## Deep Linking

O aplicativo suporta deep linking para acesso direto à frase do dia.

### URL do Deep Link

```
dailyquote://quoteoftheDay
```

### Acesso via Web

```
https://www.dailyquote.fun/quoteoftheDay
```

### Testar Deep Link Localmente

#### iOS (Simulador)

```bash
xcrun simctl openurl booted "dailyquote://quoteoftheDay"
```

#### Android (Emulador/Dispositivo)

```bash
adb shell am start -W -a android.intent.action.VIEW -d "dailyquote://quoteoftheDay"
```

### Como Funciona o Deep Link

1. Usuário acessa `https://www.dailyquote.fun/quoteoftheDay`
2. O servidor retorna uma página que tenta abrir o app usando `dailyquote://quoteoftheDay`
3. O app é aberto diretamente na tela de Frase do Dia
4. Se o usuário não estiver autenticado, é redirecionado para login primeiro

## Desenvolvimento

### Qualidade de Código

```bash
# Lint
npm run lint

# Fix problemas de lint
npm run lint:fix

# Formatar código
npm run lint:format
```

### Testes

```bash
npm test
```

## Estrutura do Projeto

```
daily_quote/
├── android/                    # Código nativo Android
├── ios/                        # Código nativo iOS
├── src/
│   ├── components/            # Componentes reutilizáveis
│   ├── constants/             # Constantes e tema
│   ├── navigation/            # Configuração de navegação
│   ├── screens/               # Telas do app
│   │   ├── Login/            # Tela de login
│   │   └── DailyQuote/       # Tela principal com frases
│   ├── services/             # Serviços (API, etc)
│   └── types/                # Tipos TypeScript
├── assets/                    # Imagens, fontes e assets
├── App.tsx                    # Componente principal
└── ...
```

## Troubleshooting

### iOS

Se o app não abrir no simulador:

```bash
# Limpar cache
rm -rf ios/build
cd ios && pod install && cd ..
npm start -- --reset-cache
```

### Android

Se houver problemas de build:

```bash
cd android
./gradlew clean
cd ..
npm start -- --reset-cache
```

### Metro Bundler

Se o Metro não iniciar corretamente:

```bash
# Limpar cache
npm start -- --reset-cache

# Ou
watchman watch-del-all
rm -rf node_modules
npm install
```

## Scripts Disponíveis

- `npm start` - Inicia o Metro bundler
- `npm run ios` - Executa no iOS
- `npm run android` - Executa no Android
- `npm run lint` - Executa o linter
- `npm run lint:fix` - Corrige problemas de lint
- `npm run lint:format` - Formata o código
- `npm test` - Executa os testes

## Licença

MIT
