import { act, renderHook } from '@testing-library/react-native';
import { AuthProvider, useAuth } from './auth';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock Apple Authentication
jest.mock('expo-apple-authentication', () => ({
  signInAsync: () => ({
    user: 'test-user-id',
    email: 'test@test.com',
    fullName: {
      givenName: 'John',
    },
    identityToken: 'test-identity-token',
    state: 'test-state',
    authorizationCode: 'test-authorization-code',
    nonce: 'test-nonce',
    realUserStatus: 'test-real-user-status',
  }),
  AppleAuthenticationScope: {
    FULL_NAME: 'FULL_NAME',
    EMAIL: 'EMAIL',
  },
}));

describe('Auth Hook', () => {
  it('should be able to sign in with Apple', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // 1. open the screen to the user to sign in with Apple
    // 2. return to the user type and params
    // 3. fetch profile data from apple
    await act(async () => {
      await result.current.signInWithApple();
    });

    expect(result.current.user).toBeTruthy();
    expect(result.current.user.id).toBeDefined();
    expect(result.current.user.email).toBeDefined();
    expect(result.current.user.name).toBeDefined();
    expect(result.current.user.photo).toBeDefined();
  });
});
