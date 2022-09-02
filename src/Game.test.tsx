import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GamePage from './game/gamePage';

describe('renders start page level 1', () => {

  it('should be in page', async () => {
    render(<GamePage />);

    expect(screen.getByText(/Уровень 1/i)).toBeInTheDocument();
    expect(screen.getByText(/попыток 20/i)).toBeInTheDocument();
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
  
  
  it('should not mark as found', async () => {
    render(<GamePage />);
    
    const firstCard = screen.getAllByTestId(/card-closed/i)[0];
    userEvent.click(firstCard);
    expect(firstCard).toHaveClass("open");
    userEvent.click(firstCard);
    expect(firstCard).not.toHaveClass("found");
  });


  it('should not flip back', async () => {
    render(<GamePage />);
    
    const firstCard = screen.getAllByTestId("card-closed")[0];
    userEvent.click(firstCard);
    userEvent.click(screen.getAllByTestId("card-closed")[1]);
    expect(screen.getAllByTestId("card-open")).toHaveLength(2);

    userEvent.click(firstCard);
    expect(screen.getAllByTestId("card-open")).toHaveLength(2);
  });

  it('should not decrease steps', async () => {
    render(<GamePage />);
    
    const firstCard = screen.getAllByTestId("card-closed")[0];
    userEvent.click(firstCard);
    userEvent.click(firstCard);
    userEvent.click(firstCard);
    expect(screen.getByText(/попыток 20/i)).toBeInTheDocument();
  });
});

