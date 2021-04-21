import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

let theme = createMuiTheme({
    typography: {
        h1: {
            fontFamily: "Bebas Neue"
        },
        h2: {
            fontFamily: "Bebas Neue",
            marginTop: "30px"
        },
        h3: {
            fontFamily: "Bebas Neue",
        },
        h4: {
            fontFamily: "Thasadith",
        },
        h5: {
            fontFamily: "Bebas Neue",
        },
        h6: {
            fontFamily: "Bebas Neue",
        },
        subtitle1: {
            fontFamily: "Bebas Neue"
        },
        body1: {
            fontFamily: "Mada"
        },
        body2: {
            fontFamily: "Mada"
        },
        button: {
            fontFamily: "Alatsi",
        }
    },

    palette: {
        type: "dark",
        primary: {
            main: teal[400],
        },
        secondary: {
            main: "#a6262c",
        },

    },
},
{
    palette: {
        blue: {
            main: "#2196f3",
            light: "#4dabf5",
            dark: "#1769aa"
        }
    }
});

theme = responsiveFontSizes(theme);

export default theme;