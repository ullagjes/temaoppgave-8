
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    text: {
        color: theme.palette.text.main,
    },
    mainButton: {
        border: theme.borders.thin,
    }
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
    const classes = useStyles()
    return(
        <Button 
        variant="contained" 
        color="secondary" 
        onClick={onClick}
        size={size}
        className={`${classes.mainButton} + ${className}`}
        >
            {children}
        </Button>
    )
}