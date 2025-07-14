import React from 'react';
import { screen } from '@testing-library/react-native';
import { render } from '../../../utils/test-utils';
import Input from './index';

describe('Input Component', () => {
  it('should render correctly with placeholder', () => {
    render(<Input placeholder="Test placeholder" />);

    const input = screen.getByPlaceholderText('Test placeholder');
    expect(input).toBeTruthy();
  });

  it('should render with active prop as true', () => {
    render(<Input placeholder="Test placeholder" active />);

    const input = screen.getByPlaceholderText('Test placeholder');
    expect(input).toBeTruthy();
  });
});
