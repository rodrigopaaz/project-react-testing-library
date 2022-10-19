import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica os pokemons favoritados', () => {
  it('Verifica se nenhum pokemon foi favoritado', () => {
    const NOFAVORITEPOKEMON = 'No favorite pokemon found';
    localStorage.clear();
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/favorites');
    });
    const checkFavorite = screen.getByText(NOFAVORITEPOKEMON);
    expect(checkFavorite).toBeInTheDocument();
  });
  it('Verifica se são exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoritePokemonIds', '[25]');
    act(() => {
      history.push('/pokemons/4');
    });
    const favorite = screen.getByText(/pokémon favoritado?/i);
    userEvent.click(favorite);
    act(() => {
      history.push('/pokemons/65');
    });
    userEvent.click(favorite);
    act(() => {
      history.push('/favorites');
    });
    const Alakazam = screen.getByText(/alakazam/i);
    const Charmander = screen.getByText(/Charmander/i);
    const Pikachu = screen.getByText(/Pikachu/i);
    expect(Charmander).toBeInTheDocument();
    expect(Alakazam).toBeInTheDocument();
    expect(Pikachu).toBeInTheDocument();
  });
});
