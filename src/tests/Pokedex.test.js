import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica se o Heading está presente na página', () => {
  it('Verifica se o texto é exibido', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(/encountered pokémons/i);
  });

  it('Verifica se é exibido o próximo pokémon da lista', () => {
    renderWithRouter(<App />);
    const Pokemon = screen.getByTestId('pokemon-name');
    // const charmander = screen.getByText(/charmander/i);
    const nextPokemon = screen.getByTestId('next-pokemon');
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    expect(Pokemon).toHaveTextContent('Charmander');
  });
  it.only('Verifica se os botões de filtro estão presentes no documento', () => {
    renderWithRouter(<App />);
    const button = screen.getAllByTestId('pokemon-type-button');
    const buttonAll = screen.getByText('All');
    const Pokemon = screen.getByTestId('pokemon-type');
    expect(button[0]).toHaveTextContent(/Electric/i);
    expect(button[1]).toHaveTextContent(/fire/i);
    expect(button[2]).toHaveTextContent(/bug/i);
    expect(button[3]).toHaveTextContent(/poison/i);
    expect(button[4]).toHaveTextContent(/psychic/i);
    expect(button[5]).toHaveTextContent(/normal/i);
    expect(button[6]).toHaveTextContent(/dragon/i);
    userEvent.click(button[4]);
    expect(Pokemon).toHaveTextContent(/Psychic/i);
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(button[6]);
    expect(Pokemon).toHaveTextContent(/dragon/i);
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(Pokemon).toHaveTextContent(/electric/i);
    expect(buttonAll).toBeInTheDocument();
  });
});
