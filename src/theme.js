import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

let theme = createMuiTheme({
    typography: {
        h1: {
            fontFamily: "Bebas Neue",
            fontSize: "4rem"
        },
        h2: {
            fontFamily: "Bebas Neue",
            fontSize: "2.5rem"
        },
        h3: {
            fontFamily: "Bebas Neue",
            fontSize: "2rem"
        },
        h4: {
            fontFamily: "Bebas Neue",
            fontSize: "1.8rem"
        },
        h5: {
            fontFamily: "Bebas Neue",
            fontSize: "1.6rem"
        },
        h6: {
            fontFamily: "Bebas Neue",
            fontSize: "1.2rem"
        },
        subtitle1: {
            fontFamily: "Bebas Neue"
        },
        body1: {
            fontFamily: "Mada",
            fontSize: "1rem"
        },
        body2: {
            fontFamily: "Mada",
            fontSize: "0.9rem"
        },
        button: {
            fontFamily: "Alatsi",
        }
    },

    palette: {
        type: "dark",
        primary: {
            main: teal[700],
        },
        secondary: {
            main: "#a6262c",
        },


    },
},
{
    palette: {
        blue: {
            main: "#1976d2",
            text: "white",
            light: "#4791db",
            dark: "#115293"
        }
    }
});

theme = responsiveFontSizes(theme);

export default theme;