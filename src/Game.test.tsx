import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GamePage from './game/gamePage';

test('renders start page level 1', () => {
  render(<GamePage />);

  const level1 = screen.getByText(/Уровень 1/i);
  const step20 = screen.getByText("Шаг 20");
  const field = screen.getByTestId("field");
  const coverage = screen.getByTestId("coverage");

  expect(level1).toBeInTheDocument();
  expect(step20).toBeInTheDocument();
  expect(coverage).toBeInTheDocument();
  expect(field.childNodes.length).toEqual(12);
});


test('flip card by click', async () => {
  render(<GamePage />);

  const field = screen.getByTestId("field");
  fireEvent.click(field.childNodes[0]);

  await waitFor(() => screen.findByTestId("card-open"));
});


test('hide coverage after click start btn', async () => {
  render(<GamePage />);
  
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => expect(screen.queryByTestId("coverage")).not.toBeInTheDocument());
});
