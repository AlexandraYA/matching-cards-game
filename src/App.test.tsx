import React from 'react';
import { render, screen } from '@testing-library/react';
import GamePage from './game/gamePage';

test('renders learn react link', () => {
  render(<GamePage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
