# Testing Documentation

## Test Suite Overview

This project has a comprehensive test suite covering unit tests, integration tests, and service tests. All tests are written following best practices with no console logs or comments in test files.

## Test Statistics

- **Total Test Suites**: 10
- **Total Tests**: 95
- **Pass Rate**: 100%

## Coverage Summary

### High Coverage Areas (100%)
- **Services**: All API services are fully tested
  - `auth.ts` - Authentication API calls
  - `axios.ts` - Axios configuration and interceptors
  - `quote.ts` - Quote API calls

- **Utils**: All utility functions are fully tested
  - `errorHandler.ts` - Toast notification handlers
  - `loginValidation.ts` - Zod validation schemas
  - `quote.ts` - Quote ID generation and date formatting

- **Components**: Core reusable components
  - `Button.tsx` - All variants, sizes, and states
  - `Input.tsx` - Form inputs with validation
  - `Logo.tsx` - Logo component

### Integration Tests
- **AuthContext**: Complete authentication flow testing
  - Initial state management
  - Sign in/sign out flows
  - Keychain integration
  - Session persistence
  - Auto-login functionality

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with coverage
```bash
npm test -- --coverage
```

### Run specific test file
```bash
npm test -- path/to/test/file.test.ts
```

## Test Structure

### Unit Tests
Located in `src/**/__tests__/` directories alongside the code they test.

**Examples:**
- `src/utils/__tests__/quote.test.ts`
- `src/utils/__tests__/loginValidation.test.ts`
- `src/utils/__tests__/errorHandler.test.ts`

### Service Tests
Located in `src/services/__tests__/`

**Coverage:**
- API call mocking
- Error handling
- Response interceptors
- Authentication flow

### Component Tests
Located in `src/components/__tests__/`

**Coverage:**
- Rendering with different props
- User interactions
- State management
- Validation feedback

### Integration Tests
Located in `src/contexts/__tests__/`

**Coverage:**
- Context providers
- Custom hooks
- Complete user flows
- State persistence

## Test Patterns

### Mocking Strategy

All external dependencies are properly mocked:
- `react-native-keychain` - Secure storage
- `react-native-toast-message` - Toast notifications
- `react-native-bootsplash` - Splash screen
- `react-native-haptic-feedback` - Haptic feedback
- `react-native-share` - Share functionality
- `@react-native-clipboard/clipboard` - Clipboard operations
- `react-native-deck-swiper` - Swiper component
- `axios` - HTTP client

### Test File Naming
- Unit tests: `[filename].test.ts` or `[filename].test.tsx`
- Located in `__tests__` folder next to source code

### Test Organization
Each test file follows this structure:
```typescript
describe("Component/Module Name", () => {
  describe("Feature/Method", () => {
    it("should do something specific", () => {
      // Test implementation
    });
  });
});
```

## Key Test Files

### Utils Tests
1. **quote.test.ts** (8 tests)
   - Quote ID generation
   - Date formatting in pt-BR locale
   - Unique ID validation

2. **loginValidation.test.ts** (9 tests)
   - Form validation rules
   - Zod schema validation
   - Error message validation
   - Edge cases (empty, whitespace, length)

3. **errorHandler.test.ts** (15 tests)
   - Toast message display
   - Custom titles
   - Different toast types (error, success, info)
   - Toast configuration validation

### Service Tests
1. **auth.test.ts** (5 tests)
   - Login endpoint calls
   - Token extraction
   - Error propagation
   - Network error handling

2. **quote.test.ts** (7 tests)
   - Quote fetching
   - Header configuration
   - Timeout handling
   - Error scenarios

3. **axios.test.ts** (6 tests)
   - Axios instance configuration
   - Response interceptors
   - 403 error handling
   - Token cleanup on session expiry

### Component Tests
1. **Button.test.tsx** (20 tests)
   - All variants (primary, secondary, outline, ghost)
   - All sizes (small, medium, large)
   - Loading states
   - Disabled states
   - User interactions
   - Custom styling

2. **Input.test.tsx** (19 tests)
   - Label rendering
   - Error message display
   - Icon support (left/right)
   - Focus/blur handling
   - Value changes
   - Disabled state
   - Secure text entry

### Integration Tests
1. **AuthContext.test.tsx** (6 tests)
   - Initial loading state
   - Credential restoration
   - Sign in flow
   - Sign out flow
   - Boot splash integration
   - External credential removal detection

## Writing New Tests

When adding new tests, follow these guidelines:

1. **No Console Logs**: Never use `console.log()` in tests
2. **No Comments**: Write self-documenting test names instead
3. **Clear Descriptions**: Use descriptive `it()` statements
4. **Arrange-Act-Assert**: Follow the AAA pattern
5. **Mock External Dependencies**: Always mock external services
6. **Test Edge Cases**: Include error scenarios and edge cases
7. **Keep Tests Isolated**: Each test should be independent

## CI/CD Integration

Tests are configured to run in CI/CD pipelines with:
- Automatic execution on every commit
- Coverage reporting
- Failure notifications

## Future Improvements

Areas that could benefit from additional test coverage:
- Screen components (Login, DailyQuote)
- Custom hooks (useQuoteManager, useQuoteActions, useSwipeManager)
- Navigation flows
- Deep linking

## Troubleshooting

### Tests Failing Locally

1. Clear Jest cache:
```bash
npm test -- --clearCache
```

2. Ensure dependencies are up to date:
```bash
npm install
```

3. Check for conflicting global packages

### Mock Issues

If mocks aren't working:
1. Check `jest.setup.js` for proper mock configuration
2. Ensure mock is defined before module import
3. Use `jest.clearAllMocks()` in `beforeEach()`

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
