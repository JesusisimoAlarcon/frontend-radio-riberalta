import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import './assets/base.css';
//import App from './App';
import Main from './Pages/Main';
import * as serviceWorker from './serviceWorker';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
const store = configureStore();
const rootElement = document.getElementById('root');
const theme = createMuiTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: 'rgba(211, 9, 7)',
    }
  }
});
const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <Component />
        </ThemeProvider>
      </HashRouter>
    </Provider>,
    rootElement
  )
}
renderApp(Main);
serviceWorker.unregister();
