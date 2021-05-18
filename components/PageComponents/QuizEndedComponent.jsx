import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ShowScoresComponent from './ShowScoresComponent';

import { ButtonComponent, SubTitle } from '../BaseComponents';


const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(4),
        color: theme.palette.primary.contrastText,
    },
    button: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(4),
        alignSelf: 'flex-start'
    },
    gridContainer: {
        maxWidth: '720px',
        width: '80%'
    }
}))

function QuizEndedComponent({ 
    title, 
    subTitle,
    participants, 
    onClick 
}) {

    const classes = useStyles();

    return (
        <Container>

            <Grid 
            container
            alignContent="center"
            alignItems="flex-start"
            direction="column"
            className={classes.gridContainer}
            >
                <Grid 
                className={classes.title}
                item 
                xs={12}>
                    <SubTitle>{title}</SubTitle>
                </Grid>
                <Grid item xs>
                <ShowScoresComponent 
                title={subTitle}
                participants={participants} 
                bPxs={12}
                bPsm={8}
                />
                </Grid>
            </Grid>
        </Container>
    );
}

export default QuizEndedComponent;