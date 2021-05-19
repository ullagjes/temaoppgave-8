import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Box from '@material-ui/core/Box';

import { LinkComponent } from '../BaseComponents';

const useStyles = makeStyles((theme) => ({
    root: {

        height: '100vh',
        width: 'auto',
        maxWidth: '100vw',
        margin: 0,
        padding: 0,
        display: 'block'
        
    },
    header: {
        marginBottom: theme.spacing(3),
        display: 'flex',
        backgroundColor: theme.palette.primary.dark,
        width: 'auto',
    },
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center'
    },
    icon: {
        height: 60,
        width: 60,
        alignSelf: 'center',
        color: 'white'
    },
    logo: {
        color: theme.palette.primary.contrastText,
        fontSize: '50px'
    },
    navigationContainer: {
        marginLeft: 'auto',
        marginRight: theme.spacing(2),
        display: 'flex',
        alignSelf: 'flex-end',
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },
    navLink: {
        color: theme.palette.secondary.contrastText,
        padding: theme.spacing(2),
        fontSize: 25,
    },
}))

function PageContainer({user, children}) {

    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Box 
            className={classes.header} 
            boxShadow={3}
            width='100vw'
            height="15%"
            minHeight='70px'
            maxHeight='100px'
            component="header"
            >
                <div className={classes.iconContainer}>
                    <QuestionAnswerIcon className={classes.icon}/>
                    <p className={classes.logo} aria-label="hidden">K!</p>
                </div>
                {user && 
                        <nav className={classes.navigationContainer}>
                            <LinkComponent classes={classes.navLink} href={`/createquiz`}>Create</LinkComponent>
                            <LinkComponent classes={classes.navLink} href={`/quizmaster/library`}>Library</LinkComponent>
                            <LinkComponent classes={classes.navLink} href={`/quizmaster/profile`}>Profile</LinkComponent>
                        </nav>
                }
            </Box>
            {children}
        </Container>
    );
}

export default PageContainer;