# Testing Setup Guide

This project is configured with a comprehensive testing environment using Jest, React Native Testing Library, and Expo.

## Available Scripts

### Testing
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### Code Quality
- `npm run lint` - Check for linting errors
- `npm run lint:fix` - Fix linting errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted correctly
- `npm run type-check` - Run TypeScript type checking

## Testing Structure

### Test Files Location
- Component tests: `src/components/**/__tests__/`
- Screen tests: `src/Screens/**/__tests__/`
- Hook tests: `src/hooks/**/__tests__/`
- Utility tests: `src/utils/**/__tests__/`

### Test File Naming
- `*.test.tsx` for component tests
- `*.test.ts` for utility/hook tests
- `*.spec.tsx` for integration tests

## Writing Tests

### Component Testing Example
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MyComponent from '../index';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Hello')).toBeTruthy();
  });

  it('handles user interaction', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <MyComponent onPress={onPressMock} />
    );
    
    fireEvent.press(getByText('Button'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
```

### Testing Hooks
```typescript
import { renderHook, act } from '@testing-library/react-native';
import { useMyHook } from '../useMyHook';

describe('useMyHook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe(0);
  });
});
```

## Mocking

### Common Mocks
The project includes mocks for:
- `react-native-svg`
- `expo-font`
- `@react-native-async-storage/async-storage`
- `expo-apple-authentication`
- `react-native-responsive-fontsize`

### Adding Custom Mocks
Add mocks in `src/__tests__/setup.ts`:

```typescript
jest.mock('your-package', () => ({
  // Your mock implementation
}));
```

## Coverage

The project is configured with 70% coverage thresholds for:
- Branches
- Functions
- Lines
- Statements

Run `npm run test:coverage` to see detailed coverage reports.

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Descriptive Test Names**: Test names should clearly describe what is being tested
3. **Arrange-Act-Assert**: Structure tests with clear setup, action, and verification
4. **Mock External Dependencies**: Mock APIs, navigation, and external services
5. **Test User Interactions**: Use `fireEvent` to simulate user actions
6. **Test Error States**: Include tests for error handling and edge cases

## Troubleshooting

### Common Issues

1. **SVG Components**: Use the provided SVG mocks in `setup.ts`
2. **Navigation**: Mock navigation props when testing screens
3. **Async Operations**: Use `waitFor` for async operations
4. **Styled Components**: Mock theme providers when needed

### Debugging Tests
- Use `console.log` in tests for debugging
- Run specific test files: `npm test -- MyComponent.test.tsx`
- Use `--verbose` flag for detailed output: `npm test -- --verbose` 