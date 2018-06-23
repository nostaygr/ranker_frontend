import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import history from './history';
import { App } from './App';
import muiTheme from './theme';

ReactDom.render(
  <Router history={history}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root'),
);
