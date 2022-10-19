import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { getByText, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const home = screen.queryAllByRole('link')[0];
    expect(home).toHaveTextContent(/home/i);
    expect(home).toBeInTheDocument();
  });
  it('O segundo link deve possuir o texto about', () => {
    renderWithRouter(<App />);
    const about = screen.getAllByRole('link')[1];
    expect(about).toHaveTextContent(/about/i);
    expect(about).toBeInTheDocument();
  });
  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favorite = screen.getAllByRole('link')[2];
    expect(favorite).toHaveTextContent(/favorite pokémons/i);
    expect(favorite).toBeInTheDocument();
  });
});

describe('Verifica os direcionamentos corretos da página', () => {
  it('Testa se a aplicação é direcionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/home/i);
    userEvent.click(home);
    const { location } = history;
    expect(location.pathname).toBe('/');
  });
  it('Testa se a aplicação é direcionada para a página About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    const { location } = history;
    expect(location.pathname).toBe('/about');
  });

  it('Testa se a aplicação é direcionada para a página Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorites);
    const { location } = history;
    expect(location.pathname).toBe('/favorites');
  });
});
