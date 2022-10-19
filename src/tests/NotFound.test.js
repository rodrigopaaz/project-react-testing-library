import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o funcionamento do componente NotFound', () => {
  it('Verifica se o Heading está presente no componente', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/NotFound');
    });
    const MSG = 'Page requested not found';
    const IMAGE = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const checkImage = screen.getByRole('img');
    const checkMSG = screen.getByRole('heading', { level: 2 });
    expect(checkImage.src).toBe(IMAGE);
    expect(checkMSG).toHaveTextContent(MSG);
  });
});
