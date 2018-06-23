import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { orange400 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange400,
  },
  appBar: {
    height: 50,
  },
});

export default muiTheme;
