import { render } from 'react-dom';

import "./assets/reset.css";
import "./assets/styles.css";

import App from './components/App.js';

render(<App />, document.querySelector('.root'));