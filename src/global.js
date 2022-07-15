import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
	
  * {
    box-sizing: border-box;
  }

	img {
    max-width: 100%;
    max-height: 100%;
  }
	
`;

export default GlobalStyle;
