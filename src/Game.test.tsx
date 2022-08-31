import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GamePage from './game/gamePage';

describe('renders start page level 1', () => {

  it('should be in page', async () => {
    render(<GamePage />);

    expect(screen.getByText(/Уровень 1/i)).toBeInTheDocument();
    expect(screen.getByText(/попыток 20/i)).toBeInTheDocument();
    expect(screen.getByTestId("coverage")).toBeInTheDocument();
    expect(screen.getAllByTestId(/card-closed/i)).toHaveLength(12);
    expect(screen.getByTestId("field")).toHaveClass("level1");
  });

});

describe('test click events', () => {

  it('flip card by click', async () => {
    render(<GamePage />);
  
    const field = screen.getByTestId("field");
    fireEvent.click(field.childNodes[0]);
  
    await screen.findByTestId("card-open");
  });
  
  
  it('hide coverage after click start btn', async () => {
    render(<GamePage />);
    
    userEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(screen.queryByTestId("coverage")).not.toBeInTheDocument());
  });
});
