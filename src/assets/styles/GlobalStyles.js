import { createGlobalStyle } from 'styled-components';
import 'assets/styles/fonts.css';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *::after, *::before {
    box-sizing: inherit;
  }
  body, ul, label,p {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
  }
  a, button , input{
    font-family: 'Montserrat', sans-serif;
  }
`;
