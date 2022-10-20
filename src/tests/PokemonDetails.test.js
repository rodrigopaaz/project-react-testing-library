import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pikRoute = '/pokemons/25';

describe('Verifica se as informações do pokemon selecionado são exibidas na tela', () => {
  it('A página deve conter um texto contendo o nome do pokémon', () => {
    const description = 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.';

    const { history } = renderWithRouter(<App />);
    const detail = screen.queryByRole('link', { name: /more details/i });
    act(() => {
      history.push(pikRoute);
    });
    const pokemonName = screen.getAllByRole('heading', { level: 2 })[0];
    const pokemonSumary = screen.getAllByRole('heading', { level: 2 })[1];
    const pokemonDescription = screen.getByText(description);
    expect(pokemonName).toHaveTextContent(/Pikachu Details/i);
    expect(detail).not.toBeInTheDocument();

    expect(pokemonSumary).toHaveTextContent(/Summary/i);
    expect(pokemonDescription).toBeInTheDocument();
  });

  it('Verifica se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const img1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const img2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    act(() => {
      history.push(pikRoute);
    });
    const gameLo = screen.getAllByRole('heading', { level: 2 })[2];
    expect(gameLo).toHaveTextContent(/game locations of pikachu/i);

    const location1 = screen.getByText('Kanto Viridian Forest');
    const location2 = screen.getByText('Kanto Power Plant');
    const imgLoc1 = screen.getAllByRole('img')[1];
    const imgLoc2 = screen.getAllByRole('img')[2];

    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
    expect(imgLoc1.src).toBe(img1);
    expect(imgLoc1.alt).toBe('Pikachu location');
    expect(imgLoc2.alt).toBe('Pikachu location');
    expect(imgLoc2.src).toBe(img2);
  });

  it('Verifica se o pokemon aparece como favoritado aparece na tela principal', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(pikRoute);
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
