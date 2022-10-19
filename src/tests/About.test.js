import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se o topo da aplixação contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const home = screen.getAllByRole('link', { name: /home/i })[0];
    expect(home).toBeInTheDocument();
  });
  it('O segundo link deve possuir o texto about', () => {
    renderWithRouter(<App />);
    const about = screen.getAllByRole('link', { name: /about/i })[1];
    expect(about).toBeInTheDocument();
  });
  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favorite = screen.getAllByRole('link', { name: /favorite pokémons/i })[2];
    expect(favorite).toBeInTheDocument();
  });
});
