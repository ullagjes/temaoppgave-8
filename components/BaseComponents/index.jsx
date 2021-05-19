
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    text: {
        color: theme.palette.text.main,
    },
}))

export function HeadLine({children}){
    return(
        <Typography
            component="h1" 
            variant="h1"
        >
            {children}
        </Typography>
    )
}

export function SubTitle({children, component, className}){
    const classes = useStyles();

    return(
        <Typography
            component={component}
            variant="h2"
            className={className}
        >
            {children}
        </Typography>
    )
}

export function UnderTitle({children, component, className}){
    const classes = useStyles();

    return(
        <Typography
            component={component} 
            variant="h4"
            className={`${classes.text} + ${className}`}
        >
            {children}
        </Typography>
    )
}

export function TextElement({ children }){
    const classes = useStyles()
    return(
        <Typography
            variant="body1"
        >
            {children}
        </Typography>
    )
}

export function LinkComponent({ classes, children, href}){
    return(
        <Typography component="div">

            <Link
                className={classes}
                href={href}
            >
                {children}
            </Link>
        </Typography>
    )
}

export function ButtonComponent({children, onClick, size, className}){
    return(
        <Button 
        variant="contained" 
        color="secondary" 
        onClick={onClick}
        size={size}
        className={className}
        >
            {children}
        </Button>
    )
}


/*${props => props.theme.colors.primary} */
/*${props => props.theme.colors.dark} */
/*${props => props.theme.colors.light} */
/*${props => props.theme.colors.medium} */
/*${props => props.theme.colors.contrastLight} */
/*${props => props.theme.colors.contrastDark} */
/*${props => props.theme.colors.optionOne}
/*${props => props.theme.colors.optionTwo}
/*${props => props.theme.colors.optionThree}
/*${props => props.theme.colors.optionFour}
/*${props => props.theme.colors.black}

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
        black: "#252525",*/