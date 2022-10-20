import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica se o card do pokémon é exibido corretamente', () => {
  it('Verifica as informações do pokémon', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByTestId('pokemon-name');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img');
    expect(pokemon).toHaveTextContent(/pikachu/i);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(pokemon).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImg.src).toEqual('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg.alt).toEqual('Pikachu sprite');
    expect(pokemonImg).toBeInTheDocument();
  });
  it('Verifica se o link de navegação direciona para os detalhes do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type');
    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/electric/i);
    userEvent.click(details);
    const pokemon = screen.getAllByRole('heading', { level: 2 })[0];
    expect(pokemon).toHaveTextContent(/pikachu/i);
    expect(history.location.pathname).toBe('/pokemons/25');
    expect(pokemon).toBeInTheDocument();
  });

  it('Verifica se o pokemon aparece como favoritado aparece na tela principal', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/25');
    });

    const favorite = screen.getByText(/Pokémon favoritado?/i);
    userEvent.click(favorite);
    act(() => {
      history.push('/');
    });
    const favoriteImg = screen.getAllByRole('img')[1];
    expect(favoriteImg.src).toBe('http://localhost/star-icon.svg');
    expect(favoriteImg.alt).toBe('Pikachu is marked as favorite');
  });
});
