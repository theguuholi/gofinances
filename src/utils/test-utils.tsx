import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from '../global/styles/theme';
import { AuthProvider } from '../hooks/auth';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const AuthWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: TestWrapper, ...options });

const renderAuth = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AuthWrapper, ...options });

export * from '@testing-library/react-native';
export { customRender as render, renderAuth as renderAuth };
