import { ThemeProvider } from 'styled-components/native';
import Dashboard from './src/Screens/Dashboard';
import theme from './src/global/styles/theme';

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  )
}