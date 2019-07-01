import ModalManager from '@material-ui/core/Modal/ModalManager';
import { createMuiTheme } from '@material-ui/core/styles';

const PRIMARY = '#18181e';
const SECONDARY = '#dec79b';
const PRIMARY_LIGHT = '#46464b';

const theme = createMuiTheme({
  useNextVariants: true,
  typography: {
    fontFamily: '"Montserrat", Helvetica, Arial, sans-serif',
  },
  palette: {
    primary: { main: PRIMARY },
    secondary: { main: SECONDARY },
    text: { primary: SECONDARY },
  },
  overrides: {
    MuiFormLabel: { root: { color: SECONDARY, '&$focused': { color: SECONDARY } } },
    MuiPopover: {
      paper: {
        backgroundColor: PRIMARY,
        border: `1px solid ${SECONDARY}`,
      },
    },
    MuiInput: {
      root: { backgroundColor: PRIMARY_LIGHT },
    },
    MuiButton: {
      root: {
        '&$disabled': {
          backgroundColor: SECONDARY,
          color: PRIMARY_LIGHT,
        },
      },
    },
  },
});

theme.props.MuiModal = { manager: new ModalManager({ handleContainerOverflow: false }) };

export default theme;
