# Daily Quote

Um aplicativo React Native que entrega frases inspiracionais diárias para motivar seu dia.

## Funcionalidades

- **Login de usuário** - Autenticação via API
- **Tela de Registro** - ⚠️ Apenas demonstrativa (não funcional)
- **Tela de Esqueci a Senha** - ⚠️ Apenas demonstrativa (não funcional)
- **Visualização de frase do dia** - Frases motivacionais diárias
- **Navegação entre frases** - Swipe para visualizar frases passadas
- **Deep linking** - Acesso direto à frase do dia via URL
- **Interface moderna** - Design limpo e intuitivo
- **Compartilhamento** - Compartilhe suas frases favoritas
- **Clipboard** - Copie frases facilmente

## ⚠️ Importante - Telas Demonstrativas

As telas de **registro de conta** e **recuperação de senha são apenas demonstrativas** e servem para fins de UI/UX. Elas **não criam contas reais** nem enviam e-mails de recuperação.

### Tela de Registro
- ✅ Validação de formulário funcional (Zod + React Hook Form)
- ✅ Feedback visual e animações
- ❌ Não envia dados para API
- ❌ Não cria contas reais

### Tela de Esqueci a Senha
- ✅ Validação de e-mail funcional (Zod + React Hook Form)
- ✅ Feedback visual e animações
- ❌ Não envia e-mails de recuperação
- ❌ Não altera senhas reais

Para testar o aplicativo, use as credenciais de teste fornecidas abaixo.

## Credenciais de Teste

Para testar o aplicativo, use as seguintes credenciais:

- **Usuário**: `joaquim`
- **Senha**: `salame1`

## Stack Tecnológica

### Core
- **React Native** 0.82.1
- **TypeScript** 5.8.3
- **React** 19.1.1

### Navegação e Estado
- **React Navigation** 7.x (Native + Native Stack)
- **React Hook Form** 7.65.0 - Gerenciamento de formulários
- **Zod** 4.1.12 - Validação de schemas

### UI e Componentes
- **Lucide React Native** 0.547.0 - Ícones
- **React Native Deck Swiper** 2.0.19 - Swipe de cards
- **React Native Toast Message** 2.3.3 - Notificações
- **React Native Haptic Feedback** 2.3.3 - Feedback tátil
- **React Native Safe Area Context** 5.5.2 - Safe areas

### Utilitários
- **Axios** 1.12.2 - Cliente HTTP
- **React Native Keychain** 10.0.0 - Armazenamento seguro
- **React Native Share** 12.2.0 - Compartilhamento nativo
- **React Native Clipboard** 1.16.3 - Clipboard

### Ferramentas de Desenvolvimento
- **Biome** 2.3.0 - Linting e formatação
- **Jest** 29.6.3 - Framework de testes
- **Testing Library** - Testes de componentes React Native

## Testes

O projeto possui uma suíte de testes abrangente com **171 testes** distribuídos em **23 arquivos**.

### Estrutura de Testes

```
src/
├── components/__tests__/
│   ├── Button.test.tsx                           # Testes do componente Button
│   ├── Input.test.tsx                            # Testes do componente Input
│   └── Logo.test.tsx                             # Testes do componente Logo
│
├── contexts/__tests__/
│   └── AuthContext.test.tsx                      # Testes do contexto de autenticação
│
├── hooks/__tests__/
│   └── useAuth.test.tsx                          # Testes do hook useAuth
│
├── screens/DailyQuote/
│   ├── components/
│   │   ├── ActionButton/__tests__/
│   │   │   └── ActionButton.test.tsx            # Testes do botão de ação
│   │   ├── ErrorState/__tests__/
│   │   │   └── ErrorState.test.tsx              # Testes do estado de erro
│   │   ├── QuoteCard/__tests__/
│   │   │   └── QuoteCard.test.tsx               # Testes do card de frase
│   │   └── QuoteSwiper/__tests__/
│   │       └── QuoteSwiper.test.tsx             # Testes do swiper de frases
│   └── hooks/__tests__/
│       ├── useQuoteActions.test.ts              # Testes das ações de frases
│       ├── useQuoteManager.test.ts              # Testes do gerenciador de frases
│       └── useSwipeManager.test.ts              # Testes do gerenciador de swipe
│
├── services/__tests__/
│   ├── axios.test.ts                            # Testes da configuração do Axios
│   ├── auth.test.ts                             # Testes do serviço de autenticação
│   ├── quote.test.ts                            # Testes do serviço de frases
│   └── integration/
│       ├── auth.integration.test.ts             # Testes de integração de auth
│       ├── quote.integration.test.ts            # Testes de integração de quotes
│       └── complete-flow.integration.test.ts    # Testes de fluxo completo
│
└── utils/__tests__/
    ├── errorHandler.test.ts                     # Testes do manipulador de erros
    ├── forgotPasswordValidation.test.ts         # Testes de validação de recuperação
    ├── loginValidation.test.ts                  # Testes de validação de login
    ├── registerValidation.test.ts               # Testes de validação de registro
    └── quote.test.ts                            # Testes de utilitários de frases
```

### Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm test -- --watch

# Executar testes com cobertura
npm test -- --coverage

# Executar um arquivo específico
npm test -- Button.test.tsx

# Executar testes em modo verbose
npm test -- --verbose
```

### Cobertura de Testes

O projeto alcançou excelente cobertura de código:

#### Cobertura Atual:
- **Statements**: 66.51%
- **Branches**: 70.05% ✅
- **Functions**: 61.53%
- **Lines**: 65.20%

#### Threshold Mínimo (jest.config.js):
- **Statements**: 65%
- **Branches**: 65%
- **Functions**: 60%
- **Lines**: 65%

Para visualizar o relatório de cobertura detalhado:

```bash
npm test -- --coverage
```

### Tipos de Testes

1. **Testes Unitários** - Componentes isolados (Button, Input, Logo, ActionButton)
2. **Testes de Hooks** - Custom hooks (useAuth, useQuoteActions, useQuoteManager, useSwipeManager)
3. **Testes de Contexto** - AuthContext e gerenciamento de estado
4. **Testes de Serviços** - APIs e cliente HTTP
5. **Testes de Integração** - Fluxos completos de autenticação e quotes
6. **Testes de Utilitários** - Validações (login, registro, recuperação) e helpers

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

### Gerar APK de Produção (Android)

Para gerar um APK de produção:

```bash
npm run android:apk
```

O APK será gerado em `android/app/build/outputs/apk/release/app-release.apk`.

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

# Fix problemas de lint automaticamente
npm run lint:fix

# Formatar código
npm run lint:format
```

### TypeScript

```bash
# Verificar tipos
npx tsc --noEmit
```

## Estrutura do Projeto

```
daily_quote/
├── android/                    # Código nativo Android
├── ios/                        # Código nativo iOS
├── __tests__/                  # Testes do componente principal
├── src/
│   ├── assets/                # Imagens, SVGs e assets estáticos
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Button/           # Componente de botão
│   │   ├── Input/            # Componente de input
│   │   ├── Logo/             # Componente de logo
│   │   └── __tests__/        # Testes de componentes
│   ├── constants/             # Constantes, tema e mensagens
│   ├── contexts/              # Contextos React (AuthContext)
│   │   └── __tests__/        # Testes de contextos
│   ├── hooks/                 # Custom hooks
│   ├── navigation/            # Configuração de navegação
│   ├── screens/               # Telas do app
│   │   ├── Login/            # Tela de login
│   │   ├── Register/         # Tela de registro (demonstrativa)
│   │   ├── ForgotPassword/   # Tela de esqueci a senha (demonstrativa)
│   │   └── DailyQuote/       # Tela principal com frases
│   ├── services/             # Serviços (API, HTTP client)
│   │   └── __tests__/        # Testes de serviços e integração
│   ├── types/                # Tipos TypeScript
│   └── utils/                # Utilitários e helpers
│       └── __tests__/        # Testes de utilitários
├── App.tsx                    # Componente principal
├── jest.config.js            # Configuração do Jest
├── jest.setup.js             # Setup dos testes
└── package.json              # Dependências e scripts
```

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia o Metro bundler |
| `npm run ios` | Executa no iOS |
| `npm run android` | Executa no Android |
| `npm run android:apk` | Gera APK de produção para Android |
| `npm run lint` | Executa o linter |
| `npm run lint:fix` | Corrige problemas de lint automaticamente |
| `npm run lint:format` | Formata o código |
| `npm test` | Executa os testes |

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
# Limpar cache do Metro
npm start -- --reset-cache

# Ou limpar tudo
watchman watch-del-all
rm -rf node_modules
npm install
```

### Testes Falhando

Se os testes falharem:

```bash
# Limpar cache do Jest
npm test -- --clearCache

# Executar testes novamente
npm test
```

## Licença

MIT
