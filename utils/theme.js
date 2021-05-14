import { createMuiTheme } from '@material-ui/core/styles'
import { purple, red, green, yellow, blue } from '@material-ui/core/colors'

const theme = createMuiTheme({


    spacing: [0, 4, 8, 16, 32, 64, 130, 260, 520, 1040, 2080],

    palette: {
        primary: {
            main: purple[500],
            one: red[500],
            two: green[500],
            three: yellow[900],
            four: blue[500],
        },
        secondary: {
            main: "#4ca1a3",
        },
        warning: {
            main: red[600],
        },
        text: {
            main: 'black',
        }
    },
    
})

export default theme;

/**colors: {
        primary: "#52057b",
        dark: "#21094e",
        light: "#bc6ff1",
        medium: "#892cdc",
        contrastLight: "#a5e1ad",
        contrastDark: "#4ca1a3",
        optionOne: "#54e346",
        optionTwo: "#ec0101",
        optionThree: "#f7ea00",
        optionFour: "#318fb5",
        black: "#252525", */