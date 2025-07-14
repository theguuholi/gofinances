import { render, screen } from '@testing-library/react-native';
import Profile from '.';

describe('Profile', () => {
  it('check if input placeholder render properly', () => {
    render(<Profile />);

    const textTitle = screen.getByTestId('text-title');

    expect(textTitle).toBeTruthy();

    const inputName = screen.getByPlaceholderText('Nome');
    const inputLastName = screen.getByPlaceholderText('Sobrenome');

    expect(inputName).toBeTruthy();
    expect(inputLastName).toBeTruthy();
  });

  it('check if title render correctly', () => {
    render(<Profile />);

    const textTitle = screen.getByTestId('text-title');

    expect(textTitle).toBeTruthy();
  });
});
