import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se a página contém as informações sobre a Pokedéx', () => {
  it('Teste se a página contém as informações sobre a Pokedéx', () => {
    const { history } = renderWithRouter(<App />);
    const aboutPokedex = /About Pokédex/i;
    act(() => {
      history.push('/about');
    });
    const { location } = history;
    console.log(location.pathname);
    const checkPokedex = screen.getByRole('heading', { level: 2 });
    expect(checkPokedex).toHaveTextContent(aboutPokedex);
  });

  it('Teste se a página contém um heading com o texto About Pokedéx', () => {
    const { history } = renderWithRouter(<App />);
    const aboutPokedex = /About Pokédex/i;
    act(() => {
      history.push('/about');
    });
    const checkPokedex = screen.getByRole('heading', { level: 2 });
    expect(checkPokedex).toHaveTextContent(aboutPokedex);
    expect(checkPokedex).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos sobre a Pokedéx', () => {
    const { history } = renderWithRouter(<App />);
    const PARAGRAPH01 = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons';
    const PARAGRAPH02 = 'One can filter Pokémons by type, and see more details for each one of them';
    act(() => {
      history.push('/about');
    });
    const checkPokedex1 = screen.getByText(PARAGRAPH01);
    const checkPokedex2 = screen.getByText(PARAGRAPH02);
    expect(checkPokedex1).toBeInTheDocument();
    expect(checkPokedex2).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma pokedéx', () => {
    const { history } = renderWithRouter(<App />);
    const POKEDEX = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    act(() => {
      history.push('/about');
    });
    const checkPokedexImage = screen.getByRole('img');
    expect(checkPokedexImage.src).toEqual(POKEDEX);
  });
});
