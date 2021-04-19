import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

let theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: teal[400],
        },
        secondary: {
            main: "#a6262c",
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;